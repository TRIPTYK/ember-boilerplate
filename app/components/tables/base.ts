import type Store from '@ember-data/store';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import type ModelRegistry from 'ember-data/types/registries/model';
import type ArrayProxy from '@ember/array/proxy';
import sanitizeString from '@triptyk/ember-utils/utils/sanitize-string';
import type RouterService from '@ember/routing/router-service';
import { waitFor } from '@ember/test-waiters';

export interface TableLoadDataApi {
  paginationData: {
    pageSize: number;
    pageNumber: number;
    pageStart: number;
    pageEnd: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    totalRows: number;
    totalPages: number;
  };
  sortData: {
    prop: string;
    direction: string;
  }[];
  filterData: {
    filter: string;
    filterUsing?: string;
    columnFilters: { filter: string; fitlerUsing: string }[];
  };
  filterRole: {
    filter: string;
  };
}

export interface TableApi {
  reloadData: Function;
}

export interface BaseServerTableArgs {
  registerApi?: (api: TableApi) => unknown;
  editElement: Function;
  deleteElement: Function;
}

export function formatSearchValue(q: string) {
  return q
    .split(' ')
    .filter((q) => q.trim() !== '')
    .map((part) => `${part}:*`)
    .join(' & ');
}

export abstract class BaseServerTable<
  T extends BaseServerTableArgs,
  K extends keyof ModelRegistry
> extends Component<T> {
  @service declare store: Store;
  @service declare router: RouterService;

  @tracked totalRows?: number;
  @tracked filterText?: string;
  pageSize: number = 50;
  public tableApi?: TableApi;

  abstract get entityName(): K;
  abstract get relationships(): string | undefined;

  @action
  onSearch(value: string) {
    this.filterText = value;
  }

  @action
  deleteElement(entity: ModelRegistry[K], e: Event) {
    e.stopPropagation();
    this.args.deleteElement(entity, e);
  }

  @action
  editElement(entity: ModelRegistry[K], e: Event) {
    e.stopPropagation();
    this.args.editElement(entity, e);
  }
  @action
  search(text: string) {
    this.filterText = text;
  }

  @action
  registerApi(api: TableApi) {
    this.args.registerApi?.(api);
    this.tableApi = api;
  }

  @action
  reload() {
    this.tableApi?.reloadData();
  }

  @action
  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  @action
  // eslint-disable-next-line complexity
  @waitFor
  async loadData(
    data: TableLoadDataApi
  ): Promise<
    Promise<ArrayProxy<ModelRegistry[K]>> | ArrayProxy<ModelRegistry[K]>
  > {
    const sortString = data.sortData
      .map(
        (sortField) =>
          `${sortField.direction === 'asc' ? '' : '-'}${sortField.prop}`
      )
      .join(',');
    const array: ArrayProxy<K> = await this.store.query(this.entityName, {
      include: this.relationships ? this.relationships : undefined,
      filter: {
        search: {
          $fulltext: data.filterData?.filter
            ? formatSearchValue(sanitizeString(data.filterData?.filter))
            : undefined,
        },
        ...this.additionalFilters(),
      },
      page: {
        size: data.paginationData.pageSize,
        number: data.paginationData.pageNumber,
      },
      sort: sortString ? sortString : '-updatedAt',
    });

    this.totalRows = (
      array as ArrayProxy<K> & {
        meta: {
          fetched: number;
          total: number;
        };
      }
    ).meta.total;

    return array;
  }

  protected additionalFilters() {
    return {};
  }
}
