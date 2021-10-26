<template>
  <div
    class="ui-expand-box__container"
    :class="!collapsed ? 'expanded' : ''"
    :style="'background-color:' + rgbBgColor + ';border-color:' + color + ';color:' + color + ';'"
    @click="$emit('click')"
  >
    <button
      class="ui-expand-box__header"
      :style="'border-color:' + color + ';color:' + color + ';'"
      @click="collapsed = !collapsed"
      tabindex="0"
    >
      <div> {{ title }}</div>
      <Icon
        v-if="collapsed"
        icon="ChevronDownIcon"
        :key="_uid + 'ChevronDownIcon'"
        :width="2"
        :height="2"
        :color="color"
      />
      <Icon
        v-else
        icon="ChevronUpIcon"
        :key="_uid + 'ChevronUpIcon'"
        :width="2"
        :height="2"
        :color="color"
      />
    </button>
    <div class="ui-expand-box__sections" :class="collapsed ? 'collapsed' : ''">
      <slot />
    </div>
    <div class="ui-expand-box__footer" v-if="footer">
      <Icon
        :icon="footerIcon"
        :color="color"
        width="1.5"
        height="1.5"
      />
    </div>
  </div>
</template>

<script>
import { hexToRgb } from '@/HelperFunctions'

export default {
  props: {
    title: {
      type: String,
      default: 'FTP'
    },
    color: {
      type: String,
      default: '#000'
    },
    backgroundColor: {
      type: String,
      default: '#AAAAAA'
    },
    backgroundOpacity: {
      type: Number,
      default: 1
    },
    footer: {
      type: Boolean,
      default: false
    },
    footerIcon: {
      type: String,
      default: 'DownloadIcon'
    }
  },
  data () {
    return {
      collapsed: true
    }
  },
  computed: {
    rgbBgColor () {
      if (this.backgroundColor[0] === '#') {
        const rgb = hexToRgb(this.backgroundColor)
        return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.backgroundOpacity})` : this.backgroundColor
      } else {
        return this.color
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.ui-expand-box__container
  border 1px solid rgba(225, 25, 25, .9)
  border-radius 1.5rem
  margin-bottom 1rem

.ui-expand-box__header
  display flex
  width 100%
  border none
  justify-content flex-start
  align-items center
  padding .4rem 1rem
  border-radius 1.5rem
  transition all 0.45s ease-in-out
  &:focus
    outline none
    background-color rgba(0,0,0,.1)

.ui-expand-box__container.expanded .ui-expand-box__header
  border-radius 1.5rem 1.5rem 0 0

.ui-expand-box__footer
  display flex
  justify-content flex-end
  align-items center
  padding .4rem 1rem

.ui-expand-box__sections
  color var(--dark)
  overflow hidden
  transition max-height 0.45s ease-in-out
  max-height 400px

.ui-expand-box__sections.collapsed
  max-height 0 !important
  padding 0
  margin 0

.service-box-content p
  margin-top 0

</style>
