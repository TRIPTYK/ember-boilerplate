import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Application extends Controller {
  @inject router!: any;
  @tracked isOpen: boolean = false;
  get activeRoute() {
    switch (this.router.currentRouteName) {
      case 'index':
        return 'Accueil';
      case 'search':
        return 'Recherche';
      case 'favorites':
        return 'Favoris';
      default:
        return '';
    }
  }

  @action
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    application: Application;
  }
}
