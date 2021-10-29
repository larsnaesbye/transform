<template>
  <svg :width="width" :height="height" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      v-if="backgroundColor"
      cx="17"
      cy="17"
      r="17"
      :fill="backgroundColor"
    />
    <circle
      v-if="border"
      cx="17" cy="17" r="16.5"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-opacity="1"
    />
    <path
      d="M7.66602 17H26.3327"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'MailIcon',
  props: {
    color: {
      type: String,
      default: '#0097A7'
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
