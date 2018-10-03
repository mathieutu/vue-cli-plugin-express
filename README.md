# vue-cli-plugin-apollo

[![npm](https://img.shields.io/npm/v/vue-cli-plugin-express.svg) ![npm](https://img.shields.io/npm/dm/vue-cli-plugin-express.svg)](https://www.npmjs.com/package/vue-cli-plugin-express)
[![vue-cli3](https://img.shields.io/badge/vue--cli-3.x-brightgreen.svg)](https://github.com/vuejs/vue-cli)

**:rocket: Add an API in your Vue application in 2 minutes!**

This is a vue-cli 3.x plugin to add an Node Express server in your Vue project.

<br>

**:star: Features:**

- Included fully customizable Express Server:
  - You just have to add your api routes into your project (with import/export support)
  - Optional and customisable automatic fallback to the Vue app, to serve both the api and the application with only one command. 
- (soon) Included optional example routes and components.

## Table of contents

- [Getting started](#getting-started)
  - [Usage](#usage)
- [Injected Commands](#injected-commands)
- [Configuration](#configuration)
  - [Client state](#client-state)
  - [Authorization Header](#authorization-header)
  - [Plugin options](#plugin-options)
  - [Mocks](#mocks)
  - [Directives](#directives)
  - [Apollo Engine](#apollo-engine)
  - [Express middlewares](#express-middlewares)
- [Env variables](#env-variables)
- [Injected webpack-chain Rules](#injected-webpack-chain-rules)
- [Running the GraphQL server in production](#running-the-graphql-server-in-production)
- [Manual code changes](#manual-code-changes)

---

## Getting started

:warning: Make sure you have vue-cli 3.x.x:

```
vue --version
```

If you don't have a project created with vue-cli 3.x yet:

```
vue create my-new-app
```

Navigate to the newly created project folder and add the cli plugin:

```
cd my-new-app
vue add express
```

*:information_source: An example `APIExample.vue` component will be added into your sources if you chose to include the examples.*

### Usage

To start your application for development purpose, use theses commands:

```
yarn run express:watch
yarn serve
```

The server will be automatically restarted when a change is detected.

To run the server only once, use this command:
```
yarn run express:run
```

**Updating `vue-cli-plugin-express` will update the Express Server service :+1:**

## Injected Commands

- **`vue-cli-service express:watch`**

  Run the Express server with info from `./srv` and watch the files to restart itself automatically.

- **`vue-cli-service express:run`**

  Run the Express server with info from `./srv` once.

## Configuration

### Plugin options

The Express Server can be configured via the `pluginOptions` in `vue.config.js`:

``` js
module.exports = {
  // Other options...
  pluginOptions: {
    // Express-related options
    express: {
     // TODO
      },
    },
  },
}
```

## Running the Express server in production

### Production app

```
cross-env NODE_ENV=production yarn run express:run --mode production
```

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production yarn run express:run --mode production" 
  }
}
```
