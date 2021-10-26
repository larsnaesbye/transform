<template>
  <svg
    viewBox="0 0 16 16"
  >
    <circle
      v-if="backgroundColor"
      cx="8" cy="8" r="8"
      transform="rotate(90 8 8)"
      :style="`fill: ${backgroundColor}; transition: all 200ms ease-in-out`"
    />
    <path
      d="M6.57 10.87L9.43 8 6.57 5.13"
      :style="`stroke: ${color}; transition: all 200ms ease-in-out`"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'MoreIcon',
  props: {
    color: {
      type: String
    },
    strokeWidth: {
      type: [Number, String],
      default: 1
    },
    backgroundColor: {

    }
  }
}
</script>
