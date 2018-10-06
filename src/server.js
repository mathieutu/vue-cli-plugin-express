import express from 'express';
import { load } from './utils/misc';
import listEndpoints from 'express-list-endpoints';

import history from 'connect-history-api-fallback';

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

    if (hasTypescript) {
      require('ts-node/register/transpile-only');
    }

    load(srvPath)(app);

    if (isInProduction && shouldServeApp) {
      app.use(history());
      app.use(express.static(distPath));
    }

    app.listen(port, err => {
      if (err) {
        reject(err);
      } else {
        resolve(listEndpoints(app));
      }
    });
  });
};
