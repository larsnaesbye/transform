<template>
  <article class="darken-background">
    <section class="map-view-box">
      <Icon
          class="close-icon cursor-point"
          icon="CloseIcon"
          :width="2"
          :height="2"
          :color="colors.white"
          :strokeWidth="1"
          @click="$emit('close-map-view')"
      />
      <ImageContainer
          @rights-accepted="toggleRightsAccepted"
          :imageFile="imageFile"
          :showMapImage="showMapImage"
          :metaData="metaData"
          :imageData="imageData"/>
      <MapMetaData
          :imageFile="imageFile"
          :showMapImage="showMapImage"
          :metaData="metaData"
          :rightsAccepted="rightsAccepted"
          :imageData="imageData"/>
    </section>
  </article>
</template>

<script>
import MapMetaData from '@/components/mapImageViewer/MapMetaData'
import ImageContainer from '@/components/mapImageViewer/ImageContainer'
import { inject, ref, watch } from 'vue'
export default {
  name: 'MapImageViewer',
  components: { MapMetaData, ImageContainer },
  props: {
    imageFile: {
      type: Array,
      default () {
        return []
      }
    },
    showMapImage: {
      type: Boolean,
      default () {
        return false
      }
    },
    metaData: {
      type: Object
    }
  },
  emits: [
    'close-map-view'
  ],
  setup (props) {
    const colors = inject('themeColors')
    const rightsAccepted = ref(false)
    const toggleRights = ref(true)
    const imageData = ref({})
    const imageViewerSize = ref(4000)
    const images = ref([])
    watch(() => [props.imageFile], (file) => {
      if (props.showMapImage) {
        fetchImageData(file[0][0] + '/info.json?token=147df2cc622086861a8ca994809a1ace')
      }
    })
    const fetchImageData = (imgData) => {
      return new Promise((resolve, reject) => {
        fetch(imgData)
          .then(resp => {
            resp.json().then(data => {
              resolve(data)
              imageData.value = data
            })
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
    const toggleRightsAccepted = (e) => {
      rightsAccepted.value = e
    }
    return {
      colors,
      toggleRights,
      rightsAccepted,
      toggleRightsAccepted,
      fetchImageData,
      imageData,
      imageViewerSize,
      images
    }
  }
}
</script>

<style scoped>
.darken-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 5;
}
.map-view-box {
  background-color: var(--darkTurquoise);
  border: 4px solid var(--darkSteel);
  border-radius: 25px;
  width: 90%;
  height: 90%;
  min-width: 700px;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: flex;
  padding: 0;
  margin: 0;
  z-index: 5;
}
.close-icon {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(40%) translateY(-40%);
  background-color: var(--highlight2);
  border-radius: 25px;
  border: 1px solid var(--darkTurquoise);
}
</style>
