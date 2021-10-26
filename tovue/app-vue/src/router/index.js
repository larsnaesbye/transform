import
/* webpackChunkName: "Vue" */
/* webpackPrefetch: true */
Vue from 'vue'

import
/* webpackChunkName: "Vue" */
/* webpackPrefetch: true */
Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { title: 'Forsyningsdataportal' },
      component: () => import(/* webpackChunkName: "Home", webpackMode: "lazy" */ '@/views/Home.vue')
    },
    {
      path: '/dataoversigt',
      name: 'Datasets',
      meta: { title: 'Forsyningsdataportal - Oversigt over datasæt' },
      component: () => import(/* webpackChunkName: "Datasets", webpackMode: "lazy" */ '@/views/Datasets.vue')
    },
    {
      path: '/data/:dataId',
      name: 'Dataset',
      props: true,
      meta: { title: 'Forsyningsdataportal - Dataside' },
      component: () => import(/* webpackChunkName: "Dataset", webpackMode: "lazy" */ '@/views/Dataset.vue')
    },
    {
      path: '/data/:dataId/visning/:tab',
      name: 'DatasetVisning',
      props: true,
      meta: { title: 'Forsyningsdataportal - Dataside visning' },
      component: () => import(/* webpackChunkName: "Dataset", webpackMode: "lazy" */ '@/views/Dataset.vue')
    },
    {
      path: '/om',
      name: 'About',
      meta: { title: 'Forsyningsdataportal - Om' },
      component: () => import(/* webpackChunkName: "About", webpackMode: "lazy" */ '@/views/About.vue')
    },
    {
      path: '/vejledning',
      name: 'Support',
      meta: { title: 'Forsyningsdataportal - Vejledning' },
      component: () => import(/* webpackChunkName: "Support", webpackMode: "lazy" */ '@/views/Support.vue')
    },
    {
      path: '/cookies',
      name: 'CookiePolicy',
      meta: { title: 'Forsyningsdataportal - Cookies' },
      component: () => import(/* webpackChunkName: "Cookies", webpackMode: "lazy" */ '@/views/CookiePolicy.vue')
    },
    {
      path: '/devicefejl',
      name: 'DeviceError',
      meta: { title: 'Forsyningsdataportal - Devicefejl' },
      component: () => import(/* webpackChunkName: "Devicefejl", webpackMode: "lazy" */ '@/views/DeviceIncompatible.vue')
    },
    {
      path: '/ie',
      name: 'BrowserError',
      meta: { title: 'Forsyningsdataportal - Browser' },
      component: () => import(/* webpackChunkName: "BrowserError", webpackMode: "lazy" */ '@/views/BrowserIncompatible.vue')
    },
    {
      path: '/was',
      meta: { title: 'Forsyningsdataportal - Tilgængelighedserklæring' },
      beforeEnter (to, from, next) {
        window.location = 'https://www.was.digst.dk/forsyningsdataportal-dk'
      }
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "Support", webpackMode: "lazy" */ '@/views/PageNotFound.vue')
    }
  ]
})
