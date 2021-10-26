<template>
  <main>
    <Hero
      title="Cookies"
      summary=""
      :image="coverImageUrl"
    />
    <section class="content-section layout-1col"
    >
    <p v-html="htmlText"></p>
    </section>
  </main>
</template>

<script>
import { pageMeta } from '@/MetaData'
import { getAssetLink, loadImage } from '@/HelperFunctions'
import Hero from '@/components/shared/Hero'

export default {
  components: {
    Hero
  },
  data () {
    return {
      coverImageUrl: ''
    }
  },
  computed: {
    pageAssets () {
      return this.$store.state.AboutAssets.data
    },
    htmlText () {
      return 'En cookie er en lille tekstfil, som gemmes på det udstyr du bruger til at besøge et website. Filen kan genkedes af websitet ved tilbagevendende besøg og gør det muligt at forbedre din brugeroplevelse ved brug af websitet og individualisere information til dig via den internetbrowser du bruger. <br /><br />Levetiden for en cookie på dit udstyr varierer afhængig af formålet og efter, hvad udbyderen har bestemt. En session-cookie slettes så snart du lukker browservinduet. En persistent cookie gemmes i op til flere år eller indtil du selv sletter den. <br /><br />Man skelner desuden mellem førstepartscookies og tredjepartscookies. Førstepartscookies sættes af det website du besøger og benyttes som regel til at forbedre brugeroplevelsen. Tredjepartscookies sættes af de tredjeparter som hjemmesiden benytter, fx ved indlejret indhold, og benyttes typisk til fx statistiske formål og markedsføringsformål.<br /><br />Ved besøg på dette website får du i cookiesbanneret mulighed for at acceptere eller afvise cookies. Du kan til enhver tid ændre dit valg via knappen øverst eller nederst på denne side. Cookiesbanneret bliver stående indtil du har valgt, og vælger du ikke, kan du fortsætte uden at der sættes cookies. I det tilfælde eller har du valgt at afvise cookies, vil der være indhold på websitet som ikke kan vises, hvilket vi skriver ved indholdet i hvert enkelt tilfælde – dette indhold vil først blive vist, når du accepterer cookies. <br /><br />Vi vil opfordre dig til at acceptere cookies, så vi kan opsamle statistik og derigennem arbejde på at forbedre websitet og brugeroplevelsen. Når du har accepteret cookies fra dette website, kan de slettes igen via din browsers internetindstillinger. <br /><br />Når du klikker på et link der peger på et andet website, møder du en popup der advarer dig om, at websitet kan sætte cookies på din computer. Advarslen bringes fordi vi ikke kan kontrollere cookies på eksterne websites.'
    }
  },
  mounted () {
    const coverImageId = pageMeta.about.coverId
    this.$store.dispatch('AboutAssets/get', [coverImageId]).then(() => {
      const coverUrl = getAssetLink(coverImageId, this.pageAssets)
      loadImage(coverUrl).then(() => {
        this.coverImageUrl = coverUrl
      })
    })
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>

</style>
