export const serverDir = './srv';

export const commandOptionsDefaults = {
  delay: false,
  host: '0.0.0.0',
  port: 3000,
  https: false,
};

export const commandOptionsDoc = {
  '--delay': `delays run by a small duration (default: ${commandOptionsDefaults.delay})`,
  '--host': `specify host (default: ${commandOptionsDefaults.host})`,
  '--port': `specify port (default: ${commandOptionsDefaults.port})`,
  '--https': `use https (default: ${commandOptionsDefaults.https})`,
};

export const shouldServeApp = true;

export default {
  serverDir,
  commandOptionsDefaults,
  commandOptionsDoc,
  shouldServeApp,
};
