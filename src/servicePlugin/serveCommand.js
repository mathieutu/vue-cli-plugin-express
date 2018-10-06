import chalk from 'chalk';
import nodemon from 'nodemon';
import { commandOptionsDefaults } from '../config';
import serverUrl from '../utils/serverUrl';

export default ({
  srvPath,
}) => args => {
  return new Promise((resolve, reject) => {
    nodemon({
      exec: `npx vue-cli-service express:run --delay ${getFlatArgs(args)}`,
      watch: [srvPath],
      ext: 'js mjs json ts',
    });

    nodemon.on('restart', () => {
      console.log();
      console.log(chalk.bold.green(`  ⏳  Express server is restarting...`));
    });

    nodemon.on('crash', () => {
      console.log();
      console.log(chalk.bold.red(`  💥  Express server crashed!`));
      console.log(chalk.red(`     Waiting for changes...`));
    });

    nodemon.on('stdout', (...params) => {
      console.log(chalk.grey(...params));
    });

    nodemon.on('stderr', (...params) => {
      console.log(chalk.grey(...params));
    });

    nodemon.on('quit', () => {
      resolve();
      serverUrl.deleteFile();
      process.exit();
    });
  });
};

const getFlatArgs = (args) =>
  Object.keys(commandOptionsDefaults)
    .filter(option => args.hasOwnProperty(option))
    .map(option => {
      const value = args[option];
      return `--${option}` + (value !== true ? ` ${value}` : '');
    })
    .join(' ');
