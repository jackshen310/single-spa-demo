import { lazy, Suspense } from 'react';

export default [
  {
    path: '/pageA',
    component: lazy(() => import('./PageA')),
  },
  {
    path: '/pageB',
    component: lazy(() => import('./PageB')),
    routes: [
      {
        path: '/pageB/pageC',
        component: lazy(() => import('./PageC')),
      },
    ],
  },
];
