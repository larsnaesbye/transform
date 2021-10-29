<template>
  <div class="page-wrapper">
    <Header icon="CookieBiteIcon" :header="header" :subheader="subheader" :version="version" :updated="updated"/>
    <div class="row">
      <div class="left-col">
        <Menu/>
        <div class="content text-small">
          <p>En cookie er en lille tekstfil, som gemmes på det udstyr du bruger til at besøge et website. Filen kan genkedes af websitet ved tilbagevendende besøg og gør det muligt at forbedre din brugeroplevelse ved brug af websitet og individualisere information til dig via den internetbrowser du bruger.</p>
          <p>Levetiden for en cookie på dit udstyr varierer afhængig af formålet og efter, hvad udbyderen har bestemt. En session-cookie slettes så snart du lukker browservinduet. En persistent cookie gemmes i op til flere år eller indtil du selv sletter den.</p>
          <p>Man skelner desuden mellem førstepartscookies og tredjepartscookies. Førstepartscookies sættes af det website du besøger og benyttes som regel til at forbedre brugeroplevelsen. Tredjepartscookies sættes af de tredjeparter som hjemmesiden benytter, fx ved indlejret indhold, og benyttes typisk til fx statistiske formål og markedsføringsformål.</p>
          <p>Ved besøg på dette website får du i cookiesbanneret mulighed for at acceptere eller afvise cookies. Du kan til enhver tid ændre dit valg via knappen øverst eller nederst på denne side. Cookiesbanneret bliver stående indtil du har valgt, og vælger du ikke, kan du fortsætte uden at der sættes cookies. I det tilfælde eller har du valgt at afvise cookies, vil der være indhold på websitet som ikke kan vises, hvilket vi skriver ved indholdet i hvert enkelt tilfælde – dette indhold vil først blive vist, når du accepterer cookies.</p>
          <p>Vi vil opfordre dig til at acceptere cookies, så vi kan opsamle statistik og derigennem arbejde på at forbedre websitet og brugeroplevelsen. Når du har accepteret cookies fra dette website, kan de slettes igen via din browsers internetindstillinger.</p>
          <p>Når du klikker på et link der peger på et andet website, møder du en popup der advarer dig om, at websitet kan sætte cookies på din computer. Advarslen bringes fordi vi ikke kan kontrollere cookies på eksterne websites.</p>
        </div>
        <div class="content text-small" :style="{'border-top' : '1px solid '+this.$themeColors.lightGrey}">
          <h3>Konkrete cookies på dette website (<a href="https://historiskekort.dk">https://historiskekort.dk</a>):</h3>
          <p>I oversigten nedenfor er førstepartscookies anført med historiskekort.dk som udbyder, mens tredjepartscookies er dem med andre udbydere.</p>
          <h4>Tekniske/nødvendige cookies</h4>
          <p>
            <List :items="items"/>
          </p>
        </div>
      </div>
      <div class="right-col text-small dark-background">
        <h3>Hvorfor informerer vi om cookies?</h3>
        <p>Alle danske websites er forpligtet til at informere om, hvilke cookies, der lagres på brugerens udstyr. Informationen skal være i overensstemmelse med ”Bekendtgørelse om krav til information og samtykke ved lagring af og adgang til oplysninger i slutbrugeres terminaludstyr”. Bekendtgørelsen stiller bla krav om, at der skal indhentes et informeret samtykke fra brugeren, når websites ønsker at lagre cookies på brugerens udstyr.</p>
        <p>Læs <a href="#">bekendtgørelsen</a></p>
      </div>
    </div>
    <div class="row">
      <div class="left-col"/>
      <div class="right-col text-small">
        <LinkCard
          icon="UserIcon"
          header="Se dine cookieindstillinger"
          headerLink="javascript:showCookieBanner()"
          description=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'CookiePolitik',
  components: {
    Menu: defineAsyncComponent(() => import('@/components/about/Menu')),
    Header: defineAsyncComponent(() => import('@/components/about/Header')),
    List: defineAsyncComponent(() => import('@/components/shared/List')),
    LinkCard: defineAsyncComponent(() => import('@/components/shared/LinkCard'))
  },
  data () {
    return {
      header: 'Cookiepolitik',
      subheader: 'Information om cookies',
      version: '1.0',
      updated: new Date(2021, 10, 1),
      items: [
        'Hvis du hverken accepterer eller afviser cookies sættes kun nødvendige cookies.',
        'Hvis du accepterer eller afviser cookies sættes i begge tilfælde nødvendige cookies.'
      ],
      tableHeaders: [
        {
          key: 'name',
          text: 'Navn'
        },
        {
          key: 'provider',
          text: 'Udbyder'
        },
        {
          key: 'purpose',
          text: 'Formål'
        },
        {
          key: 'expire',
          text: 'Udløb'
        }
      ],
      tableData: [
        {
          name: 'loremipsum',
          provider: '<a href="sfde.dk">sfde.dk</a>',
          purpose: ' En teknisk cookie som husker dit cookievalg',
          expire: '1 år'
        },
        {
          name: 'bg_resolution',
          provider: '<a href="sfde.dk">sfde.dk</a>',
          purpose: 'Lorem ipsum',
          expire: '10 år'
        }
      ]
    }
  }
}
</script>

<style scoped>
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
  padding-bottom: 5vw;
}
</style>
