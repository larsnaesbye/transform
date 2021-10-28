<template>
  <section>
    <FilterTags
        :resultsTotal="resultsTotal"
        :filteredResultsTags="filteredResultsTags"
    />
    <article class="views">
      <div id="sort-box">
        <button class="sort-button cursor-point" @click="toggleSort = !toggleSort">
          <h6>Sortér efter: {{ selectedSort }}</h6>
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.darkSteel"
              :strokeWidth="1"
              class="sort-icon cursor-point"
          />
        </button>
        <ul  v-if="toggleSort" @click="toggleSort = !toggleSort" class="cursor-point">
          <li class="h7" @click="setSortBy('arketype', 'Kortgruppe')">Kortgruppe</li>
          <li class="h7" @click="setSortBy('titel', 'Titel')">Titel</li>
          <li class="h7" @click="setSortBy('daekningsomraade', 'Dækningsområde')">Dækningsområde</li>
          <li class="h7" @click="setSortBy('kortvaerk', 'Korværk')">Kortværk</li>
          <li class="h7" @click="setSortBy('gaeldendefra', 'Gyldig fra')">Gyldig fra</li>
          <li class="h7" @click="setSortBy('gaeldendetil', 'Gyldig til')">Gyldig til</li>
          <li class="h7" @click="setSortBy('maalestok', 'Målestok')">Målestok</li>
        </ul>
      </div>
      <button>
        <Icon
            icon="SortIcon"
            :width="1.4"
            :height="1.4"
            :color="IconColorDirection"
            :strokeWidth="1"
            :style="{ 'transform': (ascSort? 'rotate(180deg)' : 'rotate(0deg)') }"
            class="list-icon cursor-point"
            @click="setSortDirection"
        />
      </button>
      <button @click="toggleListView(false)">
        <Icon
            icon="GalleryViewIcon"
            :width="1.4"
            :height="1.4"
            :color="IconColorGallery"
            :strokeWidth="1"
            class="list-icon cursor-point"
        />
      </button>
      <button @click="toggleListView(true)">
        <Icon
            icon="ListViewIcon"
            :width="1.4"
            :height="1.4"
            :color="IconColorList"
            :strokeWidth="1"
            class="list-icon cursor-point"
        />
      </button>
    </article>
  </section>
</template>

<script>
import { inject, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import FilterTags from '@/components/results/FilterTags'
import { sendFilterData } from '@/HelperFunctions'

export default {
  name: 'ControlsTop',
  components: { FilterTags },
  props: {
    resultsTotal: {
      type: Number
    }
  },
  emits: [
    'set-view'
  ],
  setup (props, { emit }) {
    const store = useStore()
    const router = useRouter()
    const ascSort = ref(true)
    const listView = ref(true)
    const toggleSort = ref(false)
    const colors = inject('themeColors')
    const filters = inject('providedFilters')
    const sortState = ref(0)
    const selectedSort = ref('')
    const toggleListView = (view) => {
      listView.value = view
      emit('set-view', listView.value)
    }
    const setSortBy = (sortBy, sortByText) => {
      sendFilterData(Object.assign(filters.value.resultsView, {
        sort: sortBy,
        offset: 0
      }), store, router)
      selectedSort.value = sortByText
    }
    const setSortDirection = () => {
      sortState.value++
      if (sortState.value > 2) {
        sortState.value = 0
      }
      if (sortState.value === 0) {
        sendFilterData(Object.assign(filters.value.resultsView, {
          direction: '',
          offset: 0
        }), store, router)
      } else if (sortState.value === 1) {
        ascSort.value = true
        sendFilterData(Object.assign(filters.value.resultsView, {
          direction: 'asc',
          offset: 0
        }), store, router)
      } else if (sortState.value === 2) {
        ascSort.value = false
        sendFilterData(Object.assign(filters.value.resultsView, {
          direction: 'desc',
          offset: 0
        }), store, router)
      }
    }
    const IconColorDirection = computed(() => {
      if (sortState.value === 0) {
        return colors.darkSteel
      } else {
        return colors.action
      }
    })
    const IconColorList = computed(() => {
      return listView.value ? colors.action : colors.darkSteel
    })
    const IconColorGallery = computed(() => {
      return !listView.value ? colors.action : colors.darkSteel
    })
    const resultsTags = computed(() => {
      return filters.value.resultsTags
    })
    const filteredResultsTags = computed(() => {
      const tempTags = []
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(resultsTags.value)) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            tempTags[tempTags.length] = resultsTags.value[key]
          }
        } else if (!isNaN(value) && ((x) => { return (x | 0) === x })(parseFloat(value))) {
          if (value > -1) {
            tempTags[tempTags.length] = resultsTags.value[key]
          }
        } else if (value) {
          tempTags[tempTags.length] = resultsTags.value[key]
        }
      }
      return tempTags.flat()
    })
    return {
      IconColorList,
      IconColorGallery,
      IconColorDirection,
      colors,
      toggleListView,
      toggleSort,
      setSortDirection,
      setSortBy,
      filters,
      filteredResultsTags,
      ascSort,
      sortState,
      selectedSort
    }
  }
}
</script>

<style scoped>
section {
  padding: 0;
  border-bottom: 1px solid var(--darkSteel);
  width: 100%;
  margin: 0;
  display: inline-flex;
}
li {
  list-style-type: none;
  justify-content: space-between;
  display: inline-flex;
  width: 100%;
  padding: 5px 0 5px 10px;
  margin: 0;
  border-top: 1px solid var(--darkSteel);
}
h6 {
  color: var(--darkSteel);
  padding-top: 3px;
  white-space: nowrap;
  word-break: keep-all;
  flex-shrink: 0;
}

ul {
  padding: 0;
  margin: 0;
  width: 100%;
}
.views {
  margin: 0 0 0 auto;
  display: inline-flex;
  width: min-content;
  align-items: flex-start;
  position: relative;
}
.sort-icon {
  transform: rotate(90deg);
  padding: 0;
  margin: 0.1vh 0.2vw 0 0;
}
.sort-button {
  white-space: nowrap;
  word-break: keep-all;
  flex-shrink: 0;
  display: inline-flex;
  padding: 0;
  margin-left: 10px;
}
#sort-box {
  background-color: var(--white);
  border: 1px solid var(--darkSteel);
  width: min-content;
  border-radius: 15px;
  padding: 1px 0 0 0;
  margin: 0;
  overflow: hidden;
  height: fit-content;
  transform: translateX(-100%) translateY(5px);
  z-index: 2;
  position: absolute;
}
#sort-box li:hover {
  background-color: var(--lightSteel);
}
button {
  border: 0
}
.list-icon {
  margin: 5px 0 0 0;
  padding: 0;
}
</style>
