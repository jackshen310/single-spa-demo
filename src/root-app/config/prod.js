import app1Config from '../../app1/config/dev';
import app2Config from '../../app2/config/dev';
import app3Config from '../../app3/config/dev';
import navbarConfig from '../../navbar/config/dev';

export default {
  apps: [
    {
      name: 'navbar',
      path: '',
      main: `./navbar/index.js`,
      base: true,
    },
    {
      name: 'app-1',
      path: '/app1',
      main: `./app1/index.js`,
      base: false,
    },
    {
      name: 'app-2',
      path: '/app2',
      main: `./app2/index.js`,
      base: false,
    },
    {
      name: 'app-3',
      path: '/app3',
      main: `./app3/index.js`,
      base: false,
    },
  ],
};
