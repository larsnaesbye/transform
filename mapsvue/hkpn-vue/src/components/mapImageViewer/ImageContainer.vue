<template>
    <article id="image-box" class="scrollable-map scrollable">
      <Icon
          class="loading-icon"
          icon="LoadingIcon2"
          :width="7"
          :height="7"
          :color="colors.action"
          :strokeWidth="1"
      />
      <section class="viewer-controls">
        <div class="viewer-buttons">
          <a>
            <Icon
                class="viewer-icons cursor-point"
                icon="ShareIcon"
                :width="2.6"
                :height="2.6"
                :color="colors.darkTurquoise"
                :strokeWidth="1.5"
                @click="toggleShare =!toggleShare"
            />
          </a>
          <a id="full-page" href="#full-page">
            <Icon
                class="viewer-icons cursor-point"
                icon="FullscreenIcon"
                :width="3"
                :height="3"
                :color="colors.darkTurquoise"
                :strokeWidth="1.5"
            />
          </a>
          <a id="zoom-in" href="#zoom-in">
            <Icon
                class="zoom-icons cursor-point"
                icon="PlusIcon"
                :width="2.5"
                :height="2.5"
                :color="colors.darkTurquoise"
                :strokeWidth="1"
            />
          </a>
          <a id="zoom-out" href="#zoom-out">
            <Icon
                class="zoom-icons cursor-point"
                icon="MinusIcon"
                :width="2.5"
                :height="2.5"
                :color="colors.darkTurquoise"
                :strokeWidth="1.5"
            />
          </a>
          <a id="rotate-left" href="#rotate-left">
            <Icon
                class="rotate-icons cursor-point"
                icon="RotateIcon"
                :width="2.6"
                :height="2.6"
                :color="colors.darkTurquoise"
                :strokeWidth="1.5"
                :style=" { 'transform': 'scaleX(-1)' } "
            />
          </a>
          <a id="rotate-right" href="#rotate-right">
            <Icon
                class="rotate-icons cursor-point"
                icon="RotateIcon"
                :width="2.6"
                :height="2.6"
                :color="colors.darkTurquoise"
                :strokeWidth="1.5"
            />
          </a>
          <a v-if="imageSources.length > 1">
            <Icon
                class="more-icons cursor-point"
                icon="MoreIcon"
                :width="3"
                :height="3"
                :strokeWidth="0.5"
                :color="colors.darkTurquoise"
                :style="{ 'transform': 'scaleX(-1)' }"
                @click="prevImage"
            />
          </a>
          <a v-if="imageSources.length > 1">
            <Icon
                class="more-icons cursor-point"
                icon="MoreIcon"
                :width="3"
                :height="3"
                :strokeWidth="0.5"
                :color="colors.darkTurquoise"
                @click="nextImage"
            />
          </a>
        </div>
        <article class="rights-soekort" v-show="metaData.arketype === 'soekort'">
          <section class="inline"
                   @click="toggleRights =! toggleRights">
            <h5>Rettigheder for Søkort</h5>
            <Icon
                icon="MoreIcon"
                :width="1.5"
                :height="1.5"
                :color="colors.black"
                :style="{ 'transform': (toggleRights? 'translateY(-4px) rotate(-90deg)' : 'translateY(-4px) rotate(90deg)') }"
                :strokeWidth="1"
            />
          </section>
          <section v-show="metaData.arketype === 'soekort' && toggleRights">
            <p>Søkortene er gamle, og sejloplysningerne er ikke længere korrekte. Geodatastyrelsen har ophavsret på en del af kortene. Derfor gælder der særlige betingelser for søkort: </p>
            <ol>
              <li>Det er ikke tilladt at kopiere og/eller videregive kortene til tredjemand.</li>
              <li>Det er ikke tilladt at anvende søkortene kommercielt.</li>
              <li>Sejlads efter søkortene er ikke tilladt, da søkortene er gamle. De egner sig derfor ikke til sejlads. Hvis der alligevel sejles efter disse, sker sejlads på eget ansvar</li>
            </ol>
            <p>Hvis man ønsker at erhverve sig en fil eller tilladelse til at reproducere kortet, skal man henvende sig til Geodatastyrelsen: gst@gst.dk </p>
            <button class="buttonmaster rights-button" v-show="!rightsAccepted" @click="rightsAccepted = !rightsAccepted; toggleRights = !toggleRights; $emit('rights-accepted', rightsAccepted)">Acceptér</button>
          </section>
        </article>
        <article v-show="toggleShare" class="share">
          <section v-for="file in imageFile"
                  :key="file"
                  class="inline">
            <input type="text" :id="file" :value="file + '/full/' + viewerSize + ',/0/default.jpg?token=147df2cc622086861a8ca994809a1ace'">
            <button>
              <Icon
                  icon="CopyIcon"
                  :width="1.5"
                  :height="1.5"
                  :color="colors.white"
                  :strokeWidth="1"
                  @click="copyLink(file)"
              />
            </button>
          </section>
        </article>
      </section>
    </article>
