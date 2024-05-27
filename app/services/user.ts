import type RequestManager from "@ember-data/request";
import Service from "@ember/service";
import { service } from "@ember/service";
import { findRecord, createRecord } from '@ember-data/rest/request';
import Result, { err, ok } from "true-myth/result";
import type Store from "@ember-data/store";
import type UserModel from "ember-boilerplate/models/user";

export default class UserService extends Service {
  @service declare requestManager: RequestManager;
  @service declare store: Store;

  public getProfile() {
    return this.getById('profile');
  }

  public async getById(id: string): Promise<Result<UserModel,Error>> {
    const requestResponse = await this.store.request(findRecord<UserModel>('user', id));

    if (!requestResponse.response?.ok) {
      return err(new Error(''));
    }

    return ok(requestResponse.content.data);
  }

  public async createUser(userModel: UserModel): Promise<Result<UserModel,Error>> {
    const requestResponse = await this.store.request(createRecord(userModel));

    if (!requestResponse.response?.ok) {
      return err(new Error(''));
    }

    return ok(requestResponse.content as UserModel);
  }
}
