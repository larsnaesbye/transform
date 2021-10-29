<template>
  <div class="dialog-mask" @click.self="$emit('close')">
    <div class="dialog-box">
      <header class="dialog-header"></header>
      <div class="dialog-body">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="stylus">
.dialog-mask
  position fixed
  z-index 200
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(0, 0, 0, .8)

.dialog-box
  margin 100px auto
  width 400px
  background white
  padding 2rem

.dialog-body
  display flex
  flex-flow column

</style>
