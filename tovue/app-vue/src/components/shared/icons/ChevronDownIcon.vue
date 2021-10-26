<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
    @click="$emit('click')">
    <circle
      v-if="backgroundColor"
      cx="24" cy="24" r="24"
      transform="rotate(90 24 24)"
      :fill="backgroundColor"
    />
    <path
      d="M12 20L24 32L36 20"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
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
