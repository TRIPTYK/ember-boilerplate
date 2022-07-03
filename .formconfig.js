module.exports = {
  overrides: {
    checkbox: (type, name) => ({
      hbs: `<Input @type="checkbox" @checked={{changeset-get @changeset "${name}"}} {{on "change" ( fn this.updateValue "${name}")}} @name="${name}" data-test-input="${name}" />`,
      selector: `[data-test-input="${name}"]`,
      validation: ['validatePresence(true)'],
      tests: (selector) => ({
        create: {
          checkValueAssert: `assert.dom('${selector}').isNotChecked()`,
          fillValueHelper: `await click('${selector}')`,
          fillValueHelperImport: `import click from '@ember/test-helpers/dom/click'`,
          saveFunctionAssert: `assert.strictEqual(changeset.get("${name}"), true)`,
        },
        edit: {
          startValue: true,
          checkValueAssert: `assert.dom('${selector}').isChecked()`,
          fillValueHelper: `await click('${selector}')`,
          fillValueHelperImport: `import click from '@ember/test-helpers/dom/click'`,
          saveFunctionAssert: `assert.strictEqual(changeset.get("${name}"), false)`,
        },
      }),
    }),
    text: (type, name) => ({
      hbs: `<Input @value={{changeset-get @changeset "${name}"}} {{on "change" ( fn this.updateValue "${name}")}} @name="${name}" data-test-input="${name}" />`,
      selector: `[data-test-input="${name}"]`,
      validation: ['validatePresence(true)'],
      tests: (selector) => ({
        create: {
          checkValueAssert: `assert.dom('${selector}').hasValue('')`,
          fillValueHelper: `await fillIn('${selector}','edited')`,
          fillValueHelperImport: `import fillIn from '@ember/test-helpers/dom/fill-in'`,
          saveFunctionAssert: `assert.strictEqual(changeset.get("${name}"), 'edited')`,
        },
        edit: {
          startValue: '"hello"',
          checkValueAssert: `assert.dom('${selector}').hasValue('hello')`,
          fillValueHelper: `await fillIn('${selector}','helloEdited')`,
          fillValueHelperImport: `import fillIn from '@ember/test-helpers/dom/fill-in'`,
          saveFunctionAssert: `assert.strictEqual(changeset.get("${name}"), 'helloEdited')`,
        },
      }),
    }),
    textarea: (type, name) => ({
      hbs: `<Textarea @value={{changeset-get @changeset "${name}"}} {{on "change" ( fn this.updateValue "${name}")}} @name="${name}" data-test-input="${name}" />`,
      selector: `[data-test-input="${name}"]`,
      validation: ['validatePresence(true)'],
      tests: (selector) => ({
        create: {
          checkValueAssert: `assert.dom('${selector}').hasValue('')`,
          fillValueHelper: `await fillIn('${selector}','edited')`,
          fillValueHelperImport: `import fillIn from '@ember/test-helpers/dom/fill-in'`,
          saveFunctionAssert: `assert.strictEqual(changeset.get("${name}"), 'edited')`,
        },
        edit: {
          startValue: '"hello"',
          checkValueAssert: `assert.dom('${selector}').hasValue('hello')`,
          fillValueHelper: `await fillIn('${selector}','helloEdited')`,
          fillValueHelperImport: `import fillIn from '@ember/test-helpers/dom/fill-in'`,
          saveFunctionAssert: `assert.strictEqual(changeset.get("${name}"), 'helloEdited')`,
        },
      }),
    }),
  },
};
