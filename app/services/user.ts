import type RequestManager from "@ember-data/request";
import Service from "@ember/service";
import { service } from "@ember/service";
import { post } from "ember-boilerplate/builders/post";
import { query } from "ember-boilerplate/builders/query";
import User from "ember-boilerplate/schemas/user";
import Result, { err } from "true-myth/result";

export default class UserService extends Service {
  @service declare requestManager: RequestManager;

  public getProfile() {
    return this.getById('profile');
  }

  public async getById(id: string): Promise<Result<User,Error>> {
    const requestResponse = await this.requestManager.request(query('type', id));

    if (!requestResponse.response?.ok) {
      return err(new Error(requestResponse.content as string));
    }

    if (!(requestResponse.content as any).data) {
      throw new Error('Document must have a data key.');
    }

    const user = await User.from((requestResponse.content as any).data);

    return user;
  }

  public async createUser(userPayload: User): Promise<Result<User,Error>> {
    const requestResponse = await this.requestManager.request(post('user', userPayload));

    if (!requestResponse.response?.ok) {
      return err(new Error(requestResponse.content as string));
    }

    if (!(requestResponse.content as any).data) {
      throw new Error('Document must have a data key.');
    }

    const user = await User.from((requestResponse.content as any).data);

    return user;
  }
}
