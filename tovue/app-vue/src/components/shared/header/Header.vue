<template>
  <header
      class="layout-3col"
  >
    <Brand/>
    <div>
      <Nav v-if="hasMenu"/>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {
    Brand: () => import('@/components/shared/header/Brand'),
    Nav: () => import('@/components/shared/header/Nav')
  },
  props: {
    hasMenu: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="stylus" scoped>
// TODO: hide or minimize header on scroll down and vice versa when scroll up
header
  position absolute
  z-index 100
  top 0
  width 100%
  box-sizing border-box
  padding 2rem 10vw 2rem 10vw
  background-color rgba(255, 255, 255, 0)
  align-items flex-start
  grid-template-rows auto

div
  grid-column 2 / -1
  justify-content flex-end
  display flex
  flex-direction row
  height 100%

</style>
