<template>
<div>
  <div
    class="table-section"
    :class="{ 'full-screen': fullscreenTable, 'not-paginated' : !paginated }"
  >
    <div class="controls">
      <Filtering
        v-if="filters"
        class="filters"
        :filterDef="filters"
        @input="updateFilters"
      />
      <div class="actions">
        <Pagination
          v-if="paginated"
          :pagination="pagination"
          :client="true"
          @prev="--pagination.currentPage"
          @next="++pagination.currentPage"
        >
        </Pagination>
        <div class="control">
          <UiDropdown
            ref="page-length-dropdown"
            :label="'Rækker pr. side'"
          >
            <template v-slot:choosen>
              <span>{{ length }}</span>
            </template>
            <div
              class="dropdown-list-element"
              v-for="pageLength in pageLengthOptions"
              :key="pageLength"
            >
              <button
                class="button-reset dropdown-list-button"
                @click.capture="setPageLength(pageLength)"
                :aria-label="'Antal viste rækker pr. side: ' + pageLength"
              >
                {{ pageLength }}
              </button>
            </div>
          </UiDropdown>
        </div>
        <button
          class="buttonmaster icon-right"
          @click="fullscreenTable = !fullscreenTable"
        >
          <span>{{ fullscreenTable ? 'Luk' : 'Åbn i'}} fuldskærmsvisning</span>
          <Icon
            v-if="fullscreenTable"
            icon="CollapseIcon"
            color="black"
            :width="2"
            :height="2"
            :key="'collapseIcon'"
          />
          <Icon
            v-else
            icon="ExpandIcon"
            color="black"
            :width="2"
            :height="2"
            :key="'ExpandIcon'"
          />
        </button>
      </div>
    </div>
    <UiHorizontalScroller
      v-show="dataStatus === 'success' && paginatedRows.length > 0"
      buttonLocationY="top"
      :scrollAmount="50"
    >
      <TableRows
        :key="`table_${datasetId}`"
        :rows="paginatedRows"
        :columnDef="settings.columnDef"
        :sortOrders="sortOrders"
        :shownColumns="shownColumns"
        :sortId="sortId"
        :datasetId="datasetId"
        style="max-width: 100%;"
        :active="active"
        @sort="sortBy"
        @open-field-description="openFieldDescription"
      />
      <template v-slot:button-scroll-left>
        <Icon
          icon="PrevIcon"
          :strokeWidth="2"
          :width="1.5"
          :height="1.5"
          border
          :color="$themeColors.white"
          :backgroundColor="$themeColors.black"
          class="opacity75"
        />
      </template>
      <template v-slot:button-scroll-right>
        <Icon
          icon="NextIcon"
          :strokeWidth="2"
          :width="1.5"
          :height="1.5"
          border
          :color="$themeColors.white"
          :backgroundColor="$themeColors.black"
          class="opacity75"
        />
      </template>
    </UiHorizontalScroller>
    <h2 v-if="dataStatus == 'loading'">Henter data...</h2>
    <h2 v-else-if="dataStatus == 'success' && paginatedRows.length === 0">Ingen data prøv en anden filtrering...</h2>
    <h2 v-else-if="dataStatus == 'error'">Data kan ikke hentes. Prøv at genindlæse siden (shift + F5).
      Årsagen til fejlen kan skyldes flere ting, som f.eks. dårlig internet forbindelse eller en midlertidig fejl.
      Hvis problemet fortsætter kan du kontakte vores support på Tlf: <a href="tel:+4578768792">78 76 87 92</a> eller <a href="mailto:support@sdfe.dk?subject=Problem ved brug af forsyningsdata.dk">support@sdfe.dk</a></h2>
  </div>
</div>
</template>

<script>
import TableRows from '@/components/dataset/TableRows'
import Pagination from '@/components/dataset/TablePagination'
import UiDropdown from '@/components/shared/baseUi/UiDropdown'
import UiHorizontalScroller from '@/components/shared/baseUi/UiHorizontalScroller'
import Filtering from '@/components/shared/Filtering'

