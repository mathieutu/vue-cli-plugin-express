import serverUrl from '../utils/serverUrl';
import { done, warn } from '@vue/cli-shared-utils';

export default ({ devServer }) => {
  if (!serverUrl.isSet()) {
    warn('You have to launch the express server before ' +
      'if you want to use relative path in your code!', 'Express server');
  } else {
    devServer.proxy(serverUrl.getFromFile());
    done('Fallback will be done on your server. You can use relative calls to it in your code.', 'Express server');
  }
};
