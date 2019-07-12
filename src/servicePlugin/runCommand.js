import serverUrl from '../utils/serverUrl';
import proxyPaths from '../utils/proxyPaths';
import logSuccessLunch from '../utils/logSuccessLaunch';
import server from '../server';

export default ({
  defaultOptions,
  srvPath,
  shouldServeApp,
  isInProduction,
  distPath,
  hasTypescript,
}) => args => {
  const run = async (resolve) => {
    const {
      port,
      localUrl,
      networkUrl,
      localUrlForTerminal,
    } = await serverUrl.findServerUrl(args, defaultOptions);

    const routes = await server({
      port,
      srvPath,
      distPath,
      hasTypescript,
      shouldServeApp,
      isInProduction,
    });

    if (shouldServeApp && !isInProduction) {
      serverUrl.writeToFile(localUrl);
      proxyPaths.writeToFile(routes);
    }

    logSuccessLunch({
      urls: { local: localUrlForTerminal, network: networkUrl },
      routes,
      isInProduction,
      shouldServeApp,
    });

    resolve();
  };

  return new Promise((resolve) => {
    if (args.delay) {
      setTimeout(() => run(resolve), 300);
    } else {
      run(resolve);
    }
  });
};
