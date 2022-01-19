import Base from 'ember-simple-auth/authenticators/base';
import fetch from 'fetch';
import { getOwner } from '@ember/application';
import { isEmpty } from '@ember/utils';
import { cancel, later } from '@ember/runloop';
import config from '../config/environment';
import { EmberRunTimer } from '@ember/runloop/types';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import UserModel from 'ember-boilerplate/models/user';

export interface BackendAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

function unixTime() {
  return Date.now() / 1000;
}

export default class JwtAuthenticator extends Base {
  private accessTokenLoop?: EmberRunTimer; // id of the ember run loop
  private leway = 50; // time to refresh before expiration of the accessToken

  public async authenticate(
    credentials: AuthCredentials,
    headers: Record<string, unknown>
  ) {
    if (this.accessTokenLoop) cancel(this.accessTokenLoop);
    const adapter = getOwner(this).lookup('adapter:application');
    const result: BackendAuthResponse = await this.makeRequest(
      `${adapter.host}/${adapter.namespace}/auth/login`,
      credentials,
      { ...adapter.headers, ...headers }
    );
    const newResult = await this.handleAccessTokenExpiration(result);
    return newResult;
  }

  public async invalidate() {
    if (this.accessTokenLoop) cancel(this.accessTokenLoop);
    console.warn('invalidated session');
    return Promise.resolve();
  }

  public async restore(data: BackendAuthResponse) {
    const newData = await this.handleAccessTokenExpiration(data);
    return newData;
  }

  private async handleAccessTokenExpiration(data: BackendAuthResponse) {
    const adapter = getOwner(this).lookup('adapter:application');

    if (isEmpty(data.accessToken) || isEmpty(data.refreshToken)) {
      throw new Error('Token is empty. Please check your backend response.');
    }

    const { exp: expOld, iat } = jwtDecode<JwtPayload>(data.accessToken);

    // token duration is less than leway
    if (expOld! - iat! <= this.leway) {
      throw new Error('Leway is too large.');
    }

    const unixTimestamp = unixTime();

    // token is still valid and does not need refresh
    if (expOld! - unixTimestamp > this.leway) {
      if (!this.accessTokenLoop && config.environment !== 'test')
        this.accessTokenLoop = later(
          this,
          () => this.handleAccessTokenExpiration(data),
          (expOld! - unixTimestamp - this.leway) * 1000
        );

      return data;
    }

    const result: BackendAuthResponse = await this.makeRequest(
      `${adapter.host}/${adapter.namespace}/auth/refresh-token`,
      {
        refreshToken: data.refreshToken,
      },
      adapter.headers
    );

    const { exp } = jwtDecode<JwtPayload>(result.accessToken);

    if (this.accessTokenLoop) cancel(this.accessTokenLoop);
    if (config.environment !== 'test') {
      const refreshTime = (exp! - unixTime() - this.leway) * 1000;
      this.accessTokenLoop = later(
        this,
        () => this.handleAccessTokenExpiration(data),
        refreshTime
      );
    }

    // override session data
    Object.assign(data, result);

    this.trigger('sessionDataUpdated', result);

    return result;
  }

  private makeRequest(url: string, data: unknown, headers?: Headers) {
    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Error during request');
      }
      return response.json();
    });
  }
}
