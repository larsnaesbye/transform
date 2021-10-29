<template>
  <article class="meta-data-box">
    <h3 class="white-text">{{ metaData.titel }}</h3>
    <section class="meta-data scrollable">
      <article class="data-title inline" @click="toggleMetaData = !toggleMetaData">
        <h5>Metadata for Kortblad</h5>
        <Icon
            icon="MoreIcon"
            :width="1.8"
            :height="1.8"
            :strokeWidth="0.5"
            :color="colors.black"
            :style="{ 'transform': (toggleMetaData? 'translateY(-6.5px) rotate(-90deg)' : 'translateY(-6.5px) rotate(90deg)') }"
        />
      </article>
      <ul v-show="toggleMetaData">
        <li>Kortgruppe: {{ metaData.arketype }}</li>
        <li>Dækningsområde: {{ metaData.daekningsomraade }}</li>
        <li>Gyldig fra: {{ metaData.gaeldendefra }}</li>
        <li>Gyldig til: {{ metaData.gaeldendetil }}</li>
        <li>ID: {{ metaData.id }}</li>
        <li>Kortbladnummer: {{ metaData.kortbladnummer }}</li>
        <li>Kortværk: {{ metaData.kortvaerk }}</li>
        <li>Målestok: {{ metaData.maalestok }}</li>
        <li>Tegner: {{ metaData.tegner}}</li>
        <li>Unikt kortnavn: {{ metaData.uniktkortnavn }}</li>
        <li>Bemærkning: {{ metaData.bemaerkning }}</li>
      </ul>
      <article class="data-title inline" @click="toggleReportError = !toggleReportError">
        <h5>Indberet Fejl</h5>
        <Icon
            icon="MoreIcon"
            :width="1.8"
            :height="1.8"
            :color="colors.black"
            :style="{ 'transform': (toggleReportError? 'translateY(-6.5px) rotate(-90deg)' : 'translateY(-6.5px) rotate(90deg)') }"
            :strokeWidth="0.5"
        />
      </article>
      <ul v-show="toggleReportError">
        <li>Har du brug for hjælp eller fundet en fejl på siden? Skriv eller ring til supporten. Vi har åbent alle hverdage kl. 10:00 - 15:00.</li>
        <li >
          <div class="support-icons">
                <span>
                <Icon
                    icon="MailIcon"
                    :width="1.5"
                    :height="1.5"
                    :strokeWidth="0.6"
                    :color="colors.black"
                />
              support@sdfe.dk
              </span>
            <span>
              <Icon
                  icon="PhoneIcon"
                  :width="1.5"
                  :height="1.5"
                  :strokeWidth="0.3"
                  :color="colors.black"
              />
              TLF. 7876 8792
              </span>
          </div>
        </li>
      </ul>
    </section>
    <div class="download-section">
      <div class="resolution" :class="{ expanded: toggleRes }">
        <ul  v-if="toggleRes" class="resolution-selection cursor-point" @click="toggleRes = !toggleRes">
          <li class="paragraph_lille" @click="setResolution('1000')">1000x{{ parseInt(1000 * imageData.height / imageData.width) + 'px' }}</li>
          <li class="paragraph_lille" @click="setResolution('2000')">2000x{{ parseInt(2000 * imageData.height / imageData.width) + 'px'  }}</li>
          <li class="paragraph_lille" @click="setResolution('3000')">3000x{{ parseInt(3000 * imageData.height / imageData.width) + 'px'  }}</li>
          <li class="paragraph_lille" @click="setResolution('4000')">4000x{{ parseInt(4000 * imageData.height / imageData.width) + 'px'  }}</li>
          <li class="paragraph_lille" @click="setResolution('original')">{{ imageData.width + 'x' + imageData.height }}px (Original)</li>
        </ul>
        <button @click="toggleRes = !toggleRes" class="resolution-button cursor-point">
                <span class="center-align">
                  <h5>Størrelse: {{ printResolution }}</h5>
                  <Icon
                      icon="MoreIcon"
                      :width="1.8"
                      :height="1.8"
                      :color="colors.black"
                      :strokeWidth="0.6"
                      :style="{ 'transform': (toggleRes? 'translateY(-6px) rotate(90deg)' : 'translateY(-6px) rotate(-90deg)') }"
                  />
                </span>
        </button>
      </div>
      <transition name="fade">
        <ErrorMessage class="error-message" v-if="showErrorMessage" :errorMessage="errorMessage"/>
      </transition>
      <section class="download">
        <button class="download-button cursor-point" @click="downloadImage">
              <span class="center-align">
                <h5>{{ downloadText }}</h5>
                <Icon
                    icon="DownloadIcon"
                    :width="1.5"
                    :height="1.5"
                    :strokeWidth="1"
                    :color="colors.black"
                    :style="'transform: translateY(-4px)'"
                />
              </span>
        </button>
      </section>
    </div>
  </article>
