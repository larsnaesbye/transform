<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    @click="$emit('click')"
    >
    <circle
      v-if="backgroundColor"
      cx="12" cy="12" r="12"
      transform="rotate(90 12 12)"
      :style="`fill: ${backgroundColor}; transition: all 200ms ease-in-out`"
    />
    <path
      d="M16 11.7333V14.9333C16 15.2162 15.8876 15.4875 15.6876 15.6876C15.4875 15.8876 15.2162 16 14.9333 16H9.06667C8.78377 16 8.51246 15.8876 8.31242 15.6876C8.11238 15.4875 8 15.2162 8 14.9333V9.06667C8 8.78377 8.11238 8.51246 8.31242 8.31242C8.51246 8.11238 8.78377 8 9.06667 8H12.2667M14.6667 6H18M18 6V9.33333M18 6L11.8888 12.1111"
      :style="`stroke: ${color}; transition: all 200ms ease-in-out`"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    />
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
