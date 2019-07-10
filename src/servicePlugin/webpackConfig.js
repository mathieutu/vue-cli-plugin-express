import serverUrl from '../utils/serverUrl';
import proxyPaths from '../utils/proxyPaths';

import { done, warn } from '@vue/cli-shared-utils';

export default ({ devServer }) => {
  if (!serverUrl.isSet() && !proxyPaths.isSet()) {
    warn('You have to launch the express server before ' +
      'if you want to use relative path in your code!', 'Express server');
  } else {
    const url = serverUrl.getFromFile();
    const routes = proxyPaths.getFromFile();

    let proxyConfig = {
      '/socket.io': {
        target: url,
        ws: true,
      },
    };

    for (const route of routes) {
      proxyConfig[route.path] = {
        target: url,
      };
    }

    devServer.proxy(proxyConfig);
    done('Fallback will be done on your server. You can use relative calls to it in your code.', 'Express server');
  }
};
