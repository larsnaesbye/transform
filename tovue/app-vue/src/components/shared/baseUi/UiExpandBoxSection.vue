<template>
  <div
    class="ui-expand-box__section"
    :style="'border-color:' + color + ';'"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#000'
    }
  }
}
</script>

<style lang="stylus" scoped>
.ui-expand-box__section
  border-top-width 1px
  border-top-style solid
  padding 1rem 1rem
  color var(--black2)
</style>
