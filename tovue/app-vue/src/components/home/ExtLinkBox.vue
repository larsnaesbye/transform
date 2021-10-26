<template>
  <article
    :title="title"
    :aria-label="title"
    class="box__small"
    @mouseover.stop="isHovering = true"
    @mouseleave.stop="isHovering = false"
  >
    <a
      :href="link"
      target="_blank"
      rel="noopener"
    >
      <header>
        <h6>{{ title }}</h6>
      </header>
      <section class="flex-height">
        <p class="paragraph_lille description">
          {{ summary }}
        </p>
      </section>
      <section class="align-right">
        <Icon
          icon="ExtLinkIcon"
          :height="1.5"
          :width="1.5"
          class="more-icon link"
          :color="this.$themeColors[(isHovering) ? 'white' : 'black']"
          :backgroundColor="this.$themeColors[(isHovering) ? 'action' : 'white']"
        />
      </section>
    </a>
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isHovering: false
    }
  }
}
</script>

<style lang="stylus" scoped>
article
  margin 0.2rem
  border-radius 8px

article > a
  display flex
  flex-direction column
  width 100%
  height 100%
  color var(--black)
  &:hover
    text-decoration none;

header
  padding 1rem 1rem 0 1rem

section
  padding 0 1rem
  &:last-child
    padding 0 1rem 1rem

section.flex-height
  margin-bottom auto

.description
  flex-grow 1

.link
  align-self flex-end
  justify-self flex-end
</style>
