<template>
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" :fill="$themeColors.appThemeColor"/>
    <circle cx="24" cy="24" r="24" :fill="'url(#paint0_linear' + _uid + ')'"/>
    <path d="M24 29V18M24 18C24.6316 17.1678 27 15 30 15C33 15 34 16.9973 34 19.4938C34 22.4897 31.8421 25.5048 29 29M24 18C23.3684 17.1678 21 15 18 15C15 15 14 16.9973 14 19.4938C14 22.4897 16.1579 25.5048 19 29M14 32H34M14 34H34M14 36H34M24 6.72491V8.36245M24 11.6375V13.2751M24 13.2751C22.9507 13.2751 22.1001 14.1257 22.1001 15.175C22.1001 16.2244 22.9508 17.075 24.0001 17.075C25.0494 17.075 25.9001 16.2244 25.9001 15.175C25.9001 14.1257 25.0493 13.2751 24 13.2751ZM27.2751 10H25.6376M22.3624 10H20.7249M34 19C36.6455 19 38 20.1352 38 22C38 23.8648 36.4 26.5309 34 29M14 19C11.3545 19 10 20.1352 10 22C10 23.8648 11.6 26.5309 14 29" stroke="white" stroke-linecap="round"/>
    <defs>
      <linearGradient :id="'paint0_linear' + _uid" x1="48" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
        <stop stop-opacity="0.28"/>
        <stop offset="1" stop-opacity="0"/>
      </linearGradient>
    </defs>
  </svg>
</template>

<script>
export default {
  name: 'CrownLogo',
  props: {
    width: {
      type: [Number, String],
      default: 4
    },
    height: {
      type: [Number, String],
      default: 4
    },
    color: {
      type: String,
      default: '#000'
    },
    strokeWidth: {
      type: [Number, String],
      default: 0.5
    },
    background: {
      type: String,
      default: '#FFF'
    }
  },
  computed: {
    rootFontSize () {
      return parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    }
  }
}
</script>

<style lang="stylus" scoped>
*
  transition all 200ms ease
</style>
