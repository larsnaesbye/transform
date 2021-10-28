<template>
  <article>
    <header>
      <h5>Filtrer din søgning</h5>
    </header>
    <form
        name="filterList"
        @submit.prevent=""
    >
      <section class="search">
        <input v-model="search" type="text" id="fritekstsoegning" name="fritekstsoegning" placeholder="Søg..." @keyup.enter="setSearch(search)"/>
        <button>
          <Icon
              icon="SearchIcon"
              :width="2"
              :height="2"
              :strokeWidth="1"
              :color="colors.white"
              @click="setSearch(search)"
          />
        </button>
      </section>
      <button @click="toggle.olMap = !toggle.olMap; $emit('toggle-map')">
        <span>Søg via Kort</span>
        <div class="toggle-map" :style="{ 'background-color': (toggle.olMap? 'var(--action)' : 'var(--lightSteel)') }">
          <div class="toggler"
               :style="{ 'transform': (toggle.olMap? 'translateY(-1.5px) translateX(21px)' : 'translateY(-1.5px) translateX(-1px)') }"
          />
        </div>
      </button>
      <div class="scrollable-form">

        <!-- Dækningsområde filter -->
        <button @click="toggle.omraader = !toggle.omraader"
                class="collapsed"
                :style="{ 'background-color': (toggle.omraader? 'var(--mediumSteel)' : 'var(--white)') }">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
              :style="{ 'transform': (toggle.omraader? 'rotate(-90deg)' : 'rotate(90deg)') }"
          />
          <span>Dækningsområde</span>
        </button>
        <ul v-show="toggle.omraader">
          <li v-for="omraade in daekningsomraadeListe"
              :key="omraade"
          >
            <label>
              <input
                  type="checkbox"
                  name="omraader[]"
                  :value="omraade"
                  v-bind="isDaekningsomraadeChecked(omraade)"
                  @change="setCheckedDaekningsomraade"
              >
              <Icon v-if="isDaekningsomraadeChecked(omraade)"
                    icon="CheckBoxOnIcon"
                    :width="1.5"
                    :height="1.5"
                    :color="colors.black"
                    :strokeWidth="0.8"
              />
              <Icon v-else
                    icon="CheckBoxIcon"
                    :width="1.5"
                    :height="1.5"
                    :color="colors.black"
                    :strokeWidth="0.8"
              />
              <span>{{ omraade }}</span>
            </label>
          </li>
        </ul>

        <!-- Arketype filter -->
        <button @click="toggle.arketyper = !toggle.arketyper "
                class="collapsed"
                :style="{ 'background-color': (toggle.arketyper? 'var(--mediumSteel)' : 'var(--white)') }">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
              :style="{ 'transform': (toggle.arketyper? 'rotate(-90deg)' : 'rotate(90deg)') }"
          />
          <span>Kortgrupper</span>
        </button>
        <ul v-show="toggle.arketyper ">
          <li v-for="arketype in filteredBoxes"
              :key="arketype.title"
          >
            <label>
              <input
                  type="checkbox"
                  name="arketyper[]"
                  :value="arketype.arketypeID"
                  v-bind="isArketypeChecked(arketype.arketypeID)"
                  @change="setCheckedArketype"
              >
              <Icon v-if="isArketypeChecked(arketype.arketypeID)"
                    icon="CheckBoxOnIcon"
                    :width="1.5"
                    :height="1.5"
                    :color="colors.black"
                    :strokeWidth="0.8"
              />
              <Icon v-else
                    icon="CheckBoxIcon"
                    :width="1.5"
                    :height="1.5"
                    :color="colors.black"
                    :strokeWidth="0.8"
              />
              <span>{{ arketype.title }}</span>
            </label>
          </li>
        </ul>

        <!-- Kortværk filter -->
        <button @click="toggle.kortvaerker = !toggle.kortvaerker"
                class="collapsed"
                :style="{ 'background-color': (toggle.kortvaerker? 'var(--mediumSteel)' : 'var(--white)') }">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
              :style="{ 'transform': (toggle.kortvaerker? 'rotate(-90deg)' : 'rotate(90deg)') }"
          />
          <span>Kortværker</span>
          <div class="number-of-filters" v-if="numberOfChosenFilters('kortvaerk')">
            <h6>
              {{ numberOfChosenFilters('kortvaerk') }}
            </h6>
          </div>
        </button>
        <ul v-show="toggle.kortvaerker">
          <li v-for="kortvaerk in filteredKortvaerkerListe"
              :key="kortvaerk"
          >
            <label>
              <input
                  type="checkbox"
                  name="kortvaerker[]"
                  :value="kortvaerk"
                  v-bind="isKortvaerkChecked(kortvaerk)"
                  @change="setCheckedKortvaerker"
              >
              <Icon v-if="isKortvaerkChecked(kortvaerk)"
                    icon="CheckBoxOnIcon"
                    :width="1.5"
                    :height="1.5"
                    :color="colors.black"
                    :strokeWidth="0.8"
              />
              <Icon v-else
                    icon="CheckBoxIcon"
                    :width="1.5"
                    :height="1.5"
                    :color="colors.black"
                    :strokeWidth="0.8"
              />
              <span>{{ kortvaerk }}</span>
            </label>
          </li>
        </ul>

        <!-- Årstal -->
        <button @click="toggle.aarstal = !toggle.aarstal"
                class="collapsed"
                :style="{ 'background-color': (toggle.aarstal? 'var(--mediumSteel)' : 'var(--white)') }">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
              :style="{ 'transform': (toggle.aarstal? 'rotate(-90deg)' : 'rotate(90deg)') }"
          />
          <span>Gyldighedsperiode</span>
        </button>
        <div id="aarstal" v-show="toggle.aarstal">
          <input type="text" class="aarstal-input" id="yearValidFrom" name="yearValidFrom" @change="setYearValid('from')" placeholder="Fra...">
          <span> - </span>
          <input type="text" class="aarstal-input" id="yearValidTo" name="yearValidTo" @change="setYearValid('to')" placeholder="Til...">
        </div>
        <button @click="toggle.maalestokTog = !toggle.maalestokTog"
                class="collapsed"
                :style="{ 'background-color': (toggle.maalestokTog? 'var(--mediumSteel)' : 'var(--white)') }">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
              :style="{ 'transform': (toggle.maalestokTog? 'rotate(-90deg)' : 'rotate(90deg)') }"
          />
          <span>Målestok</span>
        </button>
        <ul v-show="toggle.maalestokTog">
          <li v-for="maalestok in maalestokListe"
              :key="maalestok"
          >
            <label>
              <input
                  type="checkbox"
                  name="maalestok[]"
                  :value="maalestok"
                  @change="setCheckedMaalestok"
                  v-bind="isMaalestokChecked(maalestok)"
              >
              <Icon v-if="isMaalestokChecked(maalestok)"
                    icon="CheckBoxOnIcon"
                    :width="1.5"
                    :height="1.5"
                    :color="colors.black"
                    :strokeWidth="0.8"
              />
              <Icon v-else
                    icon="CheckBoxIcon"
                    :width="1.5"
                    :height="1.5"
                    :color="colors.black"
                    :strokeWidth="0.8"
              />
              <span>{{ maalestok }}</span>
            </label>
          </li>
        </ul>
        <button @click="toggle.koordinater = !toggle.koordinater"
                :style="{ 'background-color': (toggle.koordinater? 'var(--mediumSteel)' : 'var(--white)') }">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
              :style="{ 'transform': (toggle.koordinater? 'rotate(-90deg)' : 'rotate(90deg)') }"
          />
          <span>Koordinater</span>
        </button>
        <div class="koordinater" v-show="toggle.koordinater">
          <span>POINT(</span><input type="text" class="koordinat-input" name="coordinate1" @change="setCoordinate"><input type="text" class="koordinat-input" name="coordinate2" @change="setCoordinate"><span>)</span>
        </div>
      </div>
    </form>
  </article>
