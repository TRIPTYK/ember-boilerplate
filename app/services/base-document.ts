import type Model from '@ember-data/model';
import type emberData__store from '@ember-data/store';
import fetch from 'fetch';
import Service, { service } from '@ember/service';
import type ApplicationAdapter from 'ember-boilerplate/adapters/application';
import type { Owner } from '@ember/test-helpers/build-owner';

export type FileObject = PersistedFile | UnpersistedFile;

export interface PersistedFile {
  filename: string;
  path: string;
  id: string;
}

export interface UnpersistedFile {
  filename: string;
  path?: string;
  id?: string;
  file?: File;
}

export default abstract class BaseDocumentService<
  T extends Model
> extends Service {
  @service declare store: emberData__store;
  protected abstract entityName: string;
  protected adapter: ApplicationAdapter;

  public constructor(owner: Owner) {
    super(owner);
    this.adapter = owner.lookup('adapter:application') as ApplicationAdapter;
  }

  get baseUrl() {
    return `${this.adapter.host}/${this.adapter.namespace}`;
  }

  get baseEntityUrl() {
    return `${this.baseUrl}/${this.entityName}`;
  }

  async save(formData: FormData): Promise<T> {
    const id = formData.get('id') as string;
    if (id) {
      return this.update(formData, id);
    }
    return this.create(formData);
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
