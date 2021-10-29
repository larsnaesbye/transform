<template>
  <Hero v-if="!searchActive" :key="1"/>
  <HeaderBackground v-else :key="2" />
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
</template>

<script>
import Hero from '@/components/home/Hero'
import Filters from '@/components/shared/Filters'
import Infoboxes from '@/components/home/Infoboxes'
import Results from '@/components/results/Results'
import HeaderBackground from '@/components/shared/HeaderBackground'
import MapContainer from '@/components/map/MapContainer'
import { computed, provide } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Apps',
  components: { Infoboxes, MapContainer, Hero, Filters, Results, HeaderBackground },

  data () {
    return {
      arketyper: [],
      infoboxes: [],
      showMap: false,
      tag: []
    }
  },
  setup () {
    const store = useStore()
    provide('providedFilters', computed(() => store.state.Filters.data))
  },
  methods: {
    toggleMap () {
      this.showMap = !this.showMap
    }
  },
  created () {
    this.$store.dispatch('InfoBoxes/clear')
    this.$store.dispatch('Arketyper/clear')

    this.$store.dispatch('Arketyper/get').then(() => {
      this.arketyper = this.$store.state.Arketyper.data
    })

    this.$store.dispatch('InfoBoxes/get').then(() => {
      this.infoboxes = this.$store.state.InfoBoxes.data
    })
    window.dispatchEvent(new Event('resize', { bubbles: true, cancelable: false }))
  },

  computed: {
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
  }
}
</script>

<style scoped>
</style>
