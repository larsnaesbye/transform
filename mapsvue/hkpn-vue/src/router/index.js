import
/* webpackChunkName: "Router" */
/* webpackPreload: true */
{ createRouter, createWebHistory } from 'vue-router'

// eslint-disable-next-line one-var
const Home = () => import(/* webpackChunkName: "Home", webpackMode: "lazy", webpackPreload: true */ '@/views/Home.vue'),
  News = () => import(/* webpackChunkName: "News", webpackMode: "lazy", webpackPreload: true */ '@/views/News.vue'),
  About = () => import(/* webpackChunkName: "About", webpackMode: "lazy", webpackPreload: true */ '@/views/About.vue'),
  CookiePolitik = () => import(/* webpackChunkName: "CookiePolitik", webpackMode: "lazy", webpackPreload: true */ '@/components/about/CookiePolitik.vue'),
  Persondata = () => import(/* webpackChunkName: "GDPR, webpackMode: "lazy", webpackPreload: true */ '@/components/about/Persondata.vue'),
  Feedback = () => import(/* webpackChunkName: "Feedback", webpackMode: "lazy", webpackPreload: true */ '@/views/Feedback.vue'),
  PageBrowserIncompatible = () => import(/* webpackChunkName: "PageBrowserIncompatible", webpackMode: "lazy", webpackPreload: true */ '@/views/PageBrowserIncompatible.vue'),
  PageDeviceIncompatible = () => import(/* webpackChunkName: "PageDeviceIncompatible", webpackMode: "lazy", webpackPreload: true */ '@/views/PageDeviceIncompatible.vue'),
  PageMobileIncompatible = () => import(/* webpackChunkName: "PageMobileIncompatible", webpackMode: "lazy", webpackPreload: true */ '@/views/PageMobileIncompatible.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home
    }
  },

  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback
  },

  {
    path: '/news',
    name: 'News',
    component: News
  },

  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/PageBrowserIncompatible',
    name: 'PageBrowserIncompatible',
    component: PageBrowserIncompatible,
    meta: {
      textColor: 'black',
      domain: 'historiskekort.dk'
    }
  },
  {
    path: '/PageDeviceIncompatible',
    name: 'PageDeviceIncompatible',
    component: PageDeviceIncompatible,
    meta: {
      textColor: 'black',
      domain: 'historiskekort.dk'
    }
  },
  {
    path: '/PageMobileIncompatible',
    name: 'PageMobileIncompatible',
    component: PageMobileIncompatible,
    meta: {
      textColor: 'black',
      domain: 'historiskekort.dk'
    }
  },
  {
    path: '/CookiePolitik',
    name: 'CookiePolitik',
    component: CookiePolitik,
    meta: {
      textColor: 'black',
      domain: 'historiskekort.dk'
    }
  },
  {
    path: '/Persondata',
    name: 'Persondata',
    component: Persondata,
    meta: {
      textColor: 'black',
      domain: 'historiskekort.dk'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else if (savedPosition && !(to.name === 'Home')) {
      return savedPosition
    } else {
      return { left: 0, top: 0, behavior: 'smooth' }
    }
  }
})

export default router
