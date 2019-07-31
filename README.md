# vue-cli-plugin-express

[![npm](https://img.shields.io/npm/v/vue-cli-plugin-express.svg) ![npm](https://img.shields.io/npm/dt/vue-cli-plugin-express.svg)](https://www.npmjs.com/package/vue-cli-plugin-express)
[![vue-cli3](https://img.shields.io/badge/vue--cli-3.x-brightgreen.svg)](https://github.com/vuejs/vue-cli)

**:rocket: Add an API in your Vue application in 2 minutes!**

This is a vue-cli 3.x plugin to add a Node Express server to your Vue project.

<br>

![screenshot](./screenshot.png)

<br>

**:star: Features:**

- Fully customizable Express Server:
  - Just add your api routes into your project (with import/export support)
  - Optional automatic fallback to the Vue app. Serve both the api and the application with Express
  - Optional socket.io support
- 🔜 Example routes and components ([⚠️ Needs contribution!](https://github.com/mathieutu/vue-cli-plugin-express/issues/12))

## Table of contents

- [Getting started](#getting-started)
- [Usage](#usage)
- [Injected Commands](#injected-commands)
- [Configuration](#configuration)
- [Use your app in production](#use-your-app-in-production)

---

## Getting started

:warning: Make sure you have vue-cli 3.x.x:

```sh
vue --version
```

If you have not installed vue-cli 3, first follow the install instructions here: [https://cli.vuejs.org/](https://cli.vuejs.org/)

Generate a project using vue-cli 3

```sh
vue create my-new-app
```

Navigate to the newly created project folder and add this plugin. It is good practice to commit your changes prior to installing a new plugin.

```sh
cd my-new-app
vue add express
```

:soon: _:information_source: An example `APIExample.vue` component will be added should you choose to include examples when installing the plugin._

## Usage

To start your server for development, run:

```sh
yarn express
```

The server will watch for file changes and automatically restart.

Then you just have to start the web app:

```sh
yarn serve
```

Alternatively you can serve the web app and api together from express by setting the plugin option, `shouldServeApp` to `true`. See the [Configuration](#configuration) section below for further details. You will also need to tell Express where to serve your web application by adding the following to `./srv/index.js`;

```js
var router = express.Router();
router.use(express.static("./dist"));
app.use("/", router);
```

Where `./dist` is the location of your built web application.

**Updating `vue-cli-plugin-express` will update the Express server service :+1:**

## Injected Commands

- **`vue-cli-service express:watch`**

  Run the Express server with info from `./srv` and watch the files to restart itself automatically.

- **`vue-cli-service express:run`**

  Run the Express server with info from `./srv` once.

## Configuration

The Express Server can be configured via the `pluginOptions` in `vue.config.js`:

```js
module.exports = {
  // Other options...
  pluginOptions: {
    // Express-related options
    express: {
        shouldServeApp: true,
        serverDir: './srv',
      },
    },
  },
}
```

## Use your app in production

For production use you need to move `@vue/cli-service` from `devDependencies`to `dependencies`.
Then build your app and run the server:

```sh
yarn build
yarn express:run
```

Most cloud hosting services will expect a npm `start` script to run your application. It is recommended you add the following to your `package.json`:

```json
{
  "scripts": {
    "start": "yarn express:run"
  }
}
```
