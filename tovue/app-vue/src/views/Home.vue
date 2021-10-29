<template>
  <main>
    <Hero>
      <p>Something here?</p>
    </Hero>
    <Map dataset-id="0" map-settings></Map>
  </main>
</template>

<script>
import { pageMeta } from '@/MetaData'
import Filtering from '@/components/shared/Filtering'
import Map from "../components/dataset/Map";

export default {
  components: {
    Map,
    Hero: () => import('@/components/shared/Hero'),
    DatasetBox: () => import('@/components/datasets/DatasetBox'),
    Filtering: Filtering
  },
  data () {
    return {
      filters: {},
      filteredDatasets: []
    }
  },
  computed: {
    datasetsStatus () {
      return this.$store.state.Datasets.status
    },
    pageTitle () {
      return pageMeta.datasets.title
    },
    pageSummary () {
      return pageMeta.datasets.summary
    },
    datasets () {
      return this.$store.state.Datasets.data
    },
    coverImageUrl () {
      return this.getAssetLink(pageMeta.datasets.coverId)
    },
    datasetsCoverImageIds () {
      // eslint-disable-next-line one-var
      const ids = [],
          data = this.$store.state.Datasets.data
      for (let i = 0; i < data.length; i++) {
        ids[i] = data[i].image
      }
      return ids
    },
    datasetsLogosIds () {
      const ids = []
      const data = this.$store.state.Datasets.data
      for (let i = 0; i < data.length; i++) {
        const lgs = data[i].logos
        for (let j = 0; j < lgs.length; j++) {
          ids.push(lgs[j].logoId)
        }
      }
      return ids
    },
    pageAssets () {
      const ids = []
      const coverPhoto = pageMeta.datasets.coverId
      if (coverPhoto) {
        ids.push(coverPhoto)
      }
      return ids
    },
    allAssets () {
      return [...this.datasetsCoverImageIds, ...this.datasetsLogosIds, ...this.pageAssets]
    }
  },
  methods: {
    getAssetLink (id) {
      const img = this.$store.state.DatasetsAssets.data.find((e) => {
        return id === e.id
      })
      return img ? (window.location.origin + '/asset' + img.path + img.filename) : ''
    },
    setFilter (prop, filter) {
      if (filter.type === 'multiselect') {
        // setting filter initValue
        const options = filter.options
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
      }
    },
    resetAllFilters () {
      const filters = [
        {
          label: 'Filtrer på søgeord',
          name: 'search',
          type: 'search',
          fieldId: '',
          initValue: ''
        },
        {
          label: 'Filtrer på sektor',
          name: 'sectors',
          type: 'multiselect',
          options: ['Distribution af el', 'Produktion af el', 'Drikkevand', 'Spildevand', 'Varme'],
          fieldId: 'sectors',
          initValue: '_all'
        }
      ]
      filters.forEach((filter) => {
        this.setFilter(this.filters, filter)
      })
    },
    updateFilters (filters) {
      this.filteredDatasets = this.filterData(this.datasets, this.filters)
    },
    filterData (rows, filters) {
      for (const key in filters) {
        const filter = filters[key]
        if ((filter.type === 'multiselect') && (Array.isArray(filter.value)) && (filter.options.length > filter.value.length)) {
          rows = rows.filter((row) => {
            if (row[filter.fieldId] !== undefined) {
              return filter.value.some((val) => {
                if (Array.isArray(row[filter.fieldId])) {
                  return row[filter.fieldId].some(item => item === val)
                } else {
                  return val === row[filter.fieldId]
                }
              })
            } else {
              return true
            }
          })
        } else if (filter.type === 'search') {
          const keys = ['fields', 'title', 'description']
          rows = rows.filter((row) => {
            return keys.some((key) => {
              return String(row[key]).toLowerCase().indexOf(filter.value.toLowerCase()) > -1
            })
          })
        }
      }
      return rows
    }
  },
  created () {
    this.$store.dispatch('DatasetsServices/get')
    this.$store.dispatch('Datasets/get')
        .then((response) => {
          this.resetAllFilters()
          this.filteredDatasets = this.filterData(this.datasets, this.filters)
          if (this.allAssets) {
            this.$store.dispatch('DatasetsAssets/get', this.allAssets)
          }
        })
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
.filters {
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-wrap: nowrap;
  align-items: flex-end;
}
</style>
