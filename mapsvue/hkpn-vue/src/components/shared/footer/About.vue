<template>
  <section>
    <Us class="contact"/>
    <Visit class="links" />
    <Follow class="SoMe" />
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'About',
  components: {
    Us: defineAsyncComponent(() => import('@/components/shared/footer/about/Us')),
    Visit: defineAsyncComponent(() => import('@/components/shared/footer/about/Visit')),
    Follow: defineAsyncComponent(() => import('@/components/shared/footer/about/Follow'))
  }
}
</script>

<style scoped>
section {
  background-color: var(--background);
  padding: 3.5vw 5vw 3.5vw 5vw;
  align-items: flex-start;
}

.SoMe,
.links,
.contact {
  min-width: 15.62rem;
  margin: 1.5rem 0;
}
</style>
