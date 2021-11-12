<template>
  <div class="map-input box">
    <header class="map-input__header">
      <label for="sel1" class="badge bg-primary">Input</label>
      <select class="form-select from" id="sel1">
        <option value="">Vælg koordinatsystem...</option>
      </select>
      <label for="sel2" class="badge bg-primary">Output</label>
      <select class="form-select to" id="sel2">
        <option value="">Vælg koordinatsystem...</option>
      </select>

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
