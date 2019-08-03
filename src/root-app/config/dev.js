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
      store: '/app1/store.js',
      base: false,
    },
    {
      name: 'app-2',
      path: '/app2',
      main: `/app2/main.js`,
      store: '/app2/store.js',
      base: false,
    },
    {
      name: 'app-3',
      path: '/app3',
      main: `/app3/index.js`,
      store: '/app3/store.js',
      base: false,
    },
    {
      name: 'app-4',
      path: '/app4',
      main: `/app4/umi.js`,
      store: '/app4/store.js',
      base: false,
    },
  ],
};
