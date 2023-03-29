import type Model from '@ember-data/model';
import type emberData__store from '@ember-data/store';
import fetch from 'fetch';
import { getOwner } from '@ember/application';
import type ApplicationInstance from '@ember/application/instance';
import Service, { service } from '@ember/service';
import type ApplicationAdapter from 'ember-boilerplate/adapters/application';
import type { BaseDocumentModel } from 'ember-boilerplate/models/document';

export interface FileDTO {
  filename: string;
  path?: string;
  id?: string;
  file?: File;
}

export interface DocumentDTO {
  id: string;
  filename: string;
  originalName: string;
  path: string;
  mimetype: string;
  size: number;
  client?: string;
}

export default abstract class BaseDocumentService<
  T extends Model
> extends Service {
  @service declare store: emberData__store;
  adapter = (getOwner(this) as ApplicationInstance).lookup(
    'adapter:application'
  ) as ApplicationAdapter;
  protected abstract entityName: string;

  get baseUrl() {
    return `${this.adapter.host}/${this.adapter.namespace}`;
  }

  get baseEntityUrl() {
    return `${this.baseUrl}/${this.entityName}`;
  }

  async save(formData: FormData | undefined): Promise<T | undefined> {
    if (!formData) {
      return;
    }
    const id = formData.get('id') as string;
    if (id) {
      return this.update(formData, id);
    }
    return this.create(formData);
  }

  public getFilePojo(
    model: BaseDocumentModel | undefined
  ): FileDTO | undefined {
    if (!model) {
      return undefined;
    }
    return {
      id: model.id,
      filename: model.originalName,
      path: model.path,
      file: undefined,
    };
  }

  protected createRequestObject(method: 'POST' | 'PATCH', formData: FormData) {
    return {
      method,
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: this.adapter.headers['Authorization'] as string,
      },
      body: formData,
    };
  }

  private async create(formData: FormData): Promise<T> {
    const response = await fetch(
      this.baseEntityUrl,
      this.createRequestObject('POST', formData)
    );
    const data = await response.json();
    return this.store.pushPayload(data) as T;
  }

  private async update(formData: FormData, id: string): Promise<T> {
    const response = await fetch(
      `${this.baseEntityUrl}/${id}`,
      this.createRequestObject('PATCH', formData)
    );
    const data = await response.json();
    return this.store.pushPayload(data) as T;
  }
}
