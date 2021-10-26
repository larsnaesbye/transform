<template>
  <main>
    <Hero
      title="Siden findes ikke"
      summary="Beklager men vi kunne ikke finde den side du prøver at tilgå"
    />
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
