module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    scripts: {
      'express': 'vue-cli-service express:watch',
      'express:run': 'vue-cli-service express:run',
    },
    vue: {
      pluginOptions: {
        express: {
          shouldServeApp: options.shouldServeApp,
          serverDir: options.serverDir,
        },
      },
    },
  });

  api.render('./templates/srv');

  if (options.addExamples) {
    // TODO
  }
};
