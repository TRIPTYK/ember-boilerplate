# ember-boilerplate

[![CI](https://github.com/TRIPTYK/ember-boilerplate/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/TRIPTYK/ember-boilerplate/actions/workflows/ci.yml)

## You can use this IF

- ✅ You use tailwindcss
- ✅ You use Typescript
- ✅ You want an Embroider boilerplate
- ✅ You use JWT based authentification
- ✅ You want a lot of code checks
- ✅ You use PNPM
- ✅ You don't bother using TRIPTYK packages

## Preconfigured 4.x Ember project with

### Ember Side

- Embroider
- Typescript integration (ember-cli-typescript)
- Validations (ember-changeset-validations) (with typescript types)
- Tailwindcss 3.x, with primary and secondary colors configured
- Flash messages (ember-cli-flash)
- Tests (ember-test-selectors, ember-test-coverage)
- Sessions,Login,Logout,... (ember-simple-auth,ember-simple-auth-token)
- Base ember adapter, serializer and controller
- Ember concurrency
- Test seeding & parallelization (ember-exam)
- dev & test mocking (msw)
- Translations (ember-intl)
- Pre-made registration flow (login/register/forgot-password)

### Vscode side

- VSCODE Ready, all rules are setup for a great developing experience.

### CI

- Tests
  - Linting
  - Ember tests
  - Code coverage check
  - JSCPD code duplication checking

## Approach

### Controllers

- We have the rule 'ember/no-controllers' activated, so usage of controllers other than for query params is prohibited. Instead, you must create a component in 'pages'. Each component should accept a @model.

Note: Exception for the ApplicationController, needed for an addon.

### Translations

- Each component must have his translation file
- A global translation file can be created
- YAML files in snake_case

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

### Running Tests

- `ember test`
- `ember test --server`

### Linting

- `pnpm lint`
- `pnpm lint:fix`

### Building

- `ember build` (development)
- `ember build --environment production` (production)
