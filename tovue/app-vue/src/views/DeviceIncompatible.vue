<template>
  <main>
    <Hero
      title="Ikke optimeret til mobil"
      summary="Da forsyningsdataportalen udstiller store mængder data, har vi valgt at optimere siden for stationære computere, laptop og tablet, men ikke for mobiltelefon."
    />
    <!-- <h2>Denne side er ikke optimeret til mobil</h2>
    <p>Da forsyningsdataportalen udstiller store mængder data, har vi valgt at optimere siden for stationære computere, laptop og tablet, men ikke for mobiltelefon.</p> -->
  </main>
</template>

<script>
import { pageMeta } from '@/MetaData'
import { getAssetLink, loadImage } from '@/HelperFunctions'

export default {
  components: {
    Hero: () => import('@/components/shared/Hero')
  },
  data () {
    return {
      coverImageUrl: ''
    }
  },
  computed: {
    pageAssets () {
      return this.$store.state.AboutAssets.data
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
