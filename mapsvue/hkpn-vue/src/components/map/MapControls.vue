<template>
  <div class="map-controls box">
    <section>
      <!-- <button
          class="ol-search buttonmaster"
          :class="activeSection === 'filters' ? 'active' : ''"
          @click="expandCollapse"
          aria-label="Se filtre">
        <Icon
            icon="SearchIcon"
            :width="2"
            :height="2"
            :strokeWidth="1"
            :color="colors.darkTurquoise"
            @mouseover="hover = true"
            @mouseleave="hover = false"
        />
      </button> -->
      <button
          class="zoom-in cursor-point"
          aria-label="zoom ind"
          id="zoom-in"
          @click="$emit('zoom-in')"
      >
        <Icon
            :width="2.5"
            :height="2.5"
            icon="PlusIcon"
            :strokeWidth="1"
            :color="colors.darkTurquoise"
        />
      </button>
      <button
          class="zoom-out cursor-point"
          aria-label="zoom ud"
          id="zoom-out"
          @click="$emit('zoom-out', $event)"
      >
        <Icon
            icon="MinusIcon"
            :width="2.5"
            :height="2.5"
            :strokeWidth="1.5"
            :color="colors.darkTurquoise"
        />
      </button>
      <!--<button
          aria-label="Find min lokation"
          class="locate buttonmaster">
        <Icon
            icon="Mylocationicon"
            :width="2"
            :height="2"
            :strokeWidth="1"
            :color="colors.darkTurquoise"
            @mouseover="hover = true"
            @mouseleave="hover = false"
        />
      </button> -->
      <button class="cursor-point">
        <Icon
            icon="Locationicon"
            :width="1.8"
            :height="1.8"
            :strokeWidth="1.5"
            @click="$emit('pin-pointer')"
            :color="colors.darkTurquoise3"
            @mouseover="hover = true"
            @mouseleave="hover = false"
        />
      </button>
      <!-- <a @click="this.olMap.control.fullScreen" id="ol-full-screen" href="#ol-full-screen">
        <Icon
            class="viewer-icons"
            icon="FullscreenIcon"
            :width="2.5"
            :height="2.5"
            :strokeWidth="1.5"
            :color="colors.darkTurquoise"
        />
      </a> -->
    </section>
    <div class="section" v-if="expanded">
      <div class="section-header"></div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'MapControls',
  props: {},
  data () {
    return {
      expanded: false,
      activeSection: '',
      lastActiveSection: 'filters'
    }
  },
  emits: [
    'zoom-in',
    'zoom-out',
    'pin-pointer'
  ],

  setup () {
    const colors = inject('themeColors')
    return {
      colors
    }
  },
  methods: {
    updateFilters (filters) {
      this.$emit('filters-updated', filters)
    },
    expandCollapse () {
      if (this.expanded) {
        this.lastActiveSection = this.activeSection
        this.activeSection = ''
      } else {
        this.activeSection = this.lastActiveSection
      }
      this.expanded = !this.expanded
    },
    toggleSections (section) {
      if (this.expanded && this.activeSection === section) {
        this.lastActiveSection = this.activeSection
        this.activeSection = ''
        this.expanded = false
      } else if (!this.expanded) {
        this.expanded = true
        this.activeSection = section
      } else {
        this.activeSection = section
      }
    }
  }
}
</script>

<style scoped>

section {
  padding: 0 0.5vw 0 0.5vw;
  display: block;
}

.box{
  margin: 0;
  padding: 0;
  border-radius: 27px;
  overflow: visible;
  box-sizing: content-box;
  border: 4px solid var(--darkSteel);
  background-color: rgba(255,255,255,1);
}
button{
  border: 0;
}

svg:hover {
  transform: scale3d(1.2,1.2,1.2);
}
.section-header {
  background: var(--primaryDark);
  padding: .5rem;
}
</style>
