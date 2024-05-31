# Ember-boilerplate

[![Tests](https://github.com/TRIPTYK/ember-boilerplate/actions/workflows/ci.yml/badge.svg)](https://github.com/TRIPTYK/ember-boilerplate/actions/workflows/ci.yml)

<p>
  <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
    <img width="160" src="https://vitejs.dev/logo.svg" alt="Vite logo">
  </a>
  <a href="https://emberjs.com" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://emberjs.com/images/brand/ember-tomster-lockup-4c.svg" alt="Vite logo">
  </a>
  <a href="https://triptyk.eu" target="_blank" rel="noopener noreferrer">
    <img width="160" src="https://triptyk.eu/assets/images/tpk-square-logo.svg" alt="Vite logo">
  </a>
</p>

## Preconfigured 5.x Ember project with

- Vite
- Embroider
- Typescript integration (ember-cli-typescript)
- Validations (ember-immer-changeset + yup)
- Tailwindcss 3.x, with primary and secondary colors configured
- Flash messages (ember-cli-flash)
- Tests (ember-test-selectors, ember-cli-page-object)
- Sessions,Login,Logout,... (ember-simple-auth,ember-simple-auth-token)
- Ember data next gen (RequestManager based)
- Ember concurrency
- Test seeding & parallelization (ember-exam)
- dev & test mocking (msw)
- Translations (ember-intl)
- Authorizations (ember-can)
- Pre-made registration flow (login/register/forgot-password)

## VSCODE IDE

- VSCODE Ready, all rules are setup for a great developing experience.

## Additional Tooling

- With-backend: `with-backend.js` Starts the ember app with a backend synchronously.
- Husky: checks linting + code duplication + integration & unit tests before commiting to VSC.

## Docker

- A docker image can be found in `images`.

## CI

A github workflow CI is provided.

## Approach

### Controllers

- We have the rule 'ember/no-controllers' activated, so usage of controllers other than for query params is prohibited. Instead, you must create a component in 'pages'. Each component should accept a @model.

Note: Exception for the ApplicationController, needed for an addon.

### Translations

Translations are located: `translations/`

- Each component must have his translation file
- A global translation file can be created
- YAML files keys in snake_case

### Changesets & Validations

Changesets are located: `app/changesets/`
Changesets services are located: `app/services/changesets`
Validations are located: `app/validations/`

- Each changeset has it's own file and it's own class.
- All changesets comes from `ember-immer-changeset`. It provides full type-checking of changesets.
- A changeset can have a service associated that persists the data of a changeset to an endpoint.

### Authorizations

Authorizations are located: `app/abilities/`.

### Components

Components are located: `app/components/`.

- Pod structure.

### API Mocking

Development mocks are in `app/handlers`.
Testing mocks are split in the `tests` folders.

## Installation

- `git clone git@github.com:TRIPTYK/ember-boilerplate.git` this repository
- `cd ember-boilerplate`
- `rm -rf .git`
- `git init`
- `pnpm install`

## Running / Development

- `pnpm start`
- Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

- `pnpm test`

### Linting

- `pnpm lint`
- `pnpm lint:fix`

### Building

- `pnpm build --mode=dev` (development)
- `pnpm build` (production)
