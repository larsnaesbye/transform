<template>
  <svg :width="width" :height="height" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      v-if="border"
      cx="24" cy="24" r="23.5"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-opacity="1"
    />
    <path
      d="M14 29.6667V23C14 20.3478 15.0536 17.8043 16.9289 15.9289C18.8043 14.0536 21.3478 13 24 13C26.6522 13 29.1957 14.0536 31.0711 15.9289C32.9464 17.8043 34 20.3478 34 23V29.6667M34 29.4286C34 29.9337 33.7893 30.4182 33.4142 30.7754C33.0391 31.1327 32.5304 31.3333 32 31.3333H31C30.4696 31.3333 29.9609 31.1327 29.5858 30.7754C29.2107 30.4182 29 29.9337 29 29.4286V26.5714C29 26.0663 29.2107 25.5818 29.5858 25.2246C29.9609 24.8673 30.4696 24.6667 31 24.6667H34V29.4286ZM14 29.4286C14 29.9337 14.2107 30.4182 14.5858 30.7754C14.9609 31.1327 15.4696 31.3333 16 31.3333H17C17.5304 31.3333 18.0391 31.1327 18.4142 30.7754C18.7893 30.4182 19 29.9337 19 29.4286V26.5714C19 26.0663 18.7893 25.5818 18.4142 25.2246C18.0391 24.8673 17.5304 24.6667 17 24.6667H14V29.4286Z"
      :stroke="color"
      :stroke-width="strokeWidth * 1.5"
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
