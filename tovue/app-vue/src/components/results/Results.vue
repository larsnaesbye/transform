<template>
  <article>
    <ControlsTop @set-view="setView" :resultsTotal="resultsTotal"/>
    <section v-if="resultsTotal > 0">
      <section v-show="listView" class="list-view scrollable">
        <table border="0" cellpadding="0" cellspacing="0" id="table_resize">
          <tr>
            <th><h5>Titel</h5></th>
            <th><h5>Kortgruppe</h5></th>
            <th><h5>Dækningsområde</h5></th>
            <th><h5>Kortværk</h5></th>
            <th><h5>Gyldig Fra</h5></th>
            <th><h5>Gyldig Til</h5></th>
            <th><h5>Målestok</h5></th>
          </tr>
          <tr v-for="map in maps"
              :key="map"
              class="list-item"
              @click="showMapImage = !showMapImage; imageFile = map.filer; metaData = map"
          >
            <td>{{ map.titel }}</td>
            <td>{{ map.arketype }}</td>
            <td>{{ map.daekningsomraade }}</td>
            <td>{{ map.kortvaerk }}</td>
            <td>{{ map.gaeldendefra }}</td>
            <td>{{ map.gaeldendetil }}</td>
            <td>{{ map.maalestok }}</td>
          </tr>
        </table>
      </section>
      <section v-show="!listView" class="gallery-view layout-6col_galleryview scrollable">
        <li v-for="map in maps"
            :key="map"
        >
          <div class="preview-box">
            <img :src="map.filer[0] + '/0,0,999999999,999999999/500,/0/default.jpg?token=147df2cc622086861a8ca994809a1ace'">
            <header>
              <h6 class="gallery-header">{{ map.titel }}</h6>
              <span class="text-small">{{ map.gaeldendefra }} - {{ map.gaeldendetil }}</span>
            </header>
            <div class="preview-title">
              <span class="h7">Kortgruppe:</span>
              <span class="micro_icon_large">{{ map.arketype }}</span>
            </div>
            <div class="preview-title">
              <span class="h7">Kortværk:</span>
              <span class="micro_icon_large">{{ map.kortvaerk }}</span>
            </div>
            <div class="preview-title">
              <span class="h7">Dækningsområde:</span>
              <span class="micro_icon_large">{{ map.daekningsomraade }}</span>
            </div>
            <div class="preview-title">
              <span class="h7">Målestok:</span>
              <span class="micro_icon_large">{{ map.maalestok }}</span>
            </div>
            <div class="bottom-buttons">
              <button class="left-button white-text" @click="imageFile = map.filer; showMapImage = !showMapImage; metaData = map">
                <h6>Åbn Kort</h6>
              </button>
            </div>
          </div>
        </li>
      </section>
    </section>
    <NoResultsFound v-else-if="resultsTotal < 0"/>
    <MapImageViewer v-show="showMapImage" :imageFile="imageFile" :showMapImage="showMapImage" :metaData="metaData" @close-map-view="toggleMapImage"/>
    <ControlsBottom v-if="resultsTotal > 0" :resultsTotal="resultsTotal"/>
  </article>
</template>

<script>
import MapImageViewer from '@/components/mapImageViewer/MapImageViewer'
import ControlsTop from '@/components/results/ControlsTop'
import ControlsBottom from '@/components/results/ControlsBottom'
import NoResultsFound from '@/components/results/NoResultsFound'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Results',
  components: { NoResultsFound, MapImageViewer, ControlsTop, ControlsBottom },
  setup () {
    const store = useStore()
    const metaData = ref({})
    const imageFile = ref([])
    const showMapImage = ref(false)
    const listView = ref(true)
    const resultsTotal = ref(0)
    const setView = (bool) => {
      listView.value = bool
    }
    const toggleMapImage = () => {
      showMapImage.value = !showMapImage.value
      imageFile.value = []
    }
    const getKortFromParams = (paramObject) => {
      store.dispatch('Kort/clear')
      store.dispatch('Kort/get', paramObject).then((data) => {
        resultsTotal.value = data.total
      })
    }
    const syncURLToStore = (paramObject) => {
      store.dispatch('Filters/setFilterData', paramObject).then((newParamObject) => {
        getKortFromParams(newParamObject)
      })
    }
    const convertQueryStringToArray = (paramObject) => {
      if (paramObject.daekningsomraade) {
        paramObject.daekningsomraade = Array.isArray(paramObject.daekningsomraade) ? paramObject.daekningsomraade : [paramObject.daekningsomraade]
      }
      if (paramObject.arketype) {
        paramObject.arketype = Array.isArray(paramObject.arketype) ? paramObject.arketype : [paramObject.arketype]
      }
      if (paramObject.maalestok) {
        paramObject.maalestok = Array.isArray(paramObject.maalestok) ? paramObject.maalestok : [paramObject.maalestok]
      }
      if (paramObject.kortvaerk) {
        paramObject.kortvaerk = Array.isArray(paramObject.kortvaerk) ? paramObject.kortvaerk : [paramObject.kortvaerk]
      }
      return paramObject
    }
    const maps = computed(() => {
      return store.state.Kort.data || []
    })
    return {
      metaData,
      imageFile,
      showMapImage,
      resultsTotal,
      listView,
      setView,
      toggleMapImage,
      syncURLToStore,
      getKortFromParams,
      convertQueryStringToArray,
      maps
    }
  },
  created () {
    this.syncURLToStore(this.$route.query)

    this.$watch(() => this.$route.query, (to, from) => {
      this.syncURLToStore(to)
      // this.getKortFromParams(this.convertQueryStringToArray(to))
    })
  }
}
</script>

