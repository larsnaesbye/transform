<template>
  <section
    class="layout-3col__footer"
    :style="'background-color: white;'"
  >
    <p>Is this Hero template here?</p>
    <span v-if="image" class="hero__credit white-text">{{ photoCredit }}</span>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    title: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    photoCredit: {
      type: String,
      default: 'Foto: Lars Schmidt / schmidtaps.com'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.firstfocus.focus()
    })
  }
}
</script>

<style lang="stylus" scoped>
section
  padding 0 10vw
  margin 0
  width 100%
  min-height 40vh
  background-repeat no-repeat
  background-position 50% 50%
  background-size cover
  position relative

article
  margin-top calc(2rem + 1rem + 4rem)
  margin-left 1rem
  margin-right 1rem
  padding 3vw 0
  display flex
  flex-direction column
  max-width 35rem

h1
  color white

p
  margin-top 0
  color white

.hero__credit
  position absolute
  right: 1rem
  bottom 1rem
  color white
  font-size .8rem
  opacity .6

h1:focus
  outline none

</style>
