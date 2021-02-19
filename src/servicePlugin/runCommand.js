import serverUrl from '../utils/serverUrl';
import logSuccessLaunch from '../utils/logSuccessLaunch';
import server from '../server';

export default ({
  defaultOptions,
  srvPath,
  shouldServeApp,
  isInProduction,
  distPath,
  hasTypescript,
  https,
  httpsConfig,
}) => args => {
  const run = async (resolve) => {
    console.log(args, defaultOptions);
    const {
      port,
      host,
      localUrl,
      networkUrl,
      localUrlForTerminal,
    } = await serverUrl.findServerUrl(args, defaultOptions);

    // overwrite config with cmd arguments
    https = args.https;

    console.log(httpsConfig);
    const routes = await server({
      port,
      host,
      srvPath,
      distPath,
      hasTypescript,
      shouldServeApp,
      isInProduction,
      https,
      httpsConfig,
    });

    if (shouldServeApp && !isInProduction) {
      serverUrl.writeToFile(localUrl);
    }

    logSuccessLaunch({
      urls: { local: localUrlForTerminal, network: networkUrl },
      routes,
      isInProduction,
      shouldServeApp,
      https,
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
