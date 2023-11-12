import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export interface YetiTablePaginationSignature {
  Args: {
    theme: {
      pagination: {
        controls: string;
        previous: string;
        next: string;
        info: string;
        pageSize: string;
      };
    },
    customClass?: string;
    disabled: boolean;
    paginationData: {
      isFirstPage: boolean;
      isLastPage: boolean;
      totalRows: number;
      nextPage: number;
      pageSize: number;
      pageEnd: number;
      pageStart: number;
    },
    paginationActions: {
      previousPage: () => void;
      changePageSize: (value: string) => void;
      nextPage: () => void;
    }
  },
  Blocks: {
    default: []
  },
  Element: HTMLDivElement;
}

/**
 * GLIMMERIZED PAGINATION COMPONENT
 * DO NOT MODIFY
 */
class Pagination extends Component<YetiTablePaginationSignature> {
  /**
   * Array of page sizes to populate the page size `<select>`.
   * Particularly useful with an array helper, e.g `@pageSize={{array 10 12 23 50 100}}`
   * Defaults to `[50, 60, 70, 80, 90, 100]`.
   */
  @tracked pageSizes = [50, 60, 70, 80, 90, 100];

  get shouldDisablePrevious(): boolean {
    return this.args['paginationData'].isFirstPage || this.args['disabled'];
  }

  get shouldDisableNext(): boolean {
    return this.args['paginationData'].isLastPage || this.args['disabled'];
  }

  @action
  changePageSize(ev: Event) {
    this.args['paginationActions'].changePageSize(
      (ev.target as HTMLInputElement).value
    );
  }
}

export default Pagination;
