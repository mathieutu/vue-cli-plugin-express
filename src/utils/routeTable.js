import chalk from 'chalk';
import Table from 'cli-table';

const methodsColors = {
  'OPTIONS': 'grey',
  'GET': 'green',
  'POST': 'blue',
  'PUT': 'yellow',
  'PATCH': 'yellow',
  'DELETE': 'red',
};

const visibleMethods = Object.keys(methodsColors);

export default routes => {
  const table = new Table({
    // head: [chalk.white('ROUTES'), chalk.white('METHODS')],
    chars: {
      'top': '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      'bottom': '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      'left': '',
      'left-mid': '',
      'mid': '',
      'mid-mid': '',
      'right': '',
      'right-mid': '',
      'middle': ' ',
    },
    style: { 'padding-left': 0, 'padding-right': 0, compact: true },
  });

  routes.forEach(route => table.push([`    - ${route.path}:`, prepareMethods(route.methods)]));

  return table.toString();
};

const prepareMethods = methods => methods
  .filter(method => visibleMethods.includes(method))
  .sort((first, second) => visibleMethods.indexOf(first) - visibleMethods.indexOf(second))
  .map(method => chalk[methodsColors[method] || 'default'](method))
  .join(', ');
