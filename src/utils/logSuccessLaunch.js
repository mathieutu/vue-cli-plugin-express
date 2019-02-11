import routesTable from './routeTable';
import { clearConsole, done, hasYarn } from '@vue/cli-shared-utils';
import chalk from 'chalk';

export default ({ urls, routes, isInProduction, shouldServeApp }) => {
  const cmd = exec => `${chalk.cyan((hasYarn() ? 'yarn ' : 'npm run ') + exec)}`;

  clearConsole();
  done('', Date().toString());

  console.log();
  console.log('  ♻️  Server running at:');
  console.log(`    - Local:   ${chalk.cyan(urls.local)}`);
  console.log(`    - Network: ${chalk.cyan(urls.network)}`);
  console.log();

  console.log();
  if (isInProduction) {
    console.log(`  📦 You're in ${chalk.bold('production')} mode. To build the application, run ${cmd('build')}.`);
    console.log();
    if (shouldServeApp) {
      console.log(`  🎉 Fallback to the app enabled: ${chalk.bold('your application is served!')}`);
    } else {
      console.log(`  ⚠️  Fallback to the app disabled: ${chalk.bold('your application is not served!')}`);
    }
  } else {
    console.log(`  ⚙  You're in ${chalk.bold('development')} mode. to start the application, run ${cmd('serve')}.`);
    console.log();
    if (shouldServeApp) {
      console.log(`  🎉 Fallback to this server enabled: ${chalk.bold('you can use relative routes in your code!')}`);
    } else {
      console.log(`  ⚠️  Fallback to this server disabled: ${chalk.bold('you cannot use relative routes in your code!')}`);
    }
  }

  console.log();
  if (routes.length) {
    console.log('  🔀 Api routes found:');
    console.log(routesTable(routes));
  } else {
    console.log(`  🔀 No api routes found${isInProduction ? '' : ' (yet?)'}.`);
  }
  console.log();
};
