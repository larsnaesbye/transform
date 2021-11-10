<template>
  <main id="main" ref="main">
<!--    <UiTabbedContent-->
<!--      v-if="dataset"-->
<!--      class=""-->
<!--      ref="UiTabbedContent"-->
<!--      @select="setTab"-->
<!--    >-->
      <!-- MAP -->
      <UiTabbedContentItem
        v-if="dataset && dataset.views.some(view => view.type === 'map')"
        :title="'Kortvisning'"
        name="kort"
        :active=true
        class="layout-1col"
      >
        <Map
          v-if="mapSettings && dataStatus === 'success'"
          :datasetId="id"
          :data="mapData"
          :filters="filters.map"
          :mapSettings="mapSettings"
          :columnDef="tableSettings.columnDef"
          :active=true
          @filters-updated="updateMapDataFilters"
        />
        <h2 v-if="dataStatus === 'loading'">Henter data...</h2>
        <h2 v-if="dataStatus === 'error' || !mapSettings">Kunne ikke hente data. Prøv eventuelt at genindlæse siden...</h2>
          </UiTabbedContentItem>
<!--    </UiTabbedContent>-->
  </main>
</template>

<script>
import { dataToCsvString, download } from '@/HelperFunctions'
import Hero from '@/components/shared/Hero'
import UiTabbedContent from '@/components/shared/baseUi/UiTabbedContent'
import UiTabbedContentItem from '@/components/shared/baseUi/UiTabbedContentItem'
import UiExpandBox from '@/components/shared/baseUi/UiExpandBox'
import UiExpandBoxSection from '@/components/shared/baseUi/UiExpandBoxSection'
import UiCopyLink from '@/components/shared/baseUi/UiCopyLink'
import Table from '@/components/dataset/Table'
import Map from '@/components/dataset/Map'
import UiMessageBox from '@/components/shared/baseUi/UiMessageBox'

