import express from 'express';
import listEndpoints from 'express-list-endpoints';
import history from 'connect-history-api-fallback';
import httpServer from 'http';
import httpsServer from 'https';
import loadPem from './utils/loadPem';

export default ({
  port,
  host,
  srvPath,
  httpsConfig,
  distPath,
  hasTypescript,
  shouldServeApp,
  isInProduction,
  https,
}) => {
  return new Promise((resolve, reject) => {
    const app = express();
    let certInfo;
    if (https) {
      certInfo = {
        key: loadPem({httpsConfig, srvPath, option: 'key'}),
        cert: loadPem({httpsConfig, srvPath, option: 'cert'}),
      };
    }
    const webServer = !https
      ? httpServer.Server(app)
      : httpsServer.Server(
        app,
        certInfo
      );
    if (hasTypescript) {
      require('ts-node/register/transpile-only');
    }

    const server = loadServer(srvPath);

    server(app, webServer);

    if (isInProduction && shouldServeApp) {
      app.use(history());
      app.use(express.static(distPath));
    }

    webServer.listen(port, host, err => {
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
