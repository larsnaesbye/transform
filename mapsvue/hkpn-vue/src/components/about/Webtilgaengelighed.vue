<template>
  <div class="page-wrapper">
    <Header icon="AccessibilityIcon" :header="header" :subheader="subheader" :version="version" :updated="updated"/>
    <div class="main">
      <div class="left-col">
        <Menu/>
        <div class="content text-small">
          <p>
            Webtilgængelighed handler om de principper og teknikker, man skal følge, når man udvikler websteder, mobilapplikationer og andre tekniske løsninger, så de kan bruges af alle, herunder brugere med handicap.
            Der er fire overordnede principper i lov om webtilgængelighed, som indholdet på websteder skal leve op til. Indholdet skal være opfatteligt, anvendeligt, forståeligt og robust.
          </p>
          <h4>Principperne kommer fra WCAG 2.1-standarden, og de dækker for eksempel over:</h4>
          <List :items="items"/>
        </div>
      </div>
      <div class="right-col text-small">
        <h3>Hvorfor informerer vi om webtilgængelighed</h3>
        <p>Med loven om webtilgængelighed stilles der krav til offentlige organers websteder og apps, som skal hjælpe til at sikre, at disse er tilgængelige for borgere med handicap.</p>
        <p>Gå til loven om <a href="https://www.retsinformation.dk/eli/lta/2018/692">webtilgængelighed</a>.</p>
        <h3>Webtilgængelighedserklæring</h3>
        <p>Loven om webtilgængelighed stiller krav til offentlige myndigheder om offentliggørelse af en tilgængelighedserklæring på webstedet</p>
        <p>Gå til Dataforsyningens <a href="https://www.was.digst.dk/dataforsyningen-dk">webtilgængelighedserklæring</a>.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'Webtilgaengelighed',
  components: {
    Menu: defineAsyncComponent(() => import('@/components/about/Menu')),
    Header: defineAsyncComponent(() => import('@/components/about/Header')),
    List: defineAsyncComponent(() => import('@/components/shared/List'))
  },
  data () {
    return {
      header: 'Webtilgængelighed',
      subheader: 'Information om Webtilgængelighed',
      version: '1.0',
      updated: new Date(2020, 8, 24),
      items: [
        'at billeder gøres opfattelige for skærmlæserprogrammer ved at tekstliggøre billederne',
        'at webstedet er anvendeligt for brugere, der bruger tastatur og ikke mus',
        'at en digital selvbetjeningsløsning er forståelig ved at tilbyde validering af felter og instruktioner ved fejlindtastning',
        'at webstedet er robust ved at benytte kodning korrekt, så brugerens værktøjer kan fortolke dem ensartet.'
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
h1
  margin-left 5vw
  margin-top 20vh

.main
  margin-left 4vw
  display flex

.content > *
  padding-left 1rem
  padding-right 1rem

.left-col
  margin-right auto
  padding-right 3.5vw
  width 70%

.right-col
  background-color var(--background)
  padding 1vw 5vw 1vw 1vw
  width 30%

.page-wrapper
  border-bottom 1px solid var(--action)
  padding-bottom 5vw
</style>
