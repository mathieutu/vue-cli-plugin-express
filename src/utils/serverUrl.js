import fs from 'fs';
import path from 'path';
import { coalesce } from './misc';
import prepareURLs from '@vue/cli-service/lib/util/prepareURLs';
import { format } from 'url';

const tmpPath = path.resolve(__dirname, '.tmpServerUrl');

export default {
  isSet () {
    return fs.existsSync(tmpPath);
  },
  getFromFile () {
    return fs.readFileSync(tmpPath, 'utf8');
  },
  writeToFile (url) {
    fs.writeFileSync(tmpPath, url);
  },
  deleteFile () {
    if (this.isSet()) {
      fs.unlinkSync(tmpPath);
    }
  },

  async findServerUrl (args, defaults) {
    const useHttps = coalesce(args.https, defaults.https);
    const protocol = useHttps ? 'https' : 'http';
    const host = coalesce(args.host, process.env.HOST, defaults.host);
    const port = await findPort(coalesce(args.port, process.env.PORT, defaults.port));
    const urls = prepareURLs(protocol, host, port);

    return {
      protocol,
      host,
      port,
      path,
      networkUrl: urls.lanUrlForTerminal,
      localUrl: format({ protocol, hostname: host, port, pathname: '/' }),
      localUrlForTerminal: urls.localUrlForTerminal,
      localUrlForBrowser: urls.localUrlForBrowser,
    };
  },
};

const findPort = wantedPort => {
  const portFinder = require('portfinder');
  portFinder.basePort = wantedPort;
  return portFinder.getPortPromise();
};
