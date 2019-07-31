export default {
  apps: [
    {
      name: 'navbar',
      path: '',
      main: `/navbar/index.js`,
      base: true,
    },
    {
      name: 'app-1',
      path: '/app1',
      main: `/app1/index.js`,
      base: false,
    },
    {
      name: 'app-2',
      path: '/app2',
      main: `/app2/main.js`,
      base: false,
    },
    {
      name: 'app-3',
      path: '/app3',
      main: `/app3/index.js`,
      base: false,
    },
  ],
};
