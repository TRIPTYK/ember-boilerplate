# ember-boilerplate

[![CI](https://github.com/TRIPTYK/ember-boilerplate/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/TRIPTYK/ember-boilerplate/actions/workflows/ci.yml)

Preconfigured 4.x Ember project with

- Embroider
- Typescript integration (ember-cli-typescript)
- Prettier-eslint
- Validations (ember-changeset-validations) (with typescript types)
- Tailwindcss 3.x
- Flash messages (ember-cli-flash)
- Login Form (ember-form-changeset-validations)
- Tests (ember-test-selectors, ember-test-coverage)
- Sessions,Login,Logout,... (ember-simple-auth)
- Base ember adapter, serializer and controller

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
