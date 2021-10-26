<template>
  <div :class="direction">
    <div
      v-for="filter in filters"
      :key="filter.name"
      class="filter"
      :class="filter.type"
      :arie-label="'filter: ' + filter.label"
    >
      <UiDropdown
        v-if="filter.type === 'multiselect'"
        :label="filter.label"
      >
        <template v-slot:choosen>
          <span :aria-label="'Valgt værdi'">{{ filter.value.length === filter.options.length ? 'Alle' : filter.value.length + ' valgt' }}</span>
        </template>
        <div
          class="dropdown-list-element"
        >
          <input
            type="checkbox"
            :name="`${filter.name}_checkall`"
            :id="`${filter.name}_checkall`"
            :checked="filter.value.length == filter.options.length"
            @change="(filter.value.length < filter.options.length) ? (filter.value = filter.options) : (filter.value = [])"
            class="cursor-point"
          >
          <label
            :for="`${filter.name}_checkall`"
            class="cursor-point"
          >
            Vælg/fravælg alle
          </label>
        </div>
        <div
          v-for="option in filter.options"
          :key="`filter_${filter.name}_${option}`"
          class="dropdown-list-element cursor-point"
        >
          <input
            type="checkbox"
            :name="`filter_input_${filter.name}_${option}`"
            :id="`filter_input_${filter.name}_${option}`"
            :value="option"
            v-model="filter.value"
            class="cursor-point"
          >
          <label
            :for="`filter_input_${filter.name}_${option}`"
            class="cursor-point"
          >
            {{ option || '(ikke angivet)' }}
          </label>
          <img :src="loader" class="loader" />
        </div>
      </UiDropdown>
      <Search
        v-if="filter.type === 'search'"
        :value="searchQuery"
        @input="updateSearch"
        :label="filter.label"
      />
      <UiDropdown
        v-if="filter.type === 'columnFilter'"
        :label="filter.label"
      >
        <template v-slot:choosen>
          <span>{{ filter.value.length === filter.value.length ? 'Viser alle kolonner' : 'Viser ' + filter.value.length + ' kolonner' }}</span>
        </template>
        <div
          class="dropdown-list-element"
        >
          <input
            type="checkbox"
            :name="`${filter.name}_checkall`"
            :id="`${filter.name}_checkall`"
            :checked="filter.value.length == filter.options.length"
            @change="(filter.value.length < filter.options.length) ? (filter.value = filter.options) : (filter.value = [])"
            class="cursor-point"
          >
          <label
            :for="`${filter.name}_checkall`"
            class="cursor-point"
          >
            Vis/skjul alle
          </label>
        </div>
        <div
          v-for="option in filter.options"
          :key="`filter_${filter.name}_${option}`"
          class="dropdown-list-element cursor-point"
        >
          <input
            type="checkbox"
            :name="`filter_input_${filter.name}_${option}`"
            :id="`filter_input_${filter.name}_${option}`"
            :value="option"
            v-model="filter.value"
            class="cursor-point"
          >
          <label
            :for="`filter_input_${filter.name}_${option}`"
            class="cursor-point"
          >
            {{ filter.labels[option] || '(rækker uden værdi)' }}
          </label>
          <img :src="loader" class="loader" />
        </div>
      </UiDropdown>
    </div>
  </div>
</template>

<script>
import loader from '@/assets/loader.gif'
import UiDropdown from '@/components/shared/baseUi/UiDropdown'
import Search from '@/components/shared/baseUi/UiInputSearch'

export default {
  components: {
    Search,
    UiDropdown
  },
  props: {
    filterDef: {
      type: [Object, String],
      required: true
    },
    direction: {
      type: String,
      default: 'row'
    }
  },
  data () {
    return {
      loaded: false,
      searchTimerId: null,
      searchQuery: '',
      searching: false,
      filters: {},
      loader: loader
    }
  },
  watch: {
    searchQuery: {
      handler: function (newVal) {
        clearTimeout(this.searchTimerId)
        this.searchTimerId = setTimeout(() => {
          this.filters.search.value = this.searchQuery
        }, 400)
      }
    },
    filterDef () {
      for (const key in this.filterDef) {
        if (this.filterDef[key] !== this.filters[key]) {
          this.$set(this.filters, key, this.filterDef[key])
        }
      }
    },
    filters: {
      handler: function (newVal, oldVal) {
        if (this.loaded && oldVal !== {}) {
          this.$emit('input', newVal)
        }
      },
      deep: true
    }
  },
  mounted () {
    for (const key in this.filterDef) {
      this.$set(this.filters, key, this.filterDef[key])
    }
    this.$nextTick(() => {
      this.loaded = true
    })
  },
  methods: {
    updateSearch (val) {
      this.searchQuery = val
    }
  }
}
</script>

<style lang="stylus" scoped>
.column > .filter
  margin-bottom 1rem

.row > .filter
  margin-left .5rem
  &:first-child
    margin-left 0

.filter.search
  flex-grow 1

.filter > .paragraph_micro
  padding 0 .5rem

.dropdown-list-element
  display flex
  white-space nowrap
  align-items center
  padding .25rem 0
  position relative

.dropdown-list-element:hover
  background rgba(0,0,0, 0.05)

.dropdown-list-element button
  flex-grow 1
  text-align left
  cursor pointer

</style>