export default {
  components: {
    Hero,
    UiTabbedContent,
    UiExpandBox,
    UiExpandBoxSection,
    UiCopyLink,
    Table,
    UiTabbedContentItem,
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
  data () {
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
    dataStatus () {
      return this.$store.state.DatasetData.status || 'loading'
    },
    metaStatus () {
      return this.$store.state.DatasetMeta.status || 'loading'
    },
    id () {
      return Number(this.dataId) || -1
    },
    dataset () {
      return this.$store.state.DatasetMeta.data.id === this.id ? this.$store.state.DatasetMeta.data : null
    },
    services () {
      if (this.dataset.services && this.dataset.services[0] && this.downloadTypeList && this.serviceTypeList) {
        const services = []
        this.dataset.services.forEach((service) => {
          const serviceObj = {}
          serviceObj.entries = []
          if (service.ids[0]) {
            service.ids.forEach(id => {
              serviceObj.entries.push(this.findService(id))
            })
          }
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
    nonCsvDownloads () {
      if (this.dataset.downloads && this.dataset.downloads[0] && this.downloadTypeList && this.serviceTypeList) {
        const downloads = []
        this.dataset.downloads.forEach((download) => {
          const downloadObj = download
          const formatInfo = this.getFormatInfo(download.formatIds)
          downloadObj.typeId = download.formatIds
          downloadObj.typeLabel = formatInfo.title
          downloadObj.typeColor = formatInfo.color
          downloadObj.typeBackgroundColor = formatInfo.backgroundColor
          if (download.typeId !== 63) {
            // dont add CSV download that's handled manually
            downloads.push(downloadObj)
          }
        })
        return downloads
      } else {
        return []
      }
    },
    rawCsvDownloadUrl () {
      const csvDownloads = this.dataset.downloads.filter(item => item.typeId === 63)
      return csvDownloads[0] ? csvDownloads[0].folder : 'no link'
    },
    datasetsAssets () {
      return this.$store.state.DatasetsAssets.data
    },
    title () {
      const status = this.$store.state.DatasetMeta.status
      if (status === 'loading') {
        return 'Henter datasæt...'
      } else if (status === 'error') {
        return 'Kunne ikke hente dataset. Prøv eventuelt at genindlæse siden.'
      } else if (this.dataset && this.dataset.title) {
        return this.dataset.title
      } else {
        return 'Det er sket en fejl'
      }
    },
    summary () {
      return this.dataset ? this.dataset.summary : ''
    },
    image () {
      return (this.dataset && this.datasetsAssets.length > 0) ? this.getAssetLink(this.dataset.image) : ''
    },
    downloadTypeList () {
      return this.$store.state.DatasetsAttributes.data[0] ? this.$store.state.DatasetsAttributes.data[0].list : null
    },
    serviceTypeList () {
      return this.$store.state.DatasetsAttributes.data[1] ? this.$store.state.DatasetsAttributes.data[1].list : null
    },
    tableSettings () {
      return this.dataset ? this.dataset.tableSettings : null
    },
    fields () {
      return this.tableSettings ? this.tableSettings.columnDef : []
    },
    downloadsDataReady () {
      const ready = this.dataset &&
        this.dataset.downloads &&
        this.downloadTypeList &&
        this.serviceTypeList &&
        (this.$store.state.DatasetsServices.data.length > 0)
      return ready
    },
    servicesDataReady () {
      const ready = this.dataset &&
        this.dataset.services &&
        this.dataset.services[0] &&
        this.serviceTypeList &&
        (this.$store.state.DatasetsServices.data.length > 0)
      return ready
    },
    dataDescription () {
      return this.dataset.dataDescription
    },
    mapSettings () {
      return this.dataset.mapSettings
    },
    dashboardSettings () {
      return this.dataset.dashboardSettings
    }
  },
  created () {
    // console.log('Dataset.vue created')
    this.currentTab = this.tab || 'data'
    if (
      (this.dataset) &&
      (Array.isArray(this.$store.state.DatasetData.data.table) && this.$store.state.DatasetData.data.table[0]) &&
      (Array.isArray(this.$store.state.DatasetsAttributes.data) && this.$store.state.DatasetsAttributes.data[0]) &&
      (Array.isArray(this.$store.state.DatasetsServices.data) && this.$store.state.DatasetsServices.data[0])
    ) {
      // console.log('everything is already loaded')
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
  mounted () {
    // console.log('Dataset.vue mounted')
  },
  watch: {
    $route (to, from) {
      this.currentTab = to.params.tab
      if (!this.dataset.id || !this.data[0] || (this.currentTab === 'kort' && !this.mapData[0])) {
        // this.initDatasetData()
      }
    }
  },
  methods: {
    initDatasetData () {
      this.$store.commit('DatasetData/clear')
      // getting dataset-metadata and -data
      this.$store.dispatch('DatasetMeta/get', String(this.id)).then(result => {
        if (this.dataset) {
          this.shownColumns = []
          this.tableSettings.columnDef.forEach((column) => {
            this.shownColumns.push(column.fieldId)
          })
          const views = this.dataset.views.map(view => view.type)
          this.$store.dispatch('DatasetData/get', { id: this.id, views: views }).then(resp => {
            this.data = this.$store.state.DatasetData.data.table
            this.mapData = this.$store.state.DatasetData.data.map
            this.resetAllFilters()
          })
          if (this.dataset.image) {
            this.$store.dispatch('DatasetsAssets/get', [this.dataset.image])
          }
        }
      })
      // getting stuff for the downloads and services
      this.$store.dispatch('DatasetsAttributes/get')
      this.$store.dispatch('DatasetsServices/get')
    },
    setFilter (prop, filter, data) {
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
    resetAllFilters () {
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
    filterData (rows, filters) {
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
    updateDataFilters (filters) {
      this.data = this.filterData(this.$store.state.DatasetData.data.table, filters)

      /* this.$store.dispatch('DatasetData/get', { id: this.id, views: ['table'], filters: filters }).then(resp => {
        this.data = this.$store.state.DatasetData.data.table
      }).catch(err => {
        console.error('Could not get data for dataset for' + this.title, err)
      }) */
    },
    updateMapDataFilters (filters) {
      this.mapData = this.filterData(this.$store.state.DatasetData.data.map, filters)
      /* this.$store.dispatch('DatasetData/get', { id: this.id, views: ['map'], filters: filters })then(resp => {
        this.mapData = this.$store.state.DatasetData.data.map
      }).catch(err => {
        console.error('Could not get data for dataset for' + this.title, err)
      }) */
    },
    setTab (name) {
      // this.currentTab = name
      this.$router.push(`/data/${this.id}/visning/${name}`)
    },
    getAssetLink (id) {
      const img = this.$store.state.DatasetsAssets.data.find((e) => {
        return id === e.id
      })
      return img ? (window.location.origin + '/asset' + img.path + img.filename) : ''
    },
    getFormatInfo (id) {
      const allFormats = [...this.downloadTypeList, ...this.serviceTypeList]
      const infoItem = allFormats.find(item => item.id === id)
      return infoItem
    },
    findService (id) {
      return this.$store.state.DatasetsServices.data.find(service => service.id === id)
    },
    navigateToFieldDescription (fieldId) {
      // this.$refs['UiTabbedContent'].onSelect(this.$refs['databeskrivelse'])
      this.$router.push(`/data/${this.id}/visning/beskrivelse`)
      this.$nextTick(() => {
        setTimeout(() => {
          this.scrollToField('fieldList_' + fieldId)
        }, 700)
      })
    },
    scrollToField (id) {
      const element = document.getElementById(id)
      element.scrollIntoView()
      this.highlightElement(element)
    },
    highlightElement (element) {
      setTimeout(() => {
        element.querySelector('H1, H2, H3, H4').classList.add('active')
        setTimeout(() => {
          element.querySelector('H1, H2, H3, H4').classList.remove('active')
        }, 450)
      }, 850)
    },
    downloadFullDataset () {
      const colDef = this.tableSettings.columnDef
      const data = this.$store.state.DatasetData.data.table
      const filename = this.dataset.title || 'datasæt'
      this.downloadCSV(colDef, data, filename)
    },
    downloadFilteredDataset () {
      const colDef = []
      this.tableSettings.columnDef.forEach(col => {
        if (this.shownColumns.some(name => name === col.fieldId)) {
          colDef.push(col)
        }
      })
      const data = this.data
      const filename = this.dataset.title + '_filtreret' || 'datasæt_filtreret'
      this.downloadCSV(colDef, data, filename)
    },
    downloadCSV (columnDef, data, filename) {
      let columnDefinitions = columnDef
      if (!columnDef) {
        columnDefinitions = []
        for (const key in data[0]) {
          columnDefinitions.push({ label: key, fieldId: key })
        }
      }
      const csv = dataToCsvString(columnDefinitions, data)
      download(csv, filename + '.csv', 'text/csv;encoding:utf-8')
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
