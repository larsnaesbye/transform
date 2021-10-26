<template>
  <section
    class="layout-3col__footer"
    :style="'background-image: linear-gradient(90deg, rgba(28, 36, 0, 0.6), transparent), linear-gradient(180deg, rgba(36, 46, 0, 0.6) 24%, transparent), url(' + image + ');'"
  >
    <article aria-label="Sideintroduktion">
      <h1
        tabindex="0"
        id="maincontent"
        ref="firstfocus"
      >
        {{ title }}
      </h1>
      <p>
        {{ summary }}
      </p>
      <slot></slot>
    </article>
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
