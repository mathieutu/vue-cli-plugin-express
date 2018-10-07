import { serverDir, shouldServeApp } from '../config';

module.exports = [
  {
    type: 'confirm',
    name: 'shouldServeApp',
    message: `Should serve vue app?`,
    description: 'This will allow you to serve the vue app via the express server. So only one server for the app and the api.',
    default: shouldServeApp,
  },
  {
    type: 'input',
    name: 'serverDir',
    message: `Where will be located your server?`,
    description: 'The location of your server code, relative to the root of your project.',
    default: serverDir,
  },
];
