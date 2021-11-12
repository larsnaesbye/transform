<template>
  <main id="main" ref="main">
      <Map
          :title="'Kortvisning'"
          name="kort"
          class="layout-1col"
          :datasetId="id"
          :data="mapData"
          :filters="filters.map"
          :mapSettings="mapSettings"
          :columnDef="tableSettings.columnDef"
          :active=true
          @filters-updated="updateMapDataFilters"
      />
  </main>
</template>

<script>
import Hero from '@/components/shared/Hero'
import UiExpandBox from '@/components/shared/baseUi/UiExpandBox'
import UiExpandBoxSection from '@/components/shared/baseUi/UiExpandBoxSection'
import UiCopyLink from '@/components/shared/baseUi/UiCopyLink'
import Map from '@/components/dataset/Map'
import UiMessageBox from '@/components/shared/baseUi/UiMessageBox'

export default {
  components: {
    Hero,
    UiExpandBox,
    UiExpandBoxSection,
    UiCopyLink,
    Map,
    UiMessageBox
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
    dataStatus() {
      return this.$store.state.DatasetData.status || 'loading'
    },
    metaStatus() {
      return this.$store.state.DatasetMeta.status || 'loading'
    },
    id() {
      return Number(this.dataId) || -1
    },
    dataset() {
      return this.$store.state.DatasetMeta.data.id === this.id ? this.$store.state.DatasetMeta.data : null
    },
    services() {
      if (this.dataset.services && this.dataset.services[0] && this.downloadTypeList && this.serviceTypeList) {
        const services = []
        this.dataset.services.forEach((service) => {
          const serviceObj = {}
          serviceObj.entries = []
          const formatInfo = this.getFormatInfo(service.typeId)
          serviceObj.typeLabel = formatInfo.title
          serviceObj.typeColor = formatInfo.color
          serviceObj.typeBackgroundColor = formatInfo.backgroundColor
          services.push(serviceObj)
        })
        return services
      } else {
        return []
      }
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
    downloadTypeList() {
      return this.$store.state.DatasetsAttributes.data[0] ? this.$store.state.DatasetsAttributes.data[0].list : null
    },
    serviceTypeList() {
      return this.$store.state.DatasetsAttributes.data[1] ? this.$store.state.DatasetsAttributes.data[1].list : null
    },
    tableSettings() {
      return this.dataset ? this.dataset.tableSettings : null
    },
    fields() {
      return this.tableSettings ? this.tableSettings.columnDef : []
    },
    mapSettings() {
      return this.dataset.mapSettings
    },
    dashboardSettings() {
      return this.dataset.dashboardSettings
    }
  },
  created() {

    if (
        (this.dataset) &&
        (Array.isArray(this.$store.state.DatasetData.data.table) && this.$store.state.DatasetData.data.table[0]) &&
        (Array.isArray(this.$store.state.DatasetsAttributes.data) && this.$store.state.DatasetsAttributes.data[0]) &&
        (Array.isArray(this.$store.state.DatasetsServices.data) && this.$store.state.DatasetsServices.data[0])
    ) {
      this.shownColumns = []
      this.tableSettings.columnDef.forEach((column) => {
        this.shownColumns.push(column.fieldId)
      })
      this.data = this.$store.state.DatasetData.data.table
      this.mapData = this.$store.state.DatasetData.data.map
      this.resetAllFilters()
    } else {
      this.initDatasetData()
    }
  },
  mounted() {

  },
  watch: {
    $route(to, from) {
      // this.currentTab = to.params.tab
      if (!this.dataset.id || !this.data[0] || (this.currentTab === 'kort' && !this.mapData[0])) {
        // this.initDatasetData()
      }
    }
  },
  methods: {
    initDatasetData() {
      this.$store.commit('DatasetData/clear')
      // getting dataset-metadata and -data
      this.$store.dispatch('DatasetMeta/get', String(this.id)).then(result => {
        if (this.dataset) {
          this.shownColumns = []
          this.tableSettings.columnDef.forEach((column) => {
            this.shownColumns.push(column.fieldId)
          })
          const views = this.dataset.views.map(view => view.type)
          this.$store.dispatch('DatasetData/get', {id: this.id, views: views}).then(resp => {
            this.data = this.$store.state.DatasetData.data.table
            this.mapData = this.$store.state.DatasetData.data.map
            this.resetAllFilters()
          })
        }
      })
      // getting stuff for the downloads and services
      this.$store.dispatch('DatasetsAttributes/get')
      this.$store.dispatch('DatasetsServices/get')
    },
    setFilter(prop, filter, data) {
      if (filter.type === 'multiselect') {
        let options = []
        if ((!Array.isArray(filter.options) || filter.options.length === 0) && data) {
          // getting options by finding all unique values in columns
          const fieldData = data.map((row) => row[filter.fieldId])
          options = [...new Set(fieldData)].sort()
        } else {
          options = filter.options
        }

        // setting filter initValue
        const value = (!filter.initValue || filter.initValue === '_all') ? options : filter.initValue

        // adding (or replacing) the filter
        this.$set(prop, [filter.name], {
          label: filter.label,
          value: value,
          options: options,
          name: filter.name,
          type: filter.type,
          fieldId: filter.fieldId
        })
      } else if (filter.type === 'search') {
        this.$set(prop, [filter.name], {
          label: filter.label,
          type: filter.type,
          value: ''
        })
      } else if (filter.type === 'columnFilter') {
        const shownColumns = []
        const labels = []
        this.tableSettings.columnDef.forEach((column) => {
          shownColumns.push(column.fieldId)
          labels[column.fieldId] = column.label
        })
        this.$set(prop, [filter.name], {
          label: filter.label,
          name: filter.name,
          type: filter.type,
          value: shownColumns,
          options: shownColumns,
          labels: labels
        })
      }
    },
    resetAllFilters() {
      if (this.tableSettings && this.tableSettings.filterDef) {
        this.tableSettings.filterDef.forEach((filter) => {
          this.setFilter(this.filters.table, filter, this.data)
        })
      }
      if (this.mapSettings && this.mapSettings.filterDef) {
        this.mapSettings.filterDef.forEach((filter) => {
          this.setFilter(this.filters.map, filter, this.mapData)
        })
      }
    },
    filterData(rows, filters) {
      for (const key in filters) {
        const filter = filters[key]
        if ((filter.type === 'multiselect') && (Array.isArray(filter.value)) && (filter.options.length > filter.value.length)) {
          rows = rows.filter((row) => {
            return filter.value.some((val) => {
              if (
                  val === '' &&
                  (row[filter.fieldId] === undefined ||
                      row[filter.fieldId] === null ||
                      row[filter.fieldId] === 'null' ||
                      row[filter.fieldId] === '')
              ) {
                return true
              } else {
                return String(val) === String(row[filter.fieldId])
              }
            })
          })
        } else if (filter.type === 'search') {
          rows = rows.filter((row) => {
            return Object.keys(row).some((key) => {
              return String(row[key]).toLowerCase().indexOf(filter.value.toLowerCase()) > -1
            })
          })
        } else if (filter.type === 'columnFilter') {
          this.shownColumns = filter.value
        }
      }
      return rows
    },
    updateMapDataFilters(filters) {
      this.mapData = this.filterData(this.$store.state.DatasetData.data.map, filters)
    },
    getAssetLink(id) {
      const img = this.$store.state.DatasetsAssets.data.find((e) => {
        return id === e.id
      })
      return img ? (window.location.origin + '/asset' + img.path + img.filename) : ''
    },
    getFormatInfo(id) {
      const allFormats = [...this.downloadTypeList, ...this.serviceTypeList]
      return allFormats.find(item => item.id === id)
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
  // box-shadow 0 0 4px var(--lightGrey)
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
