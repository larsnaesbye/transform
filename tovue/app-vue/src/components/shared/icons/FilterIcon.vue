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
      d="M15.3257 12L15.3257 12.5L15.3257 12.5L15.3257 12ZM13.559 14.9374L14.0007 14.7031L14.0007 14.7031L13.559 14.9374ZM20.0004 27.0769L20.5004 27.0769L20.5004 26.9525L20.4421 26.8426L20.0004 27.0769ZM32.675 12L32.675 11.5L32.675 11.5L32.675 12ZM34.4417 14.9374L34 14.703L34 14.703L34.4417 14.9374ZM28.0004 27.0769L27.5588 26.8426L27.5004 26.9525L27.5004 27.0769L28.0004 27.0769ZM13.1174 15.1718L19.5587 27.3113L20.4421 26.8426L14.0007 14.7031L13.1174 15.1718ZM19.5004 27.0769L19.5004 39L20.5004 39L20.5004 27.0769L19.5004 27.0769ZM19.5004 39C19.5004 39.8284 20.172 40.5 21.0004 40.5L21.0004 39.5C20.7243 39.5 20.5004 39.2761 20.5004 39L19.5004 39ZM15.3257 11.5C13.4408 11.5 12.2339 13.5067 13.1174 15.1718L14.0007 14.7031C13.4706 13.704 14.1948 12.5 15.3257 12.5L15.3257 11.5ZM34 14.703L27.5588 26.8426L28.4421 27.3113L34.8834 15.1718L34 14.703ZM27.5004 27.0769L27.5004 39L28.5004 39L28.5004 27.0769L27.5004 27.0769ZM27.5004 39C27.5004 39.2761 27.2766 39.5 27.0004 39.5L27.0004 40.5C27.8289 40.5 28.5004 39.8284 28.5004 39L27.5004 39ZM32.675 12.5C33.806 12.5 34.5301 13.704 34 14.703L34.8834 15.1718C35.7669 13.5067 34.56 11.5 32.675 11.5L32.675 12.5ZM32.675 11.5L15.3257 11.5L15.3257 12.5L32.675 12.5L32.675 11.5ZM21.0004 40.5L27.0004 40.5L27.0004 39.5L21.0004 39.5L21.0004 40.5Z"
      :fill="color"
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
