<template>
  <div class="ui-icon">
    <v-popover
      v-if="tooltipText"
      placement="top"
      popoverClass="info"
      trigger="hover"
      :open="showTooltip"
      class="ui-icon"
      :delay="{ show: 300 }"
      :boundariesElement="`icon_${_uid}`"
    >
      <component
        :is="component"
        :color="color"
        :strokeWidth="strokeWidth"
        :width="width * rootFontSize"
        :height="height * rootFontSize"
        :border="border"
        :backgroundColor="backgroundColor"
        ref="target-icon"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        class="tooltip-target"
        :id="`icon_${_uid}`"
        @click="$emit('click')"
      />
      <template slot="popover">
        <span class="paragraph_lille white-text">
          {{ tooltipText }}
        </span>
      </template>
    </v-popover>
    <component
      v-if="!tooltipText"
      :is="component"
      :color="color"
      :strokeWidth="strokeWidth"
      :width="width * rootFontSize"
      :height="height * rootFontSize"
      :border="border"
      :backgroundColor="backgroundColor"
      ref="target-icon"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      :id="`icon_${_uid}`"
      @click="$emit('click')"
    />
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Icon',
  props: {
    width: {
      type: [Number, String],
      default: 3
    },
    height: {
      type: [Number, String],
      default: 3
    },
    color: {
      type: String,
      default: Vue.prototype.$themeColors.black
    },
    strokeWidth: {
      type: [Number, String],
      default: 0.5
    },
    icon: {
      type: String,
      default: 'NoIcon'
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    showTooltip: {
      type: Boolean,
      default: false
    },
    tooltipText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tooltipOpen: true
    }
  },
  computed: {
    rootFontSize () {
      return parseFloat(getComputedStyle(document.documentElement).fontSize) ? 16 : null
    },
    component () {
      return () => import('@/components/shared/icons/' + this.icon)
    }
  },
  watch: {
    showTooltip (newValue, oldValue) {
      this.tooltipOpen = newValue
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.tooltipOpen = this.showTooltip
    })
  }
}
</script>

<style lang="stylus" scoped>
*
  transition all 200ms ease
  backface-visibility hidden
  perspective none
  perspective-origin center center
  transform translate3d(0, 0, 0)
  text-rendering optimizeLegibility
  -webkit-font-smoothing subpixel-antialiased
  -moz-osx-font-smoothing subpixel-antialiased

.ui-icon
  display inline-block

</style>
