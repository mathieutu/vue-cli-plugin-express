import fs from 'fs';
import path from 'path';

const tmpPath = path.resolve(__dirname, '.tmpProxyPaths');

export default {
  isSet () {
    return fs.existsSync(tmpPath);
  },
  getFromFile () {
    return JSON.parse(fs.readFileSync(tmpPath, 'utf8'));
  },
  writeToFile (routes) {
    fs.writeFileSync(tmpPath, JSON.stringify(routes));
  },
  deleteFile () {
    if (this.isSet()) {
      fs.unlinkSync(tmpPath);
    }
  },
};
