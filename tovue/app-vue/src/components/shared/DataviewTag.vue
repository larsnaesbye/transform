<template>
  <div
    class="tag"
    :style="'background-color:' + backgroundColor + ';border-color:' + color + ';'"
    @click="$emit('clicked')"
    tabindex="0"
    @keydown.enter.stop="$emit('clicked')"
  >
    <Icon
      :icon="icons[type]"
      :width="1.1"
      :height="1.1"
      :strokeWidth="1.1"
      :color="color"
    />
    <span
      class="tag--title"
      :style="'color:' + color + ';'"
    >
      {{ label }}
    </span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ViewTag',
  props: {
    type: {
      type: String,
      default: 'table'
    },
    label: {
      type: String,
      default: 'Tabel'
    }
  },
  data () {
    return {
      icons: {
        table: 'DataIcon',
        map: 'MapIcon',
        dashboard: 'DashboardIcon'
      },
      color: '#454545',
      backgroundColor: '#eaeaea'
    }
  }
}
</script>

<style lang="stylus" scoped>
.tag
  display flex
  flex-direction row
  border-style solid
  border-width 1px
  height 1.5rem
  border-radius 1rem
  align-items baseline
  justify-items center
  margin-right 0.5rem
  padding 0 0.3rem
  position relative

.tag:hover
.tag:focus
  outline none
  filter saturate(200%) brightness(80%) hue-rotate(180deg) invert(100%)

.tag--title
  font-size 0.625rem
  line-height 0.7rem
  font-weight 400
  letter-spacing 0.04rem
  text-transform uppercase

</style>
