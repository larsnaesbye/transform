<template>
  <div class="map-container position-relative">
    <div id="map" ref="map">
      <h2 v-if="status === 'loading' || status === 'initializing'" class="loader">Henter kort...</h2>
    </div>
    <MapControls
        id="map__controls-box"
        @zoom-out="zoom('out')"
        @zoom-in="zoom('in')"
        :filterDef="filters"
        :mapSettings="mapSettings"
        @update-filters="updateFilters"
        :clustering="clustering"
    >
    </MapControls>
    <MapInput
        id="map__input-box"
        :filterDef="filters"
        :mapSettings="mapSettings"
        @update-filters="updateFilters"
        :clustering="clustering"
    >
    </MapInput>
  </div>
</template>

<script>
import 'ol/ol.css'
import {Map, View} from 'ol'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import {fromLonLat, get as getProjection} from 'ol/proj'
import {register} from 'ol/proj/proj4'
import proj4 from 'proj4/dist/proj4'
import {createTileLayer, scaleControl} from '@/components/dataset/MapFunctions.js'
import MapControls from '@/components/dataset/MapControls'
import MapInput from "@/components/dataset/MapInput";

export default {
  components: {
    MapControls,
    MapInput
  },
  props: {
    datasetId: {
      type: Number,
      required: false
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    mapSettings: {
      type: Object,
      required: true
    },
    filters: {
      type: Object,
      default: () => {
        return {}
      }
    },
    columnDef: {
      type: Array,
      default: () => {
        return []
      }
    },
    active: {
      type: Boolean
    }
  },
  data() {
    return {
      status: 'loading',
      fullScreen: false,
      map: {},
      background: 'topo_skaermkort_daempet',
      token: '1fa17ba3b6fb58e8e6e8b09ba2b14be6',
      tileLayers: [],
      layerSettings: [
        {
          name: 'topo_skaermkort_daempet',
          type: 'WMTS',
          title: 'Skærmkort dæmpet',
          service: 'topo_skaermkort_daempet_DAF'
        },
        {
          name: 'topo_skaermkort',
          type: 'WMTS',
          title: 'Skærmkort',
          service: 'topo_skaermkort_wmts_DAF'
        },
        {
          name: 'orto_foraar',
          type: 'WMTS',
          title: 'Ortofoto',
          service: 'orto_foraar_wmts_DAF'
        },
        {
          name: 'dagi',
          type: 'WMS',
          title: 'Kommune grænser',
          service: 'dagi',
          layer: 'kommune',
          style: 'red',
          format: 'image/png',
          source: 'kf'
        }
      ],
      selectedMarkerData: [],
      showPopup: false,
      currentClusterLayerId: '',
      clustering: false
    }
  },
  computed: {
    mapConstants() {
      return this.mapSettings.mapConstants
    },
    visualizationDef() {
      return this.mapSettings.visualizationDef
    }
  },
  watch: {
    data() {
      if (this.status === 'ready') {
        // this.resetMarkersLayer()
        this.map.updateSize()
      } else if (status === 'loading') {
        this.initMap()
        this.status = 'ready'
      }
    },
    active(val) {
      if (val) {
        this.$nextTick(() => {
          this.map.updateSize()
        })
      }
    },
    fullScreen() {
      this.$nextTick(() => {
        this.map.updateSize()
      })
    }
  },
  created() {
  },
  mounted() {
    this.clustering = this.mapSettings.clustering
    this.initMap()
  },
  methods: {
    initMap() {
      this.status = 'initializing'
      this.map = null
      const projection = this.createProjection('EPSG:25832', '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', this.mapConstants.extent)
      const auth = {
        source: 'kf',
        token: this.token
      }
      this.tileLayers = this.createLayers(this.layerSettings, auth)
      this.map = this.createMap(this.tileLayers, projection)
      this.status = 'ready'
    },
    createMap(tileLayers, projection) {
      return new Map({
        target: 'map',
        layers: tileLayers,
        // controls: defaultControls().extend([scaleControl()]),
        controls: [scaleControl()],
        view: new View({
          center: fromLonLat(this.mapConstants.center, 'EPSG:25832'),
          zoom: 3,
          maxZoom: 15,
          projection: projection
        })
      })
    },
    createLayers(layerSettings, auth) {
      const layers = []
      const tileGrid = new WMTSTileGrid({
        extent: this.mapConstants.extent,
        resolutions: this.mapConstants.resolutions,
        matrixIds: this.mapConstants.matrixIds
      })
      layerSettings.forEach((layer) => {
        if (layer.type === 'WMTS') {
          layers.push(createTileLayer({
            name: layer.name,
            type: 'WMTS',
            title: layer.title,
            visible: this.background === layer.name,
            service: layer.service,
            layer: layer.name,
            matrixSet: 'View1',
            format: 'image/jpeg',
            tileGrid: tileGrid,
            auth: auth
          }))
        } else if (layer.type === 'WMS') {
          layers.push(createTileLayer({
            name: layer.name,
            type: 'WMS',
            title: layer.title,
            visible: this.background === layer.name,
            service: layer.service,
            layer: layer.layer,
            style: 'red',
            format: 'image/png',
            source: 'kf',
            auth: auth
          }))
        }
      })
      return layers
    },
    createProjection(name, settings, extent) {
      proj4.defs(name, settings)
      register(proj4)
      const projection = getProjection(name)
      projection.setExtent(extent)
      return projection
    },
    zoom(type) {
      const view = this.map.getView()
      const factor = 1
      if (type === 'in') {
        view.animate({zoom: view.getZoom() + factor})
      } else {
        view.animate({zoom: view.getZoom() - factor})
      }
    },
    updateFilters(filters) {
      this.$emit('filters-updated', filters)
    },


  }
}
</script>

<style lang="stylus">
.map-container
  height 100%

#map
  width 100%
  height 100%

#marker-popup
  display inline-block
  height 300px
  background white
  padding 1rem
  overflow-y scroll
  margin-left 2rem
  margin-top -2rem
  border 1px solid white
  box-shadow 0 4px 4px rgba(0, 0, 0, .5)

#marker-popup::before {
  content: "\A";
  border-style: solid;
  border-width: 10px 15px 10px 0;
  border-color: transparent white transparent transparent;
  position: absolute;
  left: calc(2rem - 15px);
  top: -10px;
}

#marker-popup .title
  outline none

.box
  margin 0
  padding 0
  border-radius 24px
  overflow hidden
  box-sizing content-box
  border 4px solid var(--darkSteel)
  background-color rgba(255, 255, 255, 0.8)

#map__info-box
  position absolute
  top 1rem
  right 1rem
  padding 3px
  width auto

  & > button
    border-radius 18px !important
    padding 5px 5px 5px 10px

#map__controls-box
  position absolute
  top 10rem
  left 1rem
  max-width 20rem
  min-width 1rem
  max-height 40rem
  width auto

#map__input-box
  position absolute
  top 1rem
  left 1rem
  //max-width 20rem
  min-width 1rem
  //max-height 40rem
  width auto

#marker-popup ul
  padding 0
  list-style-type none

#marker-popup li
  padding 0 0 0 calc(2rem + 4px)

#marker-popup li.indent-small
  padding 0 0 0 0

#marker-popup p
  margin-top .5rem
  margin-bottom .5rem
#scale
  right: 0px
</style>
