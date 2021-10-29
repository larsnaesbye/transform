<template>
  <div class="page-wrapper">
    <Header icon="InfoIcon" :header="header" :subheader="subheader" :version="version" :updated="updated"/>
    <div class="row">
      <div class="left-col">
        <Menu/>
        <div class="content text-small">
          <div v-html="about[0].contentLeft"></div>
        </div>
      </div>
      <div class="right-col text-small dark-background">
        <div v-html="about[0].contentRight"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import Background from '@/components/shared/HeaderBackground'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'About',
  components: {
    Menu: defineAsyncComponent(() => import('@/components/about/Menu')),
    Header: defineAsyncComponent(() => import('@/components/about/Header'))
  },
  created () {
    this.$store.dispatch('About/clear')
    this.$store.dispatch('About/get').then(() => {
      this.about = this.$store.state.About.data
    })
  },

  data () {
    return {
      about: [],
      header: 'Om Historiske Kort',
      subheader: 'Historiske Kort er en del af Styrelsen for Dataforsyning og Effektivisering',
      version: '1.0',
      updated: new Date(2021, 10, 1)
    }
  }
}
</script>

<style scoped>
article {
  padding: 0;
  margin: 0;
}
.row {
  margin-left: 4vw;
  display: flex;
}
.content > * {
  padding-left: 1rem;
  padding-right: 1rem;
}
.left-col {
  margin-right: auto;
  padding-right: 3.5vw;
  padding-bottom: 1vw;
  width: 70%;
}
.dark-background {
  background-color: var(--background);
}
.right-col {
  padding: 1vw 5vw 1vw 1vw;
  width: 30%;
}
.page-wrapper {
  border-bottom: 1px solid var(--action);
}
</style>
