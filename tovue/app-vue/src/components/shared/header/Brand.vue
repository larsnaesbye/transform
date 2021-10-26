<template>
  <router-link
    to="/"
    class="brand cursor-point"
  >
    <web-app-logo class="cursor-point" />
    <div
      class="brand-name"
    >
      <div
        class="title cursor-point"
      >
        Forsyningsdataportal
      </div>
      <span
        class="sub-title cursor-point text-small"
      >
        Klima-, Energi- og Forsyningsministeriet
        <!-- Styrelsen for Dataforsyning og Effektivisering -->
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Brand',
  components: {
    WebAppLogo: () => import('@/components/shared/icons/WebAppLogo')
  },
  data () {
    return {
      color: '#FFF',
      background: '#000'
    }
  },
  computed: {
    dynamicLogo () {
      // eslint-disable-next-line one-var
      const date = new Date(),
        month = date.getMonth() + 1,
        day = date.getDate()
      return ((day === 31) && (month === 10))
        ? 'scary-pumpkin'
        : (month === 12)
            ? 'christmas-crown-logo'
            : 'CrownCirclesLogo'
    }
  },
  methods: {
    hover (colors) {
      const self = this
      self.color = colors.color || self.color
      self.background = colors.background || self.background
    }
  }
}
</script>

<style lang="stylus" scoped>
.brand
  display flex
  cursor default
  grid-column 1

.logo-placeholder
  flex-shrink 0
  border-radius 50%
  width 3rem
  height 3rem
  background: white

.brand-name
  align-self flex-start
  padding-left 1rem
  margin-top .3rem
  display flex
  flex-direction column

.brand-name > .title
  margin-top 2px
  margin-bottom 0.3rem
  color white
  font-size 0.75rem
  line-height 0.875rem
  font-weight 700
  letter-spacing 0.06rem
  text-transform uppercase
  text-align left

span.sub-title
  word-break keep-all
  color white

</style>
