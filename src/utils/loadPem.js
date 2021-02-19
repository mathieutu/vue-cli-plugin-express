// loads pem files
import fs from 'fs';
import path from 'path';

export default ({httpsConfig, srvPath, option}) => {
  // load from httpsConfig
  let loadOption;
  const messages = [];
  function getFile () {
    try {
      // https config
      try {
        loadOption = 'httpsConfig';
        let r;
        if (!httpsConfig) {
          messages.push('pluginOptions.httpsConfig is a falsy value');
        } else {
          r = httpsConfig[option];
          if (r) {
            return r;
          }
          messages.push(`httpsConfig did not have the option '${option}'`);
        };
      } catch (e) {
        messages.push(e.message);
      }

      // vue config
      try {
        let r;
        loadOption = 'vue config';
        const vueConf = require(process.env.VUE_CLI_SERVICE_CONFIG_PATH || path.join(process.cwd() + '/vue.config.js'));
        if (!vueConf || !vueConf.devServer || !vueConf.devServer.https) {
          throw new Error(
            'vue.config.js has no exports or is empty to load using the config.\n' +
            'to use this load option, devServer.https option is required, and should not be false');
        }
        r = vueConf.devServer.https[option];
        return r;
      } catch (e) {
        messages.push(e.message);
      }

      // srv/cert/*.pem
      try {
        loadOption = `${option}Path from httpsConfig`;
        let r = httpsConfig && httpsConfig[`${option}Path`];
        if (!r) {
          messages.push(`httpsConfig did not have ${option}Path option`);
          r = srvPath && path.join(srvPath, 'cert', `${option}.pem`);
          loadOption = `read file from ${r}`;
        }
        if (r) {
          const f = fs.existsSync(r) && fs.readFileSync(r);
          if (f) {
            return f;
          }
          messages.push(`${r} does not exist`);
        }
      } catch (e) {
        messages.push(e.message);
      }

      throw new Error(
        `\n======================================================` +
        `\n  ⛔  Unable to get ${option} for https. Resolve one of these issues to load a ${option} file` +
        `\n${messages.map(m => `  ⚠️  ${m.replace('\n', '\n     ')}`).join('\n')}` +
        `\n======================================================`
      );
    } catch (e) {
      console.error(`Last load option was ${loadOption}`);
      throw e;
    }
  }
  const file = getFile();
  if (!Buffer.isBuffer(getFile())) throw new Error(`ssl ${option} is not a buffer. loaded from ${loadOption}. expected buffer, recieved: `, file);
  return file;
};
