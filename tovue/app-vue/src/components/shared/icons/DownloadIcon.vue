<template>
  <svg
    viewBox="0 0 24 24"
    :width="width"
    :height="height"
  >
    <circle
      v-if="backgroundColor"
      cx="12" cy="12" r="12"
      :fill="backgroundColor"/>
    <circle
      v-if="border"
      cx="12" cy="12" r="11.5"
      :stroke-width="strokeWidth"
      :stroke="color"
      stroke-opacity="1"
    />
    <path
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M7 11l5 5 5-5M12 6v10"
    />
    <path
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 18h12"
    />
  </svg>
</template>

<script>
export default {
  name: 'CollapseIcon',
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
