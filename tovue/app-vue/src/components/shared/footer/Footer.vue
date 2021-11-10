<template>
  <footer>
    <Us/>
  </footer>
</template>

<script>

export default {
  name: 'Footer',
  components: {
    Us: () => import('@/components/shared/footer/Us'),
  },
  data() {
    return {
      KEFMLogoUrl: '',
      ENSLogoUrl: '',
      FSTSLogoUrl: '',
      FSLogoUrl: '',
      SDFELogoUrl: ''
    }
  },
  computed: {
    pageAssets() {
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
footer
  position relative

section
  padding 3.5vw 10vw 3.5vw 10vw
  align-items flex-start

section.info
  background-color var(--background)

section.branding
  background-color var(--otherSteel)

article.brands
article.copyright
  grid-column 1 / -1
  display flex

.brands
  flex-direction row
  padding-bottom 1.5vw
  align-items center

  & > div
    flex-basis calc(20% - 1rem)
    margin 2.25rem

  & img
    max-width 100%
    max-height 100%
    display block
    image-rendering auto

  & .brand-logo
    margin-top 1rem
    margin-right 1rem

  & h5
    margin-bottom 0

  & a
    font-style italic
    font-size 0.875rem
    line-height 1.125rem
    text-transform lowercase

  & div span::before
    content "\A"
    white-space pre

.sdfe-logo
  display inline-flex

.copyright
  flex-direction column
  border-top 1.5px solid var(--darkSteel)

  & p
    margin 0
    font-size 0.875rem
    line-height 1.125rem
    padding-left 1rem

  & p:first-of-type
    margin-top 0.8rem
    margin-bottom: 0.5rem

  & p span
    font-weight bold
</style>
