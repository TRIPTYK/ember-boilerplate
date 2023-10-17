import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

/**
 * GLIMMERIZED PAGINATION COMPONENT
 * DO NOT MODIFY
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Pagination extends Component<any> {
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
