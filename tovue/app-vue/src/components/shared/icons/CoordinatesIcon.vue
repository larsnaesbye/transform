<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="white"/>
    <path d="M9 5L9 19" stroke="black" stroke-linecap="round"/>
    <path d="M15 5L15 19" stroke="black" stroke-linecap="round"/>
    <path d="M19 9L5 9" stroke="black" stroke-linecap="round"/>
    <path d="M19 15L5 15" stroke="black" stroke-linecap="round"/>
  </svg>

</template>

<script>
export default {
  name: 'CoordinatesIcon',
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