<style scoped>
article {
  padding: 1rem;
  border-top: 1px solid var(--darkSteel);
  /* overflow-x: auto; */
}
.h7 {
  margin-right: 5px;
}
button {
  border: none;
}
/* Results Header */
.results-header h6 {
  color: var(--darkSteel);
  padding-top: 3px;
  white-space: nowrap;
  word-break: keep-all;
  flex-shrink: 0;
}
ul {
  padding: 0;
  margin: 0;
}

li {
  list-style-type: none;
  justify-content: space-between;
  display: inline-flex;
  width: 100%;
  margin: 0;
}
.active-filters div {
  background-color: var(--action2);
  width: fit-content;
  border: 1px solid var(--darkSteel);
  border-radius: 15px;
  padding: 2px 5px 2px 10px;
  margin: 0 0 5px 5px;
  display: inline-flex;
}

.active-filters h6 {
  color: var(--white);
  margin: 2px;
  padding-top: 2px;
}

#sort-box li:hover {
  background-color: var(--lightSteel);
}
/* Gallery View Styling */
.preview-box {
  width: 55vw;
  min-height: 20rem;
  margin: 0;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: content-box;
  border: 4px solid var(--darkSteel);
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  -webkit-transition: all 300ms linear;
  -moz-transition: all 300ms linear;
  -o-transition: all 300ms linear;
  transition: all 300ms linear;
}

img {
  height: 15vh;
  min-height: 125px;
  object-fit: cover;
  overflow: hidden;
}

.gallery-view {
  padding: 1rem 1rem 0 0;
  overflow: auto;
  justify-content: center;
}

.bottom-buttons {
  width: 100%;
}

.bottom-buttons button:hover{
  background-color: var(--action);
}

.left-button {
  margin: 0.5rem auto 0.5rem 20%;
  border-radius: 20px 20px 20px 20px;
  background-color: var(--darkTurquoise);
  border: 1px solid var(--darkSteel);
  width: 60%;
  padding: 0.3vh 0 0.3vh 0;
}

.preview-title {
  border-bottom: 1px solid var(--darkSteel);
  background-color: var(--lightSteel);
  padding: 1vh 0.5rem 1vh 0.5rem;
}

/* List View Styling */
.list-view {
  padding: 0;
}
table {
  width: 100%;
  text-align: left;
  word-break: keep-all;
  flex-shrink: 0;
  height: min-content;
  border-collapse: separate;
}

th {
  position: sticky;
  padding: 1rem 0 1rem .5rem;
  margin: 0;
  border-bottom: 1px solid var(--darkSteel);
  background-color: var(--white);
  top: 0;
}

td {
  padding: 0.5rem 0 0.5rem 0.5rem;
  border-bottom: 1px solid var(--mediumSteel);
  max-width: 300px;
}
header {
  display: inline-flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--darkSteel);
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
}

header span {
  white-space: nowrap;
  word-break: keep-all;
  flex-shrink: 0;
}

.list-item:hover {
  background-color: var(--lightSteel);
}
select {
  border-radius: 15px;
  border: 1px solid var(--darkSteel);
  margin: 0 0.5rem;
  height: 30px;
  text-align: end;
}

select:focus-visible {
  outline: 0px;
}
.scrollable {
  overflow: auto;
  max-height: calc(80vh - 1rem);
}
.scrollable::-webkit-scrollbar {
  width: 8px;
  height: 10px;
  background-color: transparent;
}

.scrollable::-webkit-scrollbar-corner {
  background-color: transparent;
  border-color: transparent;
}
.scrollable::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--lightSteel);
}
.scrollable::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
