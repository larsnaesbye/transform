<template>
  <div id="main"
    v-if="notIE"
  >
    <UiSkipLink />
    <Header
      :hasMenu="isCompatible"
    />
    <router-view
      :key="$route.path"
      id="router-view"
    />
    <Footer/>
  </div>
</template>

<script>
import { isIE, isConsole, isWearable, isSmartTV, isMobileOnly } from 'mobile-device-detect'
import Header from '@/components/shared/header/Header'
import Footer from '@/components/shared/footer/Footer.vue'
import UiSkipLink from '@/components/shared/baseUi/UiSkipLink.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    UiSkipLink
  },
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title || 'Koordinattransformation'
    }
  },
  created () {
    this.$store.dispatch('DatasetsAttributes/get')
  },
  mounted () {
    if (isConsole || isWearable || isSmartTV || isMobileOnly) {
      this.$router.push({ name: 'DeviceError' })
    }
  },
  computed: {
    isCompatible () {
      return !(isConsole || isWearable || isSmartTV || isMobileOnly || isIE)
    },
    notIE () {
      return !isIE
    }
  }
}
</script>

<style lang="stylus" scoped>
div#main
  position relative
  display flex
  flex-direction column
  margin 0
  // outline 0
  padding 0
  height 100%
  width 100%

#router-view
</style>
