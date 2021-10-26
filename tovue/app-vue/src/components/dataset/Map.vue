<template>
  <div class="map-container position-relative" :class="fullScreen ? 'full-screen' : 'normal'">
    <div id="map" ref="map">
      <h2 v-if="status === 'loading' || status === 'initializing'" class="loader">Henter kort...</h2>
    </div>
    <div id="marker-popup" v-show="showPopup">
      <div v-for="(marker, index) in selectedMarkerData" :key="marker.title + index">
        <h4 class="title" @click="marker.active = !marker.active">
          <Icon
            v-if="!marker.active"
            icon="ChevronDownIcon"
            :key="marker.title + index + 'ChevronDownIcon'"
            :width="1"
            :height="1"
            :color="'black'"
          />
          <Icon
            v-else
            icon="ChevronUpIcon"
            :key="marker.title + index + 'ChevronUpIcon'"
            :width="1"
            :height="1"
            :color="'black'"
          />
          {{ marker.title  }}
        </h4>
        <ul class="marker-data" v-if="marker.active">
          <li v-for="(attr, i) in marker.elements" :key="i">
            <div v-if="typeof attr.value === 'object'">
              <div>
                {{ attr.label }}:
              </div>
              <ul>
                <li v-for="(el, elIndex) in attr.value" :key="`${el.label}_${elIndex}`" class="indent-small">
                  <p @click="el.active = !el.active">
                    <Icon
                      v-if="!el.active"
                      icon="ChevronDownIcon"
                      :key="attr.label + elIndex + 'ChevronDownIcon'"
                      :width="1"
                      :height="1"
                      :color="'black'"
                    />
                    <Icon
                      v-else
                      icon="ChevronUpIcon"
                      :key="el.label + elIndex + 'ChevronUpIcon'"
                      :width="1"
                      :height="1"
                      :color="'black'"
                    />
                    {{ el.label }}
                  </p>
                  <ul v-if="el.active">
                    <li v-for="(attr, j) in el.value" :key="`${attr.label}_${j}`">
                      <p v-if="attr.value">
                        {{ attr.label }}
                        :
                        {{ attr.value }}
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <p v-else>
              {{ attr.label }}
              :
              {{ attr.value }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <MapControls
      id="map__controls-box"
      v-if="status === 'ready'"
      @zoom-out="zoom('out')"
      @zoom-in="zoom('in')"
      :filterDef="filters"
      :mapSettings="mapSettings"
      @update-filters="updateFilters"
      @toggle-clustering="toggleClustering"
      :clustering="clustering"
    >
    </MapControls>
    <div id="map__info-box" v-if="status === 'ready'" class="box">
      <button class="buttonmaster no-border cursor-point" @click="fullScreen = !fullScreen">
        <span v-if="fullScreen === true">Luk fuldskærmsvisning</span>
        <span v-else-if="fullScreen === false">Åbn i fuldskærmsvisning</span>
        <Icon
          v-if="fullScreen === true"
          icon="CollapseIcon"
          :key="'close'"
          :width="2"
          :height="2"
        />
        <Icon
          v-else-if="fullScreen === false"
          icon="ExpandIcon"
          :key="'open'"
          :width="2"
          :height="2"
        />
      </button>
    </div>
  </div>
</template>

<script>
import 'ol/ol.css'
import { Map, View } from 'ol'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { get as getProjection, fromLonLat } from 'ol/proj'
import { register } from 'ol/proj/proj4'
import proj4 from 'proj4/dist/proj4'
import Overlay from 'ol/Overlay'
import * as olExtent from 'ol/extent'
import { createTileLayer, createClusterLayer, createFeaturesLayer } from '@/components/dataset/MapFunctions.js'
import MapControls from '@/components/dataset/MapControls'

export default {
  components: {
    MapControls
  },
  props: {
    datasetId: {
      type: Number,
      required: true
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
  data () {
    return {
      status: 'loading',
      fullScreen: false,
      map: {},
      background: 'dtk_skaermkort_daempet',
      token: '1fa17ba3b6fb58e8e6e8b09ba2b14be6',
      tileLayers: [],
      layerSettings: [
        {
          name: 'dtk_skaermkort_daempet',
          type: 'WMTS',
          title: 'Skærmkort dæmpet',
          service: 'topo_skaermkort_daempet'
        },
        {
          name: 'dtk_skaermkort',
          type: 'WMTS',
          title: 'Skærmkort',
          service: 'topo_skaermkort'
        },
        {
          name: 'orto_foraar',
          type: 'WMTS',
          title: 'Ortofoto',
          service: 'orto_foraar'
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
    mapConstants () {
      return this.mapSettings.mapConstants
    },
    visualizationDef () {
      return this.mapSettings.visualizationDef
    }
  },
  watch: {
    data () {
      if (this.status === 'ready') {
        this.resetMarkersLayer()
        this.map.updateSize()
      } else if (status === 'loading') {
        this.initMap()
        this.status = 'ready'
      }
    },
    active (val) {
      if (val) {
        this.$nextTick(() => {
          this.map.updateSize()
        })
      }
    },
    fullScreen () {
      this.$nextTick(() => {
        this.map.updateSize()
      })
    }
  },
  created () {
    // console.log('map component created')
  },
  mounted () {
    // console.log('map component mounted')
    this.clustering = this.mapSettings.clustering
    this.initMap()
  },
  methods: {
    initMap () {
      this.status = 'initializing'
      this.map = null
      const projection = this.createProjection('EPSG:25832', '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', this.mapConstants.extent)
      const auth = {
        source: 'kf',
        token: this.token
      }
      this.tileLayers = this.createLayers(this.layerSettings, auth)
      this.map = this.createMap(this.tileLayers, projection)
      if (this.visualizationDef && this.visualizationDef.markers) {
        const markers = this.createMarkersFromData(this.data, this.visualizationDef)
        const clusterLayer = this.clustering ? createClusterLayer(markers) : createFeaturesLayer(markers)
        this.currentClusterLayerId = clusterLayer.ol_uid
        this.map.addLayer(clusterLayer)
      }
      if (this.visualizationDef && this.visualizationDef.markers && this.visualizationDef.markers.popup) {
        const overlay = this.createOverlay('marker-popup')
        this.map.addOverlay(overlay)
        this.map.on('singleclick', (event) => {
          const coordinate = event.coordinate
          overlay.setPosition(coordinate)

          let features = []
          const self = this
          this.map.forEachFeatureAtPixel(
            event.pixel,
            function (feature, layer) {
              features = self.clustering ? feature.get('features') : [feature]
            },
            {
              hitTolerance: 3
            }
          )
          this.selectedMarkerData = []
          for (let i = 0; i < features.length; i++) {
            const feature = features[i]
            const titleId = this.visualizationDef.markers.popupTitleFieldId
            const secondLevelHeader = this.visualizationDef.markers.secondLevelHeader
            const secondLevelTitleField = this.visualizationDef.markers.secondLevelTitleFieldId
            const markerIdField = this.visualizationDef.markers.markerIdField || ''
            const data = this.data

            const featureDataIndex = data.findIndex(item => item[markerIdField] === feature.get('id'))
            const featureData = data[featureDataIndex]
            const popupData = {}
            popupData.elements = []
            for (const key in featureData) {
              const val = featureData[key]
              if (
                ((typeof val === 'string') || (typeof val === 'number') || (typeof val === 'boolean')) &&
                key !== titleId
              ) {
                const labelIndex = this.columnDef.findIndex(col => col.fieldId === key)
                if (labelIndex !== -1) {
                  const label = this.columnDef[labelIndex].label
                  popupData.elements.push({ label: label, value: val })
                }
              } else if (Array.isArray(val)) {
                const list = []
                val.forEach(item => {
                  const listProperties = []
                  for (const key2 in item) {
                    const val = item[key2]
                    const labelIndex = this.columnDef.findIndex(col => col.fieldId === key2)
                    if (labelIndex !== -1) {
                      const label = this.columnDef[labelIndex].label
                      listProperties.push({ label: label, value: val, active: false })
                    }
                  }
                  const label = item[secondLevelTitleField]
                  list.push({ label: label, value: listProperties, active: false })
                })
                popupData.elements.push({ label: secondLevelHeader, value: list, active: false })
              }
            }
            popupData.elements = popupData.elements.reverse()
            popupData.title = featureData[titleId]
            popupData.active = features.length === 1
            popupData.anlaeg = featureData.anlaeg
            this.selectedMarkerData.push(popupData)
          }
          if (features[0]) {
            this.showPopup = true
          } else {
            this.showPopup = false
          }
          const popup = document.getElementById('marker-popup')
          popup.scrollTop = 0
        })
        this.map.on('dblclick', (event) => {
          const coordinate = event.coordinate
          overlay.setPosition(coordinate)

          let features = []
          const self = this
          this.map.forEachFeatureAtPixel(
            event.pixel,
            function (feature, layer) {
              features = self.clustering ? feature.get('features') : [feature]
            },
            {
              hitTolerance: 1
            }
          )
          if (features[0]) {
            const extent = features[0].getGeometry().getExtent().slice(0)
            for (let i = 0; i < features.length; i++) {
              olExtent.extend(extent, features[i].getGeometry().getExtent())
            }
            this.map.getView().fit(extent, this.map.getSize())
          }
        })
      }
      this.status = 'ready'
      // console.log('map initialized')
    },
    createMap (tileLayers, projection) {
      return new Map({
        target: 'map',
        layers: tileLayers,
        controls: [],
        view: new View({
          center: fromLonLat(this.mapConstants.center, 'EPSG:25832'),
          zoom: 3,
          maxZoom: 15,
          projection: projection
        })
      })
    },
    createOverlay (elementId) {
      const container = document.getElementById(elementId)
      const overlay = new Overlay({
        element: container,
        autoPan: false,
        autoPanAnimation: {
          duration: 250
        }
      })
      return overlay
    },
    createLayers (layerSettings, auth) {
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
    createMarkersFromData (data, visualizationDef) {
      const markers = []
      const markerIcon = visualizationDef.markerIcon || {}
      const markerSize = visualizationDef.markerSize || {}
      const markerIdField = visualizationDef.markers.markerIdField || ''
      const markerGeometryField = visualizationDef.markers.markerGeometryField || ''

      const utm = '+proj=utm +zone=32'
      const wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'

      const allCoords = []
      const allSizes = []
      const withoutCoords = []
      for (let i = 0; i < data.length; i++) {
        const row = data[i]
        const coords = row[markerGeometryField].replace('POINT (', '').replace(')', '').split(' ')
        const x = Number(String(coords[0]).split(',').join('.'))
        const y = Number(String(coords[1]).split(',').join('.'))
        if (!isNaN(x) && !isNaN(y)) {
          const marker = {}
          const coord = proj4(utm, wgs84, [x, y])
          marker.lon = coord[0]
          marker.lat = coord[1]

          const iconType = markerIcon && markerIcon.dataFieldId && row[markerIcon.dataFieldId] ? String(row[markerIcon.dataFieldId]) : 'default'
          const iconUrl = iconType && markerIcon.iconMap && markerIcon.iconMap[iconType] ? markerIcon.iconMap[iconType] : 'default'
          marker.iconUrl = iconUrl

          const sizeFieldValue = markerSize && markerSize.dataFieldId ? String(row[markerSize.dataFieldId]) : null
          const size = sizeFieldValue && markerSize.sizeMap && !isNaN(markerSize.sizeMap[sizeFieldValue]) ? markerSize.sizeMap[sizeFieldValue] : 1

          marker.size = size
          marker.id = row[markerIdField]
          markers[i] = marker

          // just for dev purposes
          allCoords.push(x + '-' + y)
          allSizes.push(sizeFieldValue)
        } else {
          // just for dev purposes
          withoutCoords.push(row)
        }
      }
      return markers
    },
    createProjection (name, settings, extent) {
      proj4.defs(name, settings)
      register(proj4)
      const projection = getProjection(name)
      projection.setExtent(extent)
      return projection
    },
    switchLayer () {
      if (this.background === 'dtk_skaermkort_daempet') {
        this.background = 'dtk_skaermkort'
        this.dtk_skaermkort.setVisible(true)
        this.dtk_skaermkort_daempet.setVisible(false)
      } else {
        this.background = 'dtk_skaermkort_daempet'
        this.dtk_skaermkort.setVisible(false)
        this.dtk_skaermkort_daempet.setVisible(true)
      }
    },
    zoom (type) {
      const view = this.map.getView()
      const factor = 1
      if (type === 'in') {
        view.animate({ zoom: view.getZoom() + factor })
      } else {
        view.animate({ zoom: view.getZoom() - factor })
      }
    },
    resetMarkersLayer () {
      let currentLayer = null
      this.map.getLayers().forEach((layer) => {
        if (this.currentClusterLayerId === layer.ol_uid) {
          currentLayer = layer
        }
      })
      if (currentLayer) {
        this.map.removeLayer(currentLayer)
      }
      const markers = this.createMarkersFromData(this.data, this.visualizationDef)
      const clusterLayer = this.clustering ? createClusterLayer(markers) : createFeaturesLayer(markers)
      this.currentClusterLayerId = clusterLayer.ol_uid
      this.map.addLayer(clusterLayer)
    },
    updateFilters (filters) {
      this.$emit('filters-updated', filters)
    },
    toggleClustering (val) {
      // this.clustering = val.target.checked
      this.clustering = !this.clustering
      this.resetMarkersLayer()
    }
  }
}
</script>

<style lang="stylus">
.map-container.normal
  height 40rem

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
  box-shadow 0 4px 4px rgba(0,0,0, .5)

#marker-popup::before {
    content:"\A";
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
  background-color rgba(255,255,255,0.8)

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
  top 1rem
  left 1rem
  max-width 20rem
  min-width 20rem
  max-height 40rem
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
</style>
