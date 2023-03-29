# ember-boilerplate

[![CI](https://github.com/TRIPTYK/ember-boilerplate/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/TRIPTYK/ember-boilerplate/actions/workflows/ci.yml)

## You can use this IF

- ✅ You use tailwindcss
- ✅ You use Typescript
- ✅ You want an Embroider boilerplate
- ✅ You use JWT based authentification
- ✅ You want a lot of code checks

## Preconfigured 4.x Ember project with

### Ember Side

- Embroider
- Typescript integration (ember-cli-typescript)
- Validations (ember-changeset-validations) (with typescript types)
- Tailwindcss 3.x, with primary and secondary colors configured
- Flash messages (ember-cli-flash)
- Login Form (ember-form-changeset-validations)
- Tests (ember-test-selectors, ember-test-coverage)
- Sessions,Login,Logout,... (ember-simple-auth,ember-simple-auth-token)
- Base ember adapter, serializer and controller
- Ember concurrency

### Vscode side

- VSCODE Ready, all rules are setup for a great developing experience.

### CI

- Ligthouse CI
- Tests
  - Linting
  - Ember tests
  - Code coverage check
  - JSCPD code duplication checking

## Approach

- We have the rule 'ember/no-controllers' activated, so usage of controllers other than for query params is prohibited. Instead, you must create a component in 'pages'. Each component should accept a @model.

Note: Exception for the ApplicationController, needed for an addon.

## Installation

- `git clone git@github.com:TRIPTYK/ember-boilerplate.git` this repository
- `cd ember-boilerplate`
- `rm -rf .git`
- `git init`
- `pnpm install`

Or

- "Use this template" button on Github

## Running / Development

- `ember serve`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details.

Generate forms using `ember g form <form>`, see [Ember Form Changeset Validations](https://github.com/TRIPTYK/ember-form-changeset-validations)

### Running Tests

- `ember test`
- `ember test --server`

### Linting

- `yarn lint`
- `yarn lint:fix`

### Building

- `ember build` (development)
- `ember build --environment production` (production)
