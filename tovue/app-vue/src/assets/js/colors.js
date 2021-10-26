import Vue from 'vue'

const colorTemplate = {
  // Primaries
  turquoise: '#0097A7',
  white: '#FFF',
  black: '#000',
  dark: '#333',
  black2: 'rgba(0, 0, 0, 0.65)',
  lightGrey: 'rgba(0, 0, 0, 0.25)',

  // Interaction
  action: '#BF9F0F', // changed to match theme, used on primary button hover - design guide value: #3eddc6
  action2: 'rgba(62, 221, 198, 1)',
  action2Transparent: 'rgba(62, 221, 198, 0)',
  actionStroke: '#66AC9E',
  highlight: '#B2940E', // changed to match theme - used on focus-states - design guide value: rgba(233 ,132 ,54, 0.6)
  highlight2: '#E98436', // used as bg on number-badge in formatTag.vue
  warning: '#FF5252', // used in UiMessage currently only in dataset dashboard-view

  // Added for buttons, links, tooltips, tabs, panels
  primary: '#B2940E', // same as appThemeColor - used on datasetButtons
  primaryDark: '#735F09', // used as background on map-control panel headers 7F6A0A
  active: '#3EDDC6', // same as appThemeColor - used as underline on tabs and active buttons
  tooltipColor: '#B2940E', // same as appThemeColor
  linkColor: '#B2940E', // same as appThemeColor

  // Layout
  darkTurquoise: '#045C65', // not used
  darkTurquoise2: '#00393F', // not used
  darkTurquoise3: '#002226', // not used

  // Layout
  lightSteel: '#EDF2F2', // used as bg on button and rows hover-state and bg of open dropdown
  mediumSteel: '#E1ECED',
  darkSteel: 'rgba(143, 177, 181, 0.6)',

  // Web Apps Theme Colors
  webApp1: '#8D2B8E',
  webApp2: '#AB2D5C',
  webApp3: '#C04931',
  webApp4: '#C46F15',
  webApp5: '#B2940E',
  webApp6: '#8DAC20',
  webApp7: '#5FB246',
  appThemeColor: '#B2940E',

  // Uncategorised
  background: '#F2F7F7',
  background2: '#F0F4F4',
  otherSteel: '#E4ECED',
  teal: '#2E9989',
  transparent: 'rgba(0, 0, 0, 0)',
  linkedin: '#0977B4',
  twitter: '#1DA1F2',
  youtube: '#F00'
}

Vue.prototype.$themeColors = colorTemplate

;((d, colors) => {
  const styleEl = document.createElement('style')
  document.head.appendChild(styleEl)
  let rules = ':root {'
  for (const [key, value] of Object.entries(colors)) {
    rules += '--' + key + ':' + value + ';\n'
  }
  rules += '}'
  styleEl.sheet.insertRule(rules, 0)
})(document, colorTemplate)

/*
 * Colors can now be referenced in CSS as :
 *  a { background-color: var(--turquoise); }
 *
 * Or in Vue JS as :
 *  this.$themeColors.turquoise
 */
