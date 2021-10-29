<template>
  <svg
    viewBox="20 15 90 100"
  >
    <circle cx="64" cy="64" r="64" fill="white"/>
    <circle cx="64" cy="64" r="16" fill="#3EDDC6"/>
    <circle cx="64" cy="64" r="32" stroke="black"/>
    <path d="M21.3333 63.5C21.0572 63.5 20.8333 63.7239 20.8333 64C20.8333 64.2761 21.0572 64.5 21.3333 64.5V63.5ZM21.3333 64.5H32V63.5H21.3333V64.5Z" fill="black"/>
    <path d="M106.667 64.5C106.943 64.5 107.167 64.2761 107.167 64C107.167 63.7239 106.943 63.5 106.667 63.5V64.5ZM96 64.5H106.667V63.5H96V64.5Z" fill="black"/>
    <path d="M64.5 21.3333C64.5 21.0571 64.2761 20.8333 64 20.8333C63.7239 20.8333 63.5 21.0571 63.5 21.3333L64.5 21.3333ZM63.5 21.3333L63.5 31.9999L64.5 31.9999L64.5 21.3333L63.5 21.3333Z" fill="black"/>
    <path d="M63.5 106.667C63.5 106.943 63.7239 107.167 64 107.167C64.2761 107.167 64.5 106.943 64.5 106.667L63.5 106.667ZM63.5 96L63.5 106.667L64.5 106.667L64.5 96L63.5 96Z" fill="black"/>
  </svg>
</template>

<script>
export default {
  name: 'Mylocationicon',
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
