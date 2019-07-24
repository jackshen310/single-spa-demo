import app1Config from '../../app1/config/dev';
import app2Config from '../../app2/config/dev';
import app3Config from '../../app3/config/dev';
import navbarConfig from '../../navbar/config/dev';

export default {
  apps: [
    {
      name: 'navbar',
      path: '',
      main: `http://localhost:${navbarConfig.port}/index.js`,
      base: true,
    },
    {
      name: 'app-1',
      path: '/app1',
      main: `http://localhost:${app1Config.port}/index.js`,
      base: false,
    },
    {
      name: 'app-2',
      path: '/app2',
      main: `http://localhost:${app2Config.port}/index.js`,
      base: false,
    },
    {
      name: 'app-3',
      path: '/app3',
      main: `http://localhost:${app3Config.port}/index.js`,
      base: false,
    },
  ],
};