</template>

<script>
import { inject, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { sendFilterData } from '@/HelperFunctions'

export default {
  name: 'Filters',
  data () {
    return {
      search: ''
    }
  },
  props: {
    mapgroups: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'toggle-map'
  ],
  setup (props) {
    const colors = inject('themeColors')
    const filters = inject('providedFilters')
    const store = useStore()
    const router = useRouter()
    const daekningsomraadeListe = ref([])
    const kortvaerkerListe = ref([])
    const maalestokListe = ref([])
    const arketyperKortvaerkerListe = ref([])
    const toggle = ref({
      omraader: false,
      arketyper: false,
      kortvaerker: false,
      aarstal: false,
      maalestokTog: false,
      koordinater: false,
      olMap: false
    })
    const setSearch = (search) => {
      sendFilterData(Object.assign(filters.value.resultsTags, {
        fritekstsoegning: search
      }), store, router)
      setOffset()
    }
    const setYearValid = (year) => {
      if (year === 'from') {
        sendFilterData(Object.assign(filters.value.resultsTags, {
          gaeldendefra: document.filterList.elements.yearValidFrom.value
        }), store, router)
        setOffset()
      }
      if (year === 'to') {
        sendFilterData(Object.assign(filters.value.resultsTags, {
          gaeldendetil: document.filterList.elements.yearValidTo.value
        }), store, router)
        setOffset()
      }
    }
    const setCoordinate = () => {
      if (document.filterList.elements.coordinate1.value && document.filterList.elements.coordinate2.value) {
        const coor = 'POINT(' + document.filterList.elements.coordinate1.value + ' ' + document.filterList.elements.coordinate2.value + ')' || ''
        sendFilterData(Object.assign(filters.value.resultsTags, {
          geometri: coor
        }), store, router)
        setOffset()
      }
    }
    const setCheckedArketype = () => {
      sendFilterData(Object.assign(filters.value.resultsTags, {
        arketype: [...document.filterList.elements['arketyper[]'].values()].filter((x) => {
          return (x.checked)
        }).map((x) => {
          return x.value
        })
      }), store, router)
      setOffset()
    }
    const setCheckedDaekningsomraade = () => {
      sendFilterData(Object.assign(filters.value.resultsTags, {
        daekningsomraade: [...document.filterList.elements['omraader[]'].values()].filter((x) => {
          return (x.checked)
        }).map((x) => {
          return x.value
        })
      }), store, router)
      setOffset()
    }
    const setCheckedKortvaerker = () => {
      sendFilterData(Object.assign(filters.value.resultsTags, {
        kortvaerk: [...document.filterList.elements['kortvaerker[]'].values()].filter((x) => {
          return (x.checked)
        }).map((x) => {
          return x.value
        })
      }), store, router)
      setOffset()
    }
    const setCheckedMaalestok = () => {
      sendFilterData(Object.assign(filters.value.resultsTags, {
        maalestok: [...document.filterList.elements['maalestok[]'].values()].filter((x) => {
          return (x.checked)
        }).map((x) => {
          return x.value
        })
      }), store, router)
      setOffset()
    }
    const setOffset = () => {
      sendFilterData(Object.assign(filters.value.resultsView, {
        offset: 0
      }), store, router)
    }
    const isKortvaerkChecked = (kortvaerk) => {
      if (Array.isArray(filters.value.resultsTags?.kortvaerk)) {
        return (computed(() => filters.value.resultsTags?.kortvaerk?.findIndex(item => item === kortvaerk)).value >= 0) ? { checked: 'checked' } : null
      } else {
        return (computed(() => filters.value.resultsTags?.kortvaerk === kortvaerk).value) ? { checked: 'checked' } : null
      }
    }
    const isMaalestokChecked = (maalestok) => {
      if (Array.isArray(filters.value.resultsTags?.maalestok)) {
        return (computed(() => filters.value.resultsTags?.maalestok?.findIndex(item => item === maalestok)).value >= 0) ? { checked: 'checked' } : null
      } else {
        return (computed(() => filters.value.resultsTags?.maalestok === maalestok).value) ? { checked: 'checked' } : null
      }
    }
    const isArketypeChecked = (arketype) => {
      return (computed(() => filters.value.resultsTags?.arketype?.includes(arketype)).value) ? { checked: 'checked' } : null
    }
    const isDaekningsomraadeChecked = (daekningsomraade) => {
      return (computed(() => filters.value.resultsTags?.daekningsomraade?.includes(daekningsomraade)).value) ? { checked: 'checked' } : null
    }
    const numberOfChosenFilters = (type) => {
      const tmpType = computed(() => store.state?.Filters?.data[type])?.value || []
      return (typeof tmpType === 'string' || tmpType instanceof String) ? 1 : tmpType.length
    }
    const filteredList = () => {
      return this.maalestokListe.filter(maalestok => !maalestok.name.indexOf(this.name))
    }
    const filteredKortvaerkerListe = computed(() => {
      if ((typeof filters.value.resultsTags.arketype === 'string' || filters.value.resultsTags?.arketype instanceof String) && filters.value.resultsTags?.arketype.length > 0) {
        const result = arketyperKortvaerkerListe?.value?.find(element => element.arketype === filters.value.resultsTags.arketype)
        return result.kortvaerker?.flat()
      } else if (Array.isArray(filters.value.resultsTags.arketype) && filters.value.resultsTags.arketype.length > 1) {
        const tempList = []
        for (let i = 0, iEnd = filters.value.resultsTags.arketype.length; i < iEnd; ++i) {
          const result = arketyperKortvaerkerListe.value.find(element => element.arketype === filters.value.resultsTags.arketype[i])
          if (result) {
            tempList.push(result.kortvaerker)
          }
        }
        return tempList.flat()
      } else {
        return kortvaerkerListe.value
      }
    })
    const filteredBoxes = computed(() => {
      const byPriority = props.mapgroups.slice(0)
      byPriority.sort(function (a, b) {
        return a.priority - b.priority
      })
      return byPriority
    })
    return {
      colors,
      maalestokListe,
      daekningsomraadeListe,
      kortvaerkerListe,
      filteredKortvaerkerListe,
      setCheckedArketype,
      setCheckedKortvaerker,
      setCheckedDaekningsomraade,
      setCheckedMaalestok,
      setYearValid,
      isKortvaerkChecked,
      isArketypeChecked,
      isDaekningsomraadeChecked,
      isMaalestokChecked,
      numberOfChosenFilters,
      setSearch,
      setCoordinate,
      filteredBoxes,
      filters,
      filteredList,
      arketyperKortvaerkerListe,
      toggle
    }
  },
  created () {
    const self = this
    self.$store.dispatch('Daekningsomraader/clear')
    self.$store.dispatch('Daekningsomraader/get').then(() => {
      self.daekningsomraadeListe = self.$store.state.Daekningsomraader.data
    })
    self.$store.dispatch('Kortvaerker/clear')
    self.$store.dispatch('Kortvaerker/get').then(() => {
      self.kortvaerkerListe = self.$store.state.Kortvaerker.data
    })
    self.$store.dispatch('ArketyperKortvaerker/clear')
    self.$store.dispatch('ArketyperKortvaerker/get').then(() => {
      self.arketyperKortvaerkerListe = self.$store.state.ArketyperKortvaerker.data
    })
    self.$store.dispatch('Maalestok/clear')
    self.$store.dispatch('Maalestok/get').then(() => {
      self.maalestokListe = self.$store.state.Maalestok.data
    })
    self.$store.dispatch('Filters/get')
  }
}
</script>
<style scoped>
article {
  border-right: 1px solid var(--darkSteel);
  width: 15vw;
  min-width: 300px;
  margin: 0;
}
header {
  padding: 2vh 2.5vw;
}
.scrollable-form {
  overflow: auto;
  height: 60vh;
}
#aarstal {
  padding: 1vh 0 1vh 3vw;
  border-bottom: 1px solid var(--darkSteel);
}
.aarstal-input {
  margin-top: 0.5rem;
  width: 70px;
  border-radius: 25px;
  padding: 5px 10px 5px 10px;
}
.koordinater {
  padding: 1vh 0 1vh 3vw;
  border-bottom: 1px solid var(--darkSteel);
}
.koordinat-input {
  width: 50px;
  margin: 5px;
  border-radius: 25px;
}
button {
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--darkSteel);
  padding: 1vh 2vw;
  text-align: left;
  display: inline-flex;
}
button.collapsed {
  background-color: var(--white);
}
button.collapsed:hover {
  background-color: var(--mediumSteel);
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  list-style-type: none;
  padding: 1vh 3vw;
  border-bottom: 1px solid var(--darkSteel);
  background-color: var(--lightSteel);
}
li span {
  height: 100%;
  padding: 0 0.3rem 0 0.3rem;
  margin: 0;
  color: var(--black);
}
span {
  padding-top: 0.1rem;
}
ul li:hover {
  background-color: var(--mediumSteel);
}
input, select, textarea{
  color: var(--black);
  text-align: center;
}
input, select, textarea:focus{
  outline: none;
}
section.search {
  flex-direction: row;
  display: flow-root;
}
section.search input {
  padding: 15px;
  font-size: 15px;
  border: none;
  float: left;
  width: 100%;
  background: white;
  border-radius: 20px;
  flex-grow:2;
  height: 30px;
  text-align: left;
}
section.search button {
  float: left;
  padding: 0;
  background: #3eddc6;
  color: white;
  font-size: 17px;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
  border-radius: 20px;
  position: absolute;
  margin: 0 -30px;
  width: 30px;
  height: 30px;
  transition: all 100ms linear;
}
section.search button:hover {
  background: #35c7b2;
}
.search {
  background-color: var(--darkTurquoise);
  padding: 2vh 2vw;
  color: var(--white);
}
.toggle-map {
  width: 47px;
  height: 24px;
  border-radius: 15px;
  border: 1px solid var(--darkSteel);
  margin: 0 0 0 auto;
  transition-delay: 100ms;
}
.toggler {
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: var(--white);
  border: 1px solid var(--darkSteel);
  position: absolute;
  transition: all 100ms linear;
}
.number-of-filters {
  width: 20px;
  height: 20px;
  background-color: var(--action);
  border-radius: 15px;
  text-align: center;
  margin: 0.3vh 0 0 auto;
}
[type=checkbox] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
[type=checkbox] + img{
  cursor: pointer;
}
.scrollable-form::-webkit-scrollbar {
  width: 8px;
  height: 10px;
  background-color: transparent;
}
.scrollable-form::-webkit-scrollbar-corner {
  background-color: transparent;
  border-color: transparent;
}
.scrollable-form::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--darkTurquoise);
}
.scrollable-form::-webkit-scrollbar-track {
  background-color: var(--darkSteel);
}
</style>
