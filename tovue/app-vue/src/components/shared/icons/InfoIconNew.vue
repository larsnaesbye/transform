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
      d="M22.1612 11.2885L22.1686 11.2818L22.1758 11.2748C22.7061 10.7592 23.3644 10.5 24.1309 10.5C24.8887 10.5 25.4972 10.7532 26.0336 11.2748C26.5633 11.7899 26.8246 12.4234 26.8246 13.1564C26.8246 13.8893 26.5633 14.5229 26.0336 15.0379C25.5003 15.5565 24.8407 15.8127 24.1309 15.8127C23.3644 15.8127 22.7061 15.5536 22.1758 15.0379C21.6461 14.5229 21.3848 13.8893 21.3848 13.1564C21.3848 12.4037 21.6062 11.7866 22.1612 11.2885ZM28.5 37.5H19.5L19.5 35.554C20.0677 35.4331 20.5483 35.2349 20.8546 34.9441C21.4344 34.4416 21.6466 33.5955 21.6466 32.6393L21.6466 24.4028C21.6466 23.5518 21.4877 22.8411 21.1074 22.3974C20.899 22.1543 20.6016 21.9895 20.2854 21.8679C20.0686 21.7846 19.8224 21.7139 19.5524 21.6525V19.8673H26.5628L26.5628 32.843C26.5628 33.3021 26.6041 33.7147 26.6892 34.053C26.7664 34.3603 26.9001 34.6903 27.1514 34.8989C27.3461 35.0816 27.6022 35.2206 27.8789 35.331C28.0651 35.4053 28.2733 35.4715 28.5 35.5306L28.5 37.5Z"
      :stroke="color"
      :stroke-width="strokeWidth * 3"
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
