<template>
  <footer>
    <Info
        class="layout-3col_footer"
    />
    <About
        class="layout-3col_footer"
    />
    <Brand
        class="layout-3col_footer"
    />
  </footer>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'Footer',
  components: {
    Info: defineAsyncComponent(() => import('@/components/shared/footer/Info')),
    About: defineAsyncComponent(() => import('@/components/shared/footer/About')),
    Brand: defineAsyncComponent(() => import('@/components/shared/footer/Brand'))
  }
}
</script>

<style scoped>

footer{
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