</template>

<script>
import OpenSeaDragon from 'openseadragon'
import { inject, ref, watch } from 'vue'
export default {
  name: 'ImageContainer',
  props: {
    imageFile: {
      type: Array,
      default () {
        return []
      }
    },
    showMapImage: {
      type: Boolean
    },
    metaData: {
      type: Object
    },
    imageData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  setup (props) {
    const colors = inject('themeColors')
    const toggleRights = ref(true)
    const rightsAccepted = ref(false)
    const viewerSize = ref(0)
    const viewer = ref(null)
    const imageSources = ref([])
    const imageCounter = ref(0)
    const toggleShare = ref(false)
    watch(() => [props.imageFile, props.imageData.width], (images) => {
      if (props.showMapImage && props.imageData.width !== undefined) {
        if (props.imageData.width > 4000) {
          viewerSize.value = 4000
        } else if (props.imageData.width < 4000 && props.imageData.width > 3000) {
          viewerSize.value = 3000
        } else if (props.imageData.width < 3000 && props.imageData.width > 2000) {
          viewerSize.value = 2000
        }
        generateTileSources(images[0])
      }
    })
    watch(() => [props.showMapImage], (bool) => {
      if (!bool && viewer.value) {
        viewer.value.destroy()
      }
    })
    const copyLink = (file) => {
      const copyText = document.getElementById(file)
      copyText.select()
      copyText.setSelectionRange(0, 99999) /* For mobile devices */
      navigator.clipboard.writeText(copyText.value)
    }
    const generateTileSources = (images) => {
      imageSources.value = []
      for (let i = 0; i < images.length; ++i) {
        imageSources.value.push(images[i])
      }
      createMapView()
    }
    const nextImage = () => {
      if (imageCounter.value > (imageSources.value.length - 2)) {
        imageCounter.value = 0
      } else {
        imageCounter.value++
      }
      viewer.value.open({
        type: 'image',
        url: imageSources.value[imageCounter.value] + '/full/' + viewerSize.value + ',/0/default.jpg?token=147df2cc622086861a8ca994809a1ace'
      })
    }
    const prevImage = () => {
      if (imageCounter.value < 0) {
        imageCounter.value = imageSources.value.length - 1
      } else {
        imageCounter.value--
      }
      viewer.value.open({
        type: 'image',
        url: imageSources.value[imageCounter.value] + '/full/' + viewerSize.value + ',/0/default.jpg?token=147df2cc622086861a8ca994809a1ace'
      })
    }
    const createMapView = () => {
      if (viewer.value) {
        viewer.value.open({
          type: 'image',
          url: imageSources.value[0] + '/full/' + viewerSize.value + ',/0/default.jpg?token=147df2cc622086861a8ca994809a1ace'
        })
      } else {
        viewer.value = new OpenSeaDragon({
          id: 'image-box',
          visibilityRatio: 1,
          minZoomLevel: 1,
          defaultZoomLevel: 1,
          showNavigator: true,
          showRotationControl: true,
          zoomInButton: 'zoom-in',
          zoomOutButton: 'zoom-out',
          fullPageButton: 'full-page',
          rotateLeftButton: 'rotate-left',
          rotateRightButton: 'rotate-right',
          tileSources: [{
            type: 'image',
            url: imageSources.value[0] + '/full/' + viewerSize.value + ',/0/default.jpg?token=147df2cc622086861a8ca994809a1ace',
            tiles: [{
              scaleFactors: [1, 2, 4, 8, 16, 32],
              height: 512,
              width: 512,
              tileSize: 512
            }]
          }]
        })
      }
    }
    return {
      colors,
      toggleRights,
      viewer,
      rightsAccepted,
      imageSources,
      createMapView,
      nextImage,
      prevImage,
      toggleShare,
      copyLink,
      viewerSize
    }
  }
}
</script>

<style scoped>
.share {
  width: 100%;
}
.share input {
  width: 100%;
  border-radius: 15px 0 0 15px;
  height: 30px;
  margin-bottom: 10px;
}
input:focus {
  outline: none;
}
.share button {
  border-radius: 0 15px 15px 0;
  background-color: var(--darkTurquoise);
  height: 30px;
  border: 1px solid var(--darkTurquoise);
}
.inline {
  display:inline-flex;
}
h3 {
  margin: 4vh 1vw 1vh 1vw;
}
.scrollable-map {
  width: 80%;
  height: 100%;
  overflow: hidden;
  border-radius: 22px 0 0 22px;
  padding: 0;
  margin: 0;
}
.viewer-controls {
  position: absolute;
  max-width: 28rem;
  top: 10px;
  left: 10px;
  z-index: 5;
  background-color: var(--white);
  border-radius: 30px;
  border: 4px solid var(--darkSteel);
  padding: 0 10px 0 10px;
}
.viewer-icons {
  margin: 0 0.3rem 0 0.3rem;
  padding: 0;
}
.zoom-icons {
  margin: 0 0.4rem 0 0.4rem;
  padding: 0;
}
.rotate-icons {
  margin: 0 0.3rem 0 0.3rem;
  padding: 0;
}
.more-icons {
  margin: 0;
  padding: 0;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
ul li {
  list-style-type: none;
  padding: 10px 1vw 10px 1vw;
  margin: 0;
  background-color: var(--darkSteel2);
  color: var(--black);
  border-bottom: 1px solid var(--darkTurquoise);
  word-break: break-all;
}
.resolution li {
  background-color: var(--white);
  color: var(--darkTurquoise3)
}
.resolution li:hover {
  background-color: var(--mediumSteel);
}
.loading-icon {
  position: absolute;
  top: 50%;
  left: 40%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}
.rights-soekort {
  border-top: 1px solid var(--darkSteel);
  padding: 1vh 0.5vw;
  min-width: 18rem;
  max-width: 19rem;
  overflow: auto;
  max-height: 100%;
}
.rights-soekort li {
  border: none;
  margin: 0 0.5rem 0.5rem 0;
}
.rights-soekort ol {
  margin: 0 1vw 0 1vw;
  padding: 0;
}
.rights-button {
  background-color: var(--darkTurquoise);
  padding: 0.7vh;
  border-color: var(--darkSteel);
}
.rights-button:hover {
  background-color: var(--action);
  border-color: var(--darkSteel);
}
.scrollable::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: transparent;
}
.scrollable::-webkit-scrollbar-corner {
  background-color: transparent;
  border-color: transparent;
}
.scrollable::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--darkSteel);
}
.scrollable::-webkit-scrollbar-track {
  background-color: var(--darkSteel);
}
</style>
