import config from '../config';
import serveCommand from './serveCommand';
import runCommand from './runCommand';
import webpackConfig from './webpackConfig';
import { coalesce } from '../utils/misc';

module.exports = (api, options) => {
  const expressOptions = (options.pluginOptions && options.pluginOptions.express) || {};
  const shouldServeApp = coalesce(expressOptions.shouldServeApp, config.shouldServeApp);
  const isInProduction = process.env.NODE_ENV === 'production';
  const srvPath = api.resolve(expressOptions.serverDir || config.serverDir);
  const distPath = api.resolve(options.outputDir);
  const hasTypescript = api.hasPlugin('typescript') || expressOptions.hasTypescript;

  if (shouldServeApp && !isInProduction) {
    addServerUrlToWebpackProxy(api);
  }

  registerServeCommand(api, { srvPath });

  registerRunCommand(api, {
    defaultOptions: config.commandOptionsDefaults,
    srvPath,
    shouldServeApp,
    isInProduction,
    distPath,
    hasTypescript,
  });
};

module.exports.defaultModes = {
  'express:watch': 'development',
  'express:run': 'production',
};

function registerServeCommand (api, options) {
  api.registerCommand(
    'express:watch',
    {
      description: 'Run the Express server and watch the sources to restart automatically',
      usage: 'vue-cli-service express:watch [options]',
      options: config.commandOptionsDoc,
      details: 'For more info, see https://github.com/mathieutu/vue-cli-plugin-express',
    },
    serveCommand(options),
  );
}

function registerRunCommand (api, options) {
  api.registerCommand(
    'express:run',
    {
      description: 'Run the Express server',
      usage: 'vue-cli-service express:run [options]',
      options: config.commandOptionsDoc,
      details: 'For more info, see https://github.com/mathieutu/vue-cli-plugin-express',
    },
    runCommand(options),
  );
}

function addServerUrlToWebpackProxy (api) {
  api.chainWebpack(webpackConfig);
}
