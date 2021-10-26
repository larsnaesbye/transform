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
    <path d="M12.7852 28H18.7852M18.7852 28V34M18.7852 28L10.7852 36M33.7852 20H27.7852M27.7852 20V14M27.7852 20L34.7852 12"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'DataIcon',
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
