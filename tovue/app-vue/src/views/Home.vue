<template>
  <main>
  <MapContainer v-if=true :key="4"/>
  <p>Something here?</p>
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
    <Hero>
    </Hero>
  </main>
</template>

<script>
import { pageMeta } from '@/MetaData'
import { getAssetLink, loadImage } from '@/HelperFunctions'
import Infoboxes from '@/components/home/Infoboxes'
import MapContainer from '@/components/map/MapContainer'
import { computed, provide } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  components: {
    Hero: () => import('@/components/shared/Hero'),
    UiHorizontalScroller: () => import('@/components/shared/baseUi/UiHorizontalScroller'),
    // LinkBox: () => import('@/components/home/LinkBox'),
    // ExtLinkBox: () => import('@/components/home/ExtLinkBox'),
    MapContainer: () => import('@/components/map/MapContainer'),
  },
  data () {
    return {
      coverImageUrl: '',
      showMap: true,
      searchActive: true
    }
  },
  computed: {
    pageAssets () {
      return this.$store.state.HomeAssets.data
    },
    searchActive () {
      return !!Object.keys(this.$route.query).length
    },
    updateFilters () {
      return this.$store.state.Filters.data
    },
    mapgroups () {
      const ret = []
      const self = this
      for (let i = 0, iEnd = self.infoboxes.length; i < iEnd; ++i) {
        const arketypeID = self.infoboxes[i].arketypeID
        const result = self.arketyper?.find(element => element === arketypeID)
        if (result) {
          ret[ret.length] = self.infoboxes[i]
        }
      }
      return ret
    }
  },
  methods: {
    toggleMap () {
      this.showMap = !this.showMap
    }

  },
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
  },


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
