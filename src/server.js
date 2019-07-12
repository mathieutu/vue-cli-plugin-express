import express from 'express';
import listEndpoints from 'express-list-endpoints';
import history from 'connect-history-api-fallback';
import httpServer from 'http';

export default ({
  port,
  host,
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

    http.listen(port, host, err => {
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
  const moduleIsAvailable = () => {
    try {
      require.resolve(file);
      return true;
    } catch (e) {
      return false;
    }
  };

  const empty = () => {};

  if (!moduleIsAvailable()) {
    return empty;
  }

  const module = require(file);
  return module.default || module || empty;
}
