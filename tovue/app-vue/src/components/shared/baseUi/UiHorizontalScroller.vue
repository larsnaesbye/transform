<template>
  <div class="horizontal-scroll-container">
    <div
      class="horizontal-scroll-content"
      ref="horizontalScrollContent"
    >
      <slot />
    </div>
    <div class="table-left-gradient" v-show="showLeftScroll" >
      <button
        class="button-scroll-left"
        :class="`vertical-position-${buttonLocationY}`"
        @click="scroll('left')" ref="buttonScrollLeft"
        aria-label="scroll mod venstre for at se mere"
      >
        <slot name="button-scroll-left">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="24" cy="24" r="24"
              fill="#FFF"/>
            <circle
              cx="24" cy="24" r="23.5"
              stroke="#666"
              stroke-width="0.5"
              stroke-opacity="1"
            />
            <path d="M28 12L16 24L28 36" stroke="#666" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </slot>
      </button>
    </div>
    <div class="table-right-gradient" v-show="showRightScroll">
      <button
        class="button-scroll-right"
        :class="`vertical-position-${buttonLocationY}`"
        @click="scroll('right')"
        ref="buttonScrollRight"
        aria-label="scroll mod højre for at se mere"
      >
        <slot name="button-scroll-right">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="24" cy="24" r="24"
              fill="#FFF"/>
            <circle
              cx="24" cy="24" r="23.5"
              stroke="#666"
              stroke-width="0.5"
              stroke-opacity="1"
            />
            <path d="M20 36L32 24L20 12" stroke="#666" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalScroller',
  props: {
    scrollAmount: {
      type: Number,
      default: 25
    },
    buttonLocationX: {
      type: String,
      default: 'middle'
    },
    buttonLocationY: {
      type: String,
      default: 'middle'
    },
    fadeToColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showLeftScroll: true,
      showRightScroll: true
    }
  },
  computed: {
    styleButtonContainerLeft () {
      return ''
    }
  },
  mounted () {
    const el = this.$refs.horizontalScrollContent
    const self = this
    el.addEventListener('scroll', function () {
      self.showHideScrollButtons()
    })
    const leftButton = this.$refs.buttonScrollLeft
    const rightButton = this.$refs.buttonScrollRight
    if (window.ResizeObserver) {
      new ResizeObserver(this.showHideScrollButtons).observe(leftButton)
      new ResizeObserver(this.showHideScrollButtons).observe(rightButton)
      new ResizeObserver(this.showHideScrollButtons).observe(this.$refs.horizontalScrollContent)
    }
  },
  methods: {
    scroll (direction) {
      const dir = direction === 'right' ? 1 : -1
      const scrollPx = (window.innerWidth * (this.scrollAmount / 100)) * dir
      const el = this.$refs.horizontalScrollContent
      el.scrollBy({
        left: scrollPx,
        behavior: 'smooth'
      })
    },
    showHideScrollButtons () {
      const el = this.$refs.horizontalScrollContent
      if (el) {
        const spaceLeftRight = el.scrollWidth - el.scrollLeft - el.offsetWidth
        const spaceLeftLeft = el.scrollLeft
        if (spaceLeftRight < 1) {
          this.showRightScroll = false
        }
        if (spaceLeftLeft < 1) {
          this.showLeftScroll = false
        }
        if (spaceLeftRight > 0) {
          this.showRightScroll = true
        }
        if (spaceLeftLeft > 0) {
          this.showLeftScroll = true
        }
        this.centerButtons()
      }
    },
    centerButtons () {
      const leftButton = this.$refs.buttonScrollLeft
      const rightButton = this.$refs.buttonScrollRight
      if (leftButton) {
        // leftButton.style.bottom = 'calc(50% - ' + (leftButton.offsetHeight / 2) + 'px)'
        leftButton.style.left = (-1 * (leftButton.offsetWidth / 1)) + 'px'
      }
      if (rightButton) {
        // rightButton.style.bottom = 'calc(50% - ' + (rightButton.offsetHeight / 2) + 'px)'
        rightButton.style.right = (-1 * (rightButton.offsetWidth / 1)) + 'px'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.horizontal-scroll-container
  position relative

.horizontal-scroll-content
  overflow auto

.button-scroll-right
.button-scroll-left
  position absolute
  border none
  padding 0 !important
  outline none
  pointer-events all

.button-scroll-left
  left -1.5rem

.button-scroll-right
  right -1.5rem

.vertical-position-middle
  bottom 0
  top 0
  margin auto 0

.vertical-position-top
  top 0

.vertical-position-bottom
  bottom 0

.table-left-gradient
.table-right-gradient
  position absolute
  top 0
  bottom 0
  width 24px

.table-left-gradient
  left 0
  background: rgb(255,255,255);
  background: -moz-linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)
  background: -webkit-linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)
  background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)
  pointer-events: none;
.table-right-gradient
  right 0
  background: rgb(255,255,255);
  background: -moz-linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
  background: -webkit-linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
  pointer-events: none;
</style>
