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
    <path
      d="M26 13V18.3333H31.3333M28 23.6667H20M28 27.6667H20M22 19.6667H20M26.1818 13H18C17.4696 13 16.9609 13.1967 16.5858 13.5467C16.2107 13.8968 16 14.3716 16 14.8667V29.8C16 30.2951 16.2107 30.7699 16.5858 31.1199C16.9609 31.47 17.4696 31.6667 18 31.6667H30C30.5304 31.6667 31.0391 31.47 31.4142 31.1199C31.7893 30.7699 32 30.2951 32 29.8V18.3333L26.1818 13Z"
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
