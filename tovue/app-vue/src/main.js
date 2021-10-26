import Vue from 'vue'

import store from '@/store'
import router from '@/router'

import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'

import '@/assets/css/fonts.css'
import '@/assets/js/colors'
import '@/assets/css/base.styl'
import '@/assets/css/classes.styl'
import '@/assets/css/form-elements.styl'
import '@/assets/css/grid.css'

import smoothscroll from 'smoothscroll-polyfill'
import VTooltip from 'v-tooltip'
// import 'pepjs'  pointer events polyfill (open layers i safari)

Vue.use(VTooltip, {
  defaultBoundariesElement: document.body,
  popover: {
    defaultAutoHide: true
  }
})

smoothscroll.polyfill()

// eslint-disable-next-line one-var
const App = () => import('@/App'),
  axios = () => import(/* webpackChunkName: "axios" */'axios')

Vue.use(axios)

Vue.config.productionTip = false

Vue.component(
  'Icon', () => import('@/components/shared/Icon')
)
Vue.component(
  'UiButton', () => import('@/components/shared/Icon')
)

window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-new
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}, { capture: true, once: true, passive: true })

let handleOutsideClick
Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    handleOutsideClick = (e) => {
      e.stopPropagation()
      const { handler, exclude } = binding.value
      let clickedOnExcludedEl = false
      if (exclude && exclude[0]) {
        exclude.forEach(refName => {
          if (!clickedOnExcludedEl) {
            const excludedEl = vnode.context.$refs[refName]
            clickedOnExcludedEl = (excludedEl && excludedEl.contains(e.target))
          }
        })
      }
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        vnode.context[handler]()
      }
    }
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  },
  unbind () {
    // If the element that has v-closable is removed, then
    // unbind click/touchstart listeners from the whole page
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  }
})
