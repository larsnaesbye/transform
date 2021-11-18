<template>
  <div class="map-input box">
    <header class="map-input__header">
      <h3>Input</h3>
      <UiDropdown
          label="Vælg koordinatsystem...">
        <select id="sel1">
          <option value="">Vælg koordinatsystem</option>
        </select>
      </UiDropdown>
      <Icon
          icon="EastingIcon"
          :width="1.0"
          :height="1.0"
          :strokeWidth="1.0"
          color="#000"
      />
      <Search>
        :label="Søg"
      </Search>
      <h3>Output</h3>
      <UiDropdown
          label="Vælg koordinatsystem..."
      >
        <select id="sel2">
          <option value="">Vælg koordinatsystem</option>
        </select>
      </UiDropdown>
      <Icon
          icon="NorthingIcon"
          :width="1.0"
          :height="1.0"
          :strokeWidth="1.0"
          color="#000"
      />

    </header>
  </div>
</template>

<script>
import Filtering from '@/components/shared/Filtering'
import Search from "../shared/baseUi/UiInputSearch";
import UiDropdown from "../shared/baseUi/UiDropdown";

export default {
  components: {
    Search,
    Filtering,
    UiDropdown,
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
