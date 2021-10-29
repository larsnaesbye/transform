<template>
  <section>
    <Messages class="messages"/>
    <FooterNews class="news"/>
    <Support class="support"/>
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'Info',
  components: {
    Messages: defineAsyncComponent(() => import('@/components/shared/footer/info/Messages')),
    FooterNews: defineAsyncComponent(() => import('@/components/shared/footer/info/FooterNews')),
    Support: defineAsyncComponent(() => import('@/components/shared/footer/info/Support'))
  }
}
</script>

<style scoped>
section {
  background-color: var(--background);
  padding: 3.5vw 5vw 3.5vw 5vw;
  align-items: flex-start;
}
.messages,
.news,
.support {
  min-width: 15.62rem;
}
</style>
