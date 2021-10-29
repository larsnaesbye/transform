<template>
  <div
      class="tag"
      :style="'background-color:' + backgroundColor + ';border-color:' + color + ';'"
      @click="$emit('clicked')"
      tabindex="0"
      @keydown.enter="$emit('clicked')"
  >
    <span
        class="tag__title"
        :style="'color:' + color + ';'"
    >
      {{ title }}
    </span>
    <Icon
        icon="DownloadIcon"
        :width="1.1"
        :height="1.1"
        :strokeWidth="1.1"
        :color="color"
    />
    <span class="tag__badge"
          v-if="amount > 1">
      {{ amount }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'FormatTag',
  props: {
    typeId: {
      type: Number,
      default: -1
    },
    amount: {
      type: Number,
      default: 1
    },
    serviceTypes: {
      type: Array,
      required: true
    }
  },
  computed: {
    serviceType() {
      return this.serviceTypes.find(({id}) => {
        return id === this.typeId
      })
    },
    title() {
      return this.serviceType ? (this.serviceType.title || '') : ''
    },
    color() {
      return this.serviceType ? (this.serviceType.color || '') : ''
    },
    backgroundColor() {
      return this.serviceType ? (this.serviceType.backgroundColor || '') : ''
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
  padding 0 0.3rem 0 0.6rem
  position relative

.tag:hover
.tag:focus
  outline none
  filter saturate(200%) brightness(80%) hue-rotate(180deg) invert(100%)

.tag__title
  font-size 0.625rem
  line-height 0.7rem
  font-weight 400
  letter-spacing 0.04rem
  text-transform uppercase

.tag__badge
  display flex
  align-items center
  justify-content center
  border-radius 50%
  width 1.2rem
  height 1.2rem
  font-size 0.7rem
  font-weight 500
  font-style normal
  line-height 1.2rem
  text-align center
  color var(--white)
  background-color var(--highlight2)
  position absolute
  right -0.6rem
  top -.5rem

</style>
