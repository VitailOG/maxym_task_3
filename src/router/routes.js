const routes = [
  {
    path:'/',
    component: () => import('../layouts/MainLayout'),
    children:[
      {
        path: '',
        component: () => import('../pages/Region')
      },
      {
        path: '/districts',
        component: () => import('pages/Districts')
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
