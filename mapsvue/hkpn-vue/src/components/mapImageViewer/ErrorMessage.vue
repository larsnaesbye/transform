<template>
  <section>
    <div class="box-message">
      <span class="white-text h7 center">{{ errorMessage }}</span>
    </div>
  </section>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'ErrorMessage',
  props: {
    errorMessage: {
      type: String,
      default () {
        return ''
      }
    }
  },
  setup () {
    const colors = inject('themeColors')
    return {
      colors
    }
  }
}
</script>

<style scoped>
section {
  z-index: 7;
  min-height: 50px;
  height: max-content;
}
.box-message {
  background-color: var(--warning);
  min-height: 50px;
  margin: 0;
}
span {
  padding: 2vh;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
