import { lazy } from 'react'


export const routes = [
  {
    component: lazy(() => import('./containers/Root')),
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('./containers/BlogList'))
      },
      {
        path: '/detail/:id',
        exact: true,
        component: lazy(() => import('./containers/BlogDetail'))
      },
      {
        path: '/add',
        exact: true,
        component: lazy(() => import('./containers/BlogAdd'))
      },
    ]
  }
]