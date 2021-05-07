import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { getProperties } from '@ember/object';
import { BufferedChangeset } from 'ember-changeset/types';

export interface BaseValidationFormInterface {
  // eslint-disable-next-line no-unused-vars
  saveFunction: ((changeset: BufferedChangeset) => Promise<any>) | null;
  mode: 'update' | 'create';
  entity: any;
}

export default class BaseFormComponent<
  T extends Record<string, any>
> extends Component<BaseValidationFormInterface & T> {
  @tracked changeset;
  @tracked DTO: T;

  constructor(
    owner: unknown,
    args: BaseValidationFormInterface & T,
    originalDTO: Record<string, any> & T,
    validator: Record<string, any>
  ) {
    super(owner, args);

    if (args.mode === 'update') {
      this.DTO = {
        ...originalDTO,
        ...(args.entity.save
          ? getProperties(
              args.entity,
              Object.keys(originalDTO)
                .filter((o) => args.entity.get(o) !== undefined) // remove undefined keys
                .concat(['id'])
            )
          : args.entity),
      };
    } else {
      this.DTO = originalDTO;
    }
    this.changeset = Changeset(this.DTO, lookupValidator(validator), validator);
  }

  @action
  async submit(e: Event) {
    e?.preventDefault();
    await this.changeset.validate();

    if (this.changeset.isValid) {
      await this.args.saveFunction?.(this.changeset);
    }
  }
}
