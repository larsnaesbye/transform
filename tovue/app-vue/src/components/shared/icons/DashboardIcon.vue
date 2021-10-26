<template>
  <svg :width="width" :height="height" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      v-if="backgroundColor"
      cx="24"
      cy="24"
      r="24"
      :fill="backgroundColor"
    />
    <circle
      v-if="border"
      cx="24" cy="24" r="23.5"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-opacity="1"
    />
    <rect x="11.5" y="12.5" width="24" height="23" rx="2.5" :stroke="color"/>
    <rect x="15" y="23" width="3" height="9" :fill="color"/>
    <rect x="22" y="20" width="3" height="12" :fill="color"/>
    <rect x="29" y="16" width="3" height="16" :fill="color"/>
  </svg>
</template>

<script>
export default {
  name: 'MailIcon',
  props: {
    color: {
      type: String
    },
    strokeWidth: {
      type: [Number, String],
      default: 1
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    }
  }
}
</script>
