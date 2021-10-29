<template>
  <section>
    <div id="map" class="olmap" ref="map" @mousemove.capture="onMouseMove">
      <MapControls
          id="map-controls-box"
          @zoom-out="zoom('out')"
          @zoom-in="zoom('in')"
          @pin-pointer="pinPointer = !pinPointer"
      />
    </div>
    <Icon :class="{ showPin: pinPointer }"
          ref="mousePin"
          id="mousePin"
          icon="Locationicon"
          :width="2"
          :height="2"
          :strokeWidth="1"
          :color="colors.darkTurquoise3"
    />
    <div v-show="pinPointer" id="placed-pin">
      <Icon icon="Locationicon"
            :width="2"
            :height="2"
            :strokeWidth="1"
            :color="colors.darkTurquoise3"
      />
    </div>
    <div id="mouse-position"/>
  </section>
</template>

<script>
import 'ol/ol.css'
import OlMap from 'ol/Map'
import OlView from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Overlay from 'ol/Overlay'
import {
  defaults as defaultControls,
  ScaleLine,
  Attribution,
  MousePosition,
  FullScreen
} from 'ol/control'
import MapControls from './MapControls'
import { createStringXY } from 'ol/coordinate'
import Zoom from 'ol/control/Zoom'
import { inject, ref, computed } from 'vue'
import { sendFilterData } from '@/HelperFunctions'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import proj4 from 'proj4'

export default {
  name: 'MapContainer',
  components: {
    MapControls
  },
  props: {
    attribution: {
      type: Boolean
    }
  },
  setup () {
    const colors = inject('themeColors')
    const filters = inject('providedFilters')
    const store = useStore()
    const router = useRouter()
    const olMap = ref({})
    const olView = ref({})
    const pinPointer = ref(false)
    const mousePositionControl = ref({})
    const source = new proj4.Proj('EPSG:3857')
    const dest = new proj4.Proj('EPSG:4326')
    const setCoordinates = (event) => {
      /* if (getCoordinatesFromFilters.value) {
        const newCoor2 = proj4(dest, source, [9, 56])
        console.log(olMap.value.overlays_.array_[0].position = newCoor2)
        pinPointer.value = true
      } */
      if (pinPointer.value && event.coordinate) {
        const newCoor = proj4(source, dest, [event.coordinate[0], event.coordinate[1]])
        sendFilterData(Object.assign(filters.value.resultsTags, {
          geometri: 'POINT(' + newCoor.join(' ') + ')' || ''
        }), store, router)
      }
    }
    const tmpPin = computed(() => { return document.getElementById('mousePin') || {} })
    const onMouseMove = (event) => {
      tmpPin.value.style.cssText = 'left: ' + event.pageX + 'px; top: ' + (event.pageY - 10) + 'px;'
    }
    /* const getCoordinatesFromFilters = computed(() => {
      return filters.value.resultsTags.geometri
    }) */
    return {
      colors,
      filters,
      store,
      router,
      olMap,
      olView,
      mousePositionControl,
      setCoordinates,
      pinPointer,
      onMouseMove
    }
  },
  mounted () {
    this.mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:3857',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position')
    })
    const attribution = new Attribution({
      collapsible: false
    })
    this.olView = new OlView({
      center: [1295112.66, 7606748.02],
      zoom: 6,
      minZoom: 4,
      maxZoom: 20,
      showFullExtent: true,
      projection: 'EPSG:3857'
    })
    this.olMap = new OlMap({
      target: 'map',
      controls: defaultControls({
        zoom: false,
        attribution: false,
        rotate: false
      }).extend([this.mousePositionControl, new FullScreen()]),
      zoom: new Zoom({
        duration: 700,
        className: 'custom-zoom',
        zoomInClassName: '-in',
        zoomOutClassName: '-out',
        zoomInLabel: 'Zoom ind2',
        zoomOutLabel: 'Zoom ud2',
        zoomInTipLabel: 'Zoom2',
        zoomOutTipLabel: 'Zoom2'
      }),
      view: this.olView,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ]
    })
    this.olMap.addControl(new Attribution({ collapsible: false }))
    this.olMap.addControl(new ScaleLine())
    const checkSize = () => {
      const small = this.olMap.getSize()[0] < 600
      attribution.setCollapsible(small)
      attribution.setCollapsed(small)
    }
    this.olMap.on('click', (event) => {
      const coordinate = event.coordinate
      overlay.setPosition(coordinate)
      this.setCoordinates(event)
    })
    const placedPin = document.getElementById('placed-pin')
    const overlay = new Overlay({
      element: placedPin,
      positioning: 'center-center'
    })
    this.olMap.addOverlay(overlay)
    window.addEventListener('resize', checkSize)
    this.$refs.map.addEventListener('resize', checkSize)
    checkSize()
  },
  methods: {
    zoom (type) {
      const view = this.olMap.getView()
      const zoom = view.getZoom()
      if (type === 'in') {
        view.animate({ zoom: zoom + 1 })
      } else {
        view.animate({ zoom: zoom - 1 })
      }
    }
  }
}
</script>

<style scoped>
.olmap {
  width: 100%;
  height: 80vh;
  position: sticky;
  top: 0px;
}

#mousePin {
  display: none;
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
#mousePin.showPin {
  display: block;
}

#placed-pin {
  position: absolute;
  transform: translateX(-50%) translateY(-85%);
}
#map-controls-box {
  position: absolute;
  right: 1vh;
  margin: 2rem;
  max-height: 3rem;
  width: auto;
  z-index: 1;
}

.ol-mouse-position {
  bottom: 30px;
}
</style>
