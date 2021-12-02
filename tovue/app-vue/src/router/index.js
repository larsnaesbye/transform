import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: {title: 'Koordinattransformation - Danmark'},
            component: () => import(/* webpackChunkName: "Home", webpackMode: "lazy" */ '@/views/Home.vue')
        },
        {
            path: '/grønland',
            name: 'Grønland',
            meta: {title: 'Koordinattransformation - Grønland'},
            component: () => import(/* webpackChunkName: "Datasets", webpackMode: "lazy" */ '@/views/Groenland.vue')
        },
        {
            path: '/om',
            name: 'About',
            meta: {title: 'Koordinattransformation - Om'},
            component: () => import(/* webpackChunkName: "About", webpackMode: "lazy" */ '@/views/About.vue')
        },
        {
            path: '/vejledning',
            name: 'Vejledning',
            meta: {title: 'Koordinattransformation - Vejledning'},
            component: () => import(/* webpackChunkName: "Support", webpackMode: "lazy" */ '@/views/Vejledning.vue')
        },
        {
            path: '/dokumentation',
            name: 'Dokumentation',
            meta: {title: 'Koordinattransformation - Dokumentation'},
            component: () => import(/* webpackChunkName: "Cookies", webpackMode: "lazy" */ '@/views/Support.vue')
        },
        {
            path: '*',
            name: '404',
            component: () => import(/* webpackChunkName: "Support", webpackMode: "lazy" */ '@/views/PageNotFound.vue')
        }
    ]
})
