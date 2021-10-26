<template>
  <svg :width="width" :height="height" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      v-if="backgroundColor"
      cx="24" cy="24" r="24"
      :fill="backgroundColor"/>
    <circle
      v-if="border"
      cx="24" cy="24" r="23.5"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-opacity="1"
    />
    <path d="M28 12L16 24L28 36" :stroke="color" stroke-linecap="round" stroke-linejoin="round" :stroke-width="strokeWidth"/>
  </svg>
</template>

<script>
export default {
  name: 'ExpandIcon',
  props: {
    color: {
      type: String
    },
    strokeWidth: {
      type: [Number, String]
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
