<template>
  <div class="map-input box">
    <header class="map-input__header">
      <h3>Input</h3>
      <button
          class="zoom-in buttonmaster no-border control"
          @click="$emit('zoom-in')"
          aria-label="zoom ind"
      >
        <Icon
            :width="2"
            :height="2"
            icon="PlusIcon"
            color="black"
        />
      </button>
      <button
          class="zoom-out buttonmaster no-border control"
          @click="$emit('zoom-out')"
          aria-label="zoom ud"
      >
        <Icon
            icon="MinusIcon"
            color="black"
            :width="2"
            :height="2"
        />
      </button>
    </header>
    <div class="section" v-if="expanded">
      <div v-if="activeSection === 'layers'">
        <div class="section-header">
          <h6>Indstillinger for kortvisning</h6>
        </div>
        <div class="section-content">
          <label
              class="switch"
              tabindex="0"
              @keydown.enter="$emit('toggle-clustering', $event)"
          >
            <span for="clustering">Gruppér kortmarkører som ligger tæt på hinanden</span>
            <input
                type="checkbox"
                id="clustering"
                @change="$emit('toggle-clustering', $event)"
                :checked="clustering"
            >
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div v-if="activeSection === 'filters'">
        <div class="section-header">
          <h6>Søg og filtrer</h6>
        </div>
        <div class="section-content">
          <Filtering
              :filterDef="filterDef"
              direction="column"
              @input="updateFilters"
          />
        </div>
      </div>
      <div v-if="activeSection === 'info'">
        <div class="section-header">
          <h6>Sådan bruger du kortet</h6>
        </div>
        <div class="section-content">
          <p>
            Kortet viser forsyningsværkers placering i Danmark. Du kan zoome ud og ind samt navigere med din mus eller
            touchpad. Du kan også filtrere i resultaterne ved at klikke på filterikonet ovenfor.
          </p>
          <p>Visualiseringer:</p>
          <ul class="icon-list">
            <li v-for="icon in iconList" :key="icon.url">
              <img
                  :src="icon.url"
                  height="16"
                  width="16"
              />
              <span>{{ icon.name === 'default' ? 'Ukendt type' : icon.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Filtering from '@/components/shared/Filtering'

export default {
  components: {
    Filtering
  },
  props: {
    filterDef: {
      type: Object,
      required: true
    },
    mapSettings: {
      type: Object,
      required: true
    },
    clustering: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: false,
      activeSection: '',
      lastActiveSection: 'filters'
    }
  },
  computed: {
    iconList() {
      const list = []
      const iconMap = this.mapSettings.visualizationDef.markerIcon.iconMap
      for (const key in iconMap) {
        list.push({
          name: key,
          url: iconMap[key]
        })
      }
      return list
    }
  },
  mounted() {
  },
  methods: {
    updateFilters(filters) {
      this.$emit('update-filters', filters)
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  margin 0
  padding 0
  border-radius 24px
  overflow visible
  box-sizing content-box
  border 4px solid var(--darkSteel)
  background-color rgba(255, 255, 255, 0.9)

.map-input
  transition all 200ms ease

.map-input__header
  display flex
  padding .5rem

.map-input__header > button.bg
  background: var(--darkSteel)

.map-input__header > button
  margin-right .5rem

  &:last-child
    margin-right 0

  &.active
    background: var(--active)

.map-input__header > button.margin-right-auto
  margin-right auto

.section-header
  background var(--primaryDark)
  padding .5rem

  & > *
    margin 0
    color var(--white)

.section-content
  padding 1rem 1rem .5rem

.section-content p
  margin 0 0 .5rem

.icon-list
  list-style-type none
  padding 0

.icon-list li
  margin-bottom .5rem

.icon-list img
  margin-right .5rem
  margin-bottom 2px
</style>
