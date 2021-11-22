<template>
  <div class="map-controls box">
    <header class="map-controls__header">
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
  computed: {},
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

.map-controls
  transition all 200ms ease

.map-controls__header
  display flex
  padding .5rem

.map-controls__header > button.bg
  background: var(--darkSteel)

.map-controls__header > button
  margin-right .5rem

  &:last-child
    margin-right 0

  &.active
    background: var(--active)

.map-controls__header > button.margin-right-auto
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
