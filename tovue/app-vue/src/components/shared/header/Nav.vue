<template>
  <nav aria-label="Hovedmenu">
    <ul>
      <li class="anim-underline color-theme" :class="{ active: $route.name == 'Home'}">
        <router-link
          to="/"
          class="main-menu__item"
        >
          Danmark
        </router-link>
      </li>
      <li class="anim-underline color-theme" :class="{ active: $route.name == 'Datasets' || $route.name == 'Dataset' || $route.name == 'DatasetVisning'}">
        <router-link
          to="/dataoversigt"
          class="main-menu__item"
        >
          Grønland
        </router-link>
      </li>
      <li class="anim-underline color-theme" :class="{ active: $route.name == 'About'}">
        <router-link
          to="/vejledning"
          class="main-menu__item"
        >
          Vejledning
        </router-link>
      </li>
      <li class="anim-underline color-theme" :class="{ active: $route.name == 'Support'}">
        <router-link
          to="/cookies"
          class="main-menu__item"
        >
          Dokumentation
        </router-link>
      </li>
      <li class="anim-underline color-theme" :class="{ active: $route.name == 'Support'}">
        <router-link
            to="/om"
            class="main-menu__item"
        >
          Om denne webapp
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  components: {},
  data () {
    return {
      windowWidth: window.innerWidth
    }
  },
  created () {
    window.addEventListener('resize', this.setWindowWidth)
  },
  methods: {
    hover (elm) {
      this.$refs[elm].$el.classList.toggle('hover')
    },
    setWindowWidth () {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style lang="stylus" scoped>

nav
  padding-left 1rem
  display flex
  justify-content flex-end

nav ul
  margin 0
  display flex
  flex-direction row
  list-style none

li.active .main-menu__item
  font-weight bold
  color var(--turquoise)

.main-menu__item
  color #000
  white-space nowrap
  word-break keep-all
  flex-shrink 0
  font-size .9rem
  margin-top 0.2rem
  margin-bottom 0.3rem
  line-height 0.875rem
  font-weight 500
  letter-spacing 0.06rem
  text-transform uppercase
  &:hover
    text-decoration none

li,
li > a
  display flex
  flex-direction row
  align-items center

li
  padding-left 1rem
  padding-right 1rem
 // TODO remove padding on media queries

.nav-icon
  width 3rem
  height 3rem
  flex-shrink 0
  border-width 1px
  border-style solid
  border-radius 50%
  border-color #fff

.nav-icon:hover,
.hover
  border-color #2E9989
  background-color #3EDDC6

@media (max-width: 1025px) {
  .main-menu__item {
    font-size: .6rem;
  }
}
</style>
