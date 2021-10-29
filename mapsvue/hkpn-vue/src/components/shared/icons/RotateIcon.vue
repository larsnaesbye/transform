<template>
  <svg viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="24" fill="white"/>
    <path d="M38.6233 13.363V21.3516M38.6233 21.3516H30.6347M38.6233 21.3516L32.4588 15.5466C30.6222 13.7089 28.2381 12.5179 25.6657 12.153C23.0934 11.7881 20.4721 12.2692 18.1969 13.5237C15.9218 14.7782 14.1159 16.7382 13.0516 19.1083C11.9873 21.4784 11.7221 24.1303 12.296 26.6642C12.87 29.1981 14.2519 31.4769 16.2336 33.1571C18.2153 34.8373 20.6894 35.8279 23.2831 35.9796C25.8768 36.1313 28.4495 35.436 30.6136 33.9983C32.7777 32.5607 34.4159 30.4586 35.2814 28.0089"
          :stroke="color"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          stroke-linejoin="round"/>
  </svg>
</template>

<script>
export default {
  name: 'RotateIcon',
  props: {
    color: {
      type: String
    },
    strokeWidth: {
      type: [Number, String]
    }
  }
}
</script>
