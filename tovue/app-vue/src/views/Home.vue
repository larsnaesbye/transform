<template>
  <main id="main" ref="main">
    <Map
        name="kort"
        :datasetId="id"
        :data="mapData"
        :filters="filters.map"
        :mapSettings="mapSettings"
        :columnDef="tableSettings.columnDef"
        :active="true"
        class="layout-1col"
    />
  </main>
</template>

<script>
import Map from '@/components/dataset/Map'

export default {
  components: {
    Map,
  },
  props: {
    dataId: {
      type: String,
      default: '-1'
    },
    tab: {
      type: String,
      default: 'data'
    }
  },
  data() {
    return {
      currentTab: 'kort',
      filters: {
        table: {},
        map: {}
      },
      data: [],
      mapData: [],
      shownColumns: [],
      showDashboard: false
    }
  },
  computed: {
    // id() {
    //   return Number(this.dataId) || -1
    // },
    dataset() {
      return this.$store.state.DatasetMeta.data
    },
    services() {
      return []
    },
    datasetsAssets() {
      return this.$store.state.DatasetsAssets.data
    },
    title() {
      const status = this.$store.state.DatasetMeta.status
      if (status === 'loading') {
        return 'Henter datasæt...'
      } else if (status === 'error') {
        return 'Kunne ikke hente dataset. Prøv eventuelt at genindlæse siden.'
      } else if (this.dataset && this.dataset.title) {
        return this.dataset.title
      } else {
        return 'Der er sket en fejl'
      }
    },
    summary() {
      return this.dataset ? this.dataset.summary : ''
    },
    image() {
      return (this.dataset && this.datasetsAssets.length > 0) ? this.getAssetLink(this.dataset.image) : ''
    },
    tableSettings() {
      return this.dataset ? this.dataset.tableSettings : null
    },
    fields() {
      return []
    },
    mapSettings() {
      return this.dataset.mapSettings
    },
    dashboardSettings() {
      return this.dataset.dashboardSettings
    }
  },
  created() {

    // if (
    //     (this.dataset) &&
    //     (Array.isArray(this.$store.state.DatasetData.data.table) && this.$store.state.DatasetData.data.table[0]) &&
    //     (Array.isArray(this.$store.state.DatasetsAttributes.data) && this.$store.state.DatasetsAttributes.data[0]) &&
    //     (Array.isArray(this.$store.state.DatasetsServices.data) && this.$store.state.DatasetsServices.data[0])
    // ) {
    //   this.shownColumns = []
    //   this.mapData = []
    // } else {
      this.initDatasetData()
    // }
  },
  mounted() {

  },
  watch: {},
  methods: {
    initDatasetData() {
      // this.$store.commit('DatasetData/clear')
      // getting dataset-metadata and -data
      this.$store.dispatch('DatasetMeta/get', '2934').then(result => {
        if (this.dataset) {
          this.shownColumns = []
          const views = this.dataset.views.map(view => view.type)
          this.$store.dispatch('DatasetData/get', {id: 2934, views: views}).then(resp => {
            // this.data = this.$store.state.DatasetData.data.table
            this.mapData = this.$store.state.DatasetData.data.map
          })
        }
      })
      // getting stuff for the downloads and services
      // this.$store.dispatch('DatasetsAttributes/get')
      this.$store.dispatch('DatasetsServices/get')
    },
    getAssetLink(id) {
      const img = this.$store.state.DatasetsAssets.data.find((e) => {
        return id === e.id
      })
      return img ? (window.location.origin + '/asset' + img.path + img.filename) : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.dataset-page >>> .page__header
  margin -3.5vw -5vw 0
  padding 0.5rem 5vw
  border-bottom 0.5px solid black

p
  margin 0 !important

.main-content
  min-width 0
  max-width 100%

.dashboard-frame
  width 100%
  height: 48vw
  border none
  border-radius 8px
  overflow hidden
  border 4px solid var(--darkSteel)

.table-of-contents
  margin-top 1rem

.field-section
  background-color white
  transition all .4s ease-out .5s

.field-section h3
  position relative
  display inline-block

.field-section h3 a
  font-size 1rem
</style>
