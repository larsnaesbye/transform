<template>
  <main>
    <Hero
      title="Om Koordinattransformation"
      :summary="summary"
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
      return pageMeta.about.htmlText
    },
    summary () {
      return pageMeta.about.summary
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
