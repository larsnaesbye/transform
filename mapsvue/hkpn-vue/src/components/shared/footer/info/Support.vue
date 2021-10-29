<template>
  <article>
    <h6
        class="h6_caption"
    >
      Support
    </h6>
    <LinkCard
        class="linkcard"
        icon="SupportIcon"
        header="Tlf. 78768792"
        description="Har du brug for hjælp? Ring til supporten, vi har åbent alle hverdage kl. 09:00-14:00."
    />
    <LinkCard
        class="linkcard"
        icon="MailIcon"
        header="support@sdfe.dk"
        headerLink="mailto:support@sdfe.dk"
        description="Har du spørgsmål eller ændringsforslag til Historiske Kort? Skriv til supporten. Vi vender tilbage til dig hurtigst muligt."
    />
  </article>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'Support',
  components: {
    LinkCard: defineAsyncComponent(() => import('@/components/shared/LinkCard'))
  }
}
</script>
<style scoped>
article {
  display: flex;
  flex-direction: column;
}

h6 {
  padding-left: 1rem;
  border-bottom: 1px solid var(--darkSteel);
  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;
}
</style>