export default {
  props: {
    datasetId: {
      type: Number,
      required: true
    },
    settings: {
      type: Object,
      required: true
    },
    shownColumns: {
      type: Array,
      required: true
    },
    filters: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    dataStatus: {
      type: String,
      default: 'success'
    },
    active: {
      type: Boolean
    }
  },
  components: {
    TableRows,
    Pagination,
    UiDropdown,
    UiHorizontalScroller,
    Filtering
  },
  data () {
    return {
      processedData: [],
      searchTimerId: null,
      searchQuery: '',
      searching: false,
      sortId: '',
      sortOrders: {},
      fullscreenTable: false,
      paginated: true,
      pageLengthOptions: [50, 100, 250],
      length: 50,
      pagination: {
        currentPage: 1,
        totalPages: 0,
        total: '',
        nextPage: '',
        prevPage: '',
        from: '',
        to: ''
      }
    }
  },
  computed: {
    columnDef () {
      return this.settings ? this.settings.columnDef : []
    },
    paginatedRows () {
      return this.paginated ? this.paginateData(this.processedData, this.length, this.pagination.currentPage) : this.processedData
    }
  },
  created () {
    this.settings.columnDef.forEach((column) => {
      this.sortOrders[column.fieldId] = -1
    })
  },
  mounted () {},
  watch: {
    searchQuery: {
      handler: function (newVal) {
        clearTimeout(this.searchTimerId)
        this.searchTimerId = setTimeout(() => {
          this.searching = true
          this.resetPagination()
          this.processData()
          this.searching = false
        }, 300)
      }
    },
    data: {
      handler: function (data) {
        this.resetPagination()
        this.processData()
      },
      immediate: true
    },
    length (newVal) {
      this.resetPagination()
      this.processData()
    },
    fullscreenTable (newVal) {
      if (newVal) {
        this.length = 100
      } else {
        this.length = 50
      }
      this.resetPagination()
      this.processData()
    }
  },
  methods: {
    setPageLength (length) {
      this.length = length
      this.$refs['page-length-dropdown'].close()
    },
    updateFilters (filters) {
      this.$emit('filters-updated', filters)
      // this.filters = filters
    },
    processData () {
      let rows = [...this.data]
      if (rows[0]) {
        if (this.sortId) {
          const sortKey = this.sortId
          const sortKeyType = this.columnDef[this.getIndex(this.columnDef, 'fieldId', sortKey)].type
          const sortOrder = this.sortOrders[sortKey]
          rows = this.sortData(rows, sortKey, sortKeyType, sortOrder)
        }
      }
      this.processedData = rows
    },
    sortData (rows, sortKey, sortKeyType, sortOrder) {
      rows = rows.slice().sort((a, b) => {
        a = String(a[sortKey]).toLowerCase()
        b = String(b[sortKey]).toLowerCase()
        if (sortKeyType && (sortKeyType === 'dat')) {
          return (a === b ? 0 : new Date(a).getTime() > new Date(b).getTime() ? 1 : -1) * sortOrder
        } else if (!isNaN(a) && !isNaN(b)) {
          a = !isNaN(a) ? Number(a) : a
          b = !isNaN(b) ? Number(b) : b
          return (+a === +b ? 0 : +a > +b ? 1 : -1) * sortOrder
        } else {
          return (a === b ? 0 : a > b ? 1 : -1) * sortOrder
        }
      })
      return rows
    },
    paginateData (array, length, pageNumber) {
      this.pagination.totalPages = Math.ceil(array.length / length)
      this.pagination.from = array.length ? ((pageNumber - 1) * length) + 1 : ' '
      this.pagination.to = pageNumber * length > array.length ? array.length : pageNumber * length
      this.pagination.prevPage = pageNumber > 1 ? pageNumber : ''
      this.pagination.nextPage = array.length > this.pagination.to ? pageNumber + 1 : ''
      return array.slice((pageNumber - 1) * length, pageNumber * length)
    },
    updateSearch (val) {
      this.searchQuery = val
    },
    resetPagination () {
      this.pagination.currentPage = 1
      this.pagination.prevPage = ''
      this.pagination.nextPage = ''
    },
    sortBy (fieldId) {
      this.sortId = ''
      this.sortId = fieldId
      this.sortOrders[fieldId] = this.sortOrders[fieldId] * -1
      this.resetPagination()
      this.processData()
    },
    getIndex (array, key, value) {
      return array.findIndex(i => i[key] === value)
    },
    openFieldDescription (arg) {
      this.$emit('open-field-description', arg)
    },
    downloadCSV () {
      const data = this.processedData
      const columnDef = this.columnDef.filter(col => this.shownColumns.some(shown => shown === col.fieldId))
      this.$emit('downloadFilteredDataSet', columnDef, data)
    }
  }
}
</script>

<style lang="stylus">

th
  position: sticky
  top: 0
  background-color: white

.controls
  display flex
  align-items flex-end
  margin-bottom 1rem
  flex-wrap wrap

.actions
.filters
  display flex
  flex-grow 1
  flex-shrink 0
  flex-wrap nowrap
  align-items flex-end
  margin-bottom 1rem

.filters
  justify-content flex-start

.actions
  justify-content flex-end
  min-width 420px

.actions > *
  margin-left .5rem

.control > .paragraph_micro
  padding 0 .5rem

.table-section .table-body
  // max-height 35vh
  // overflow-y scroll

.table-section.full-screen
  padding 2rem

.table-section.full-screen .table-body
  max-height calc(100vh - 182px)

.table-section.not-paginated.full-screen .table-body
  max-height 85vh

.dropdown-list-element
  display flex
  white-space nowrap
  align-items center
  padding .25rem 0
  position relative

.dropdown-list-element:hover
  background rgba(0,0,0, 0.05)

</style>