</template>

<script>
import ErrorMessage from '@/components/mapImageViewer/ErrorMessage'
import { inject, ref } from 'vue'

export default {
  name: 'MapMetaData',
  components: { ErrorMessage },
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
    rightsAccepted: {
      type: Boolean
    },
    imageData: {
      type: Object
    }
  },
  setup (props) {
    const colors = inject('themeColors')
    const toggleMetaData = ref(true)
    const toggleReportError = ref(false)
    const toggleRes = ref(false)
    const resolution = ref('max')
    const printResolution = ref('original')
    const showErrorMessage = ref(false)
    const errorMessage = ref('')
    const download = ref(false)
    const downloadText = ref('Download')
    const imageSizes = ref({
      small: 1000,
      medium: 2000,
      large: 3000,
      xlarge: 4000
    })
    const setResolution = (res) => {
      if (res === 'original') {
        resolution.value = 'max'
      } else {
        resolution.value = res + ','
      }
      printResolution.value = res
    }
    const enableShowError = (message) => {
      showErrorMessage.value = true
      errorMessage.value = message
      // eslint-disable-next-line no-return-assign
      setTimeout(() => showErrorMessage.value = false, 6000)
    }
    const downloadImage = async () => {
      if (props.metaData.arketype === 'soekort' && props.rightsAccepted === false) {
        enableShowError('Du har ikke accepteret rettighederne for Søkort')
      } else {
        download.value = true
        downloadText.value = 'Downloader'
        props.imageFile.forEach((e) => {
          fetch(e + '/full/' + resolution.value + '/0/default.jpg?token=147df2cc622086861a8ca994809a1ace').then((response) => {
            if (response.status >= 400 && response.status < 600) {
              downloadText.value = 'Download'
              enableShowError('Bad response from server')
              throw new Error('Bad response from server')
            }
            if (!response.ok) {
              downloadText.value = 'Download'
              enableShowError(`HTTP error! status: ${response.status}`)
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.blob()
          }).then(returnedResponse => {
            const objectURL = URL.createObjectURL(returnedResponse)
            const link = document.createElement('a')
            link.href = objectURL
            if (link.href) {
              downloadText.value = 'Download'
            }
            link.download = props.metaData.titel
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }).catch((error) => {
            downloadText.value = 'Download'
            enableShowError(error)
          })
        })
      }
    }
    return {
      colors,
      imageSizes,
      downloadText,
      resolution,
      printResolution,
      download,
      showErrorMessage,
      errorMessage,
      toggleMetaData,
      toggleReportError,
      toggleRes,
      setResolution,
      enableShowError,
      downloadImage
    }
  }
}
</script>

<style scoped>
.error-message {
  position: absolute;
  right: 0;
  transform: translateY(-100%);
  width: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.inline {
  display:inline-flex;
}
h3 {
  margin: 4vh 1vw 1vh 1vw;
}
.meta-data-box {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 20%;
  min-width: 350px;
}
.meta-data {
  max-height: 85%;
  padding: 0;
  margin: 0;
  overflow: auto;
}
.data-title {
  background-color: var(--darkSteel);
  width: 100%;
  padding: 1vh 1vw 0 1vw;
  border-bottom: 1px solid var(--darkTurquoise);
  color: var(--darkSteel);
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
.download-section {
  position: absolute;
  bottom: 0;
  margin: 0;
  height: 50px;
  width: 20%;
  min-width: 350px;
  display: inline-flex;
  border: 0;
  border-radius: 0 0 22px 0;
}
.resolution {
  border-right: 1px solid var(--darkTurquoise);
  width: 63%;
  overflow: hidden;
  height: fit-content;
  background-color: var(--action);
}
.resolution ul {
  padding: 0;
  margin: 0;
  border: 0;
  position:absolute;
  top: 0;
  transform: translateY(-100%);
  width: 62.9%;
  border-radius: 15px 15px 0 0;
}
.resolution li {
  background-color: var(--white);
  color: var(--darkTurquoise3)
}
.resolution li:hover {
  background-color: var(--mediumSteel);
}
.resolution-button {
  border: 0;
  padding: 0.7vh 0 0 1vw;
  height: 50px;
  width: 100%;
  text-align: left;
}
.download {
  width: 37%;
  min-width: 120px;
  background-color: var(--action);
  border-radius: 0 0 22px 0;
  overflow: hidden;
  border-left: 1px solid var(--darkTurquoise);
}
.download-button {
  border: 0;
  padding-top: 0.7vh;
  width: 101%;
  height: 100%;
}
.center-align {
  margin: auto auto auto 0;
  display: inline-flex;
  padding: 0;
}
.rights-soekort li {
  border: none;
  margin: 0 0.5rem 0.5rem 0;
}
.rights-soekort ol {
  margin: 0 1vw 0 1vw;
  padding: 0;
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
