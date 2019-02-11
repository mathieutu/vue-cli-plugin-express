import express from 'express';
import listEndpoints from 'express-list-endpoints';
import history from 'connect-history-api-fallback';
import httpServer from 'http';

export default ({
  port,
  srvPath,
  distPath,
  hasTypescript,
  shouldServeApp,
  isInProduction,
}) => {
  return new Promise((resolve, reject) => {
    const app = express();
    const http = httpServer.Server(app);

    if (hasTypescript) {
      require('ts-node/register/transpile-only');
    }

    const server = loadServer(srvPath);

    server(app, http);

    if (isInProduction && shouldServeApp) {
      app.use(history());
      app.use(express.static(distPath));
    }

    http.listen(port, err => {
      if (err) {
        reject(err);
      } else {
        resolve(getAppEndpoints(app));
      }
    });

  });
};

function getAppEndpoints (app) {
  try {
    return listEndpoints(app);
  } catch (e) {
    return [];
  }
}

function loadServer (file) {
  const empty = () => {};
  try {
    const module = require(file);
    return module.default || module || empty;
  } catch (e) {
    return empty;
  }
}
