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

  api.render({[`${options.serverDir}/index.js`]: './templates/srv/index.js'});

  if (options.addExamples) {
    // TODO
  }
};
