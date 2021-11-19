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
    dataset() {
      return this.$store.state.DatasetMeta.data
    },
    services() {
      return []
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
    this.initDatasetData()
  },
  mounted() {

  },
  watch: {},
  methods: {
    initDatasetData() {
      this.$store.dispatch('DatasetMeta/get', '2934').then(() => {
        // if (this.dataset) {
        //   this.shownColumns = []
        //   this.mapData = []
        // }
      })
      this.$store.dispatch('DatasetsServices/get')
    },
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
