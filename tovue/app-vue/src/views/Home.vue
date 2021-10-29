<template>
  <p>Something here?</p>

  <main>
    <Hero>
      <section class="layout-2col_filters">
        <Filters @toggle-map="toggleMap"
                 :mapgroups="mapgroups"
                 :key="tag"
        />
        <Infoboxes v-if="!showMap && !searchActive" :mapgroups="mapgroups" :key="3" ref="infoBox" id="infobox"/>
        <article v-else :class="{ 'layout-2col-map': showMap && searchActive}">
          <Results v-if="searchActive"
                   :key="2"/>
          <MapContainer v-if="showMap" :key="4"/>
        </article>

</section>
    </Hero>
  </main>
</template>

<script>
import { pageMeta } from '@/MetaData'
import { getAssetLink, loadImage } from '@/HelperFunctions'
import Infoboxes from '@/components/home/Infoboxes'
import MapContainer from '@/components/map/MapContainer'

export default {
  name: 'Home',
  components: {
    Hero: () => import('@/components/shared/Hero'),
    UiHorizontalScroller: () => import('@/components/shared/baseUi/UiHorizontalScroller'),
    LinkBox: () => import('@/components/home/LinkBox'),
    ExtLinkBox: () => import('@/components/home/ExtLinkBox')
  },
  data () {
    return {
      coverImageUrl: '',
    }
  },
  computed: {
    pageAssets () {
      return this.$store.state.HomeAssets.data
    },
    // title () {
    //   return pageMeta.forside.title
    // },
    // summary () {
    //   return pageMeta.forside.summary
    // },
  },
  methods: {},
  mounted () {
    this.$nextTick(() => {
      const linkBoxAssetsIds = [1725, 1719, 1717]
      const coverImageId = pageMeta.forside.coverId
      const ids = [coverImageId, ...linkBoxAssetsIds]

      this.$store.dispatch('HomeAssets/get', ids).then(() => {
        linkBoxAssetsIds.forEach((id, i) => {
          const url = getAssetLink(id, this.pageAssets)
          loadImage(url).then(() => {
            this.linkBoxes[i].imageUrl = url
          })
        })
        const coverUrl = getAssetLink(coverImageId, this.pageAssets)
        loadImage(coverUrl).then(() => {
          this.coverImageUrl = coverUrl
        })
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
.hero-links
  display flex
  flex-wrap wrap

.hero-links > a
  color white
  margin-right 1rem
  white-space nowrap
  font-weight bolder

.bottom-ruler
  border-bottom 2px solid var(--darkSteel)
</style>
