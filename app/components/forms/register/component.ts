import Component from '@glimmer/component';

interface RegisterArgs {}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class Register extends Component<RegisterArgs> {
  maskForEuro = {
    mask: 'num €',
    lazy: false,
    blocks: {
      num: {
        mask: Number,
        signed: true,
        scale: 2,
        radix: ',',
        thousandsSeparator: '.',
      },
    },
    overwrite: true,
  };
}
