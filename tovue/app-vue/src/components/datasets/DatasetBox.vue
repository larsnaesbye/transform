<template>
  <article
    class="box__large position-relative cursor-point"
    :class="{ active: isActive }"
    :title="'Datasæt for ' + title"
    tabindex="0"
    @keydown.enter="$router.push(link)"
    @mouseover.stop.prevent="isActive = true, isClickable = true"
    @mouseleave.stop.prevent="isActive = false"
  >
    <router-link
      :to="link"
      :event="isClickable ? 'click' : ''"
      tabindex="-1"
    >
      <div
        class="cover-image-container"
        :style="'background-image: linear-gradient(90deg, rgba(28, 36, 0, 0.6), transparent), linear-gradient(180deg, rgba(36, 46, 0, 0.6) 24%, transparent)'"
      >
        <img
          v-if="image > 0"
          :src="imageUrl"
          decoding="async"
          loading="lazy"
          :alt="`Coverbillede for ${title}`"
        />
        <div class="logo-tags" v-if="logosWithLinks[0]">
          <span
            class="logo-tag"
            v-for="logo in logosWithLinks"
            :key="`${logo.label}-${logo.link}-${id}`"
          >
            <img
              :src="logo.link"
              decoding="async"
              loading="lazy"
              :title="logo.label"
              :alt="`Log for ${logo.label}`"
            />
          </span>
        </div>
      </div>
      <header>
        <Icon
          icon="DatasetIcon"
          :height="3"
          :width="3"
          class="dataset-icon"
          color="white"
        />
        <h5
          class="hyphenate"
        >
          {{ title }}
        </h5>
      </header>
      <section
        class="description"
      >
        <p
          class="paragraph_lille"
        >
          {{ summary }}
        </p>
      </section>
      <section
        v-if="views[0]"
        class="tags"
        @mousemove.stop.prevent="isActive = false, isClickable = false"
      >
        <h6
          class="h6_captionneutral"
        >
          Visninger
        </h6>
        <div
          class="tag-wrapper"
          ref="viewtag"
        >
          <DataviewTag
            v-for="view in views" :key="view.label"
            :type="view.type"
            :label="view.label"
            ref="views"
            class="viewtag"
            @clicked="$router.push(`/data/${id}/visning/${getViewRoute(view.type)}`)"
          >
          </DataviewTag>
        </div>
      </section>
      <section
        v-if="shownDownloads[0]"
        class="tags"
        @mousemove.stop.prevent="isActive = false, isClickable = false"
      >
        <h6
          class="h6_captionneutral"
        >
          Downloads
        </h6>
        <div
          class="tag-wrapper"
        >
          <FormatTag
            v-for="(entry, index) in shownDownloads"
            :key="id + '.' + index"
            :typeId="entry.typeId"
            :amount="1"
            :serviceTypes="downloadTypeList"
            class="tags cursor-point"
            @clicked="openDownloadDialog(entry)"
          />
        </div>
      </section>
      <section
        v-if="shownServices[0]"
        class="tags"
        @mousemove.stop.prevent="isActive = false, isClickable = false"
      >
        <h6
          class="h6_captionneutral"
        >
          Webservice
        </h6>
        <div
          class="tag-wrapper"
        >
          <FormatTag
            v-for="entry in shownServices"
            :key="id + '-' + entry.typeId"
            :typeId="entry.typeId"
            :amount="entry.entries.length"
            :serviceTypes="serviceTypeList"
            class="tags cursor-point"
            @clicked="openServiceDialog(entry)"
          />
        </div>
      </section>
      <footer
        class="dataset-box__footer"
      >
        <router-link
          :to="link"
          class="read-more buttonmaster primary"
          :aria-label="`Åbn dataside for ${title}`"
        >
          <span>Åbn dataside</span>
        </router-link>
      </footer>
    </router-link>
    <span v-if="imageUrl" class="dataset-box__credit white-text">{{ photoCredit }}</span>
    <Dialog
      v-if="downloadCsvDialog"
      :title="selectedDownload.typeLabel"
      :color="selectedDownload.typeColor"
      :backgroundColor="selectedDownload.typeBackgroundColor"
      @close="closeDialog"
    >

      <UiExpandBoxSection
        :color="selectedDownload.typeColor"
        v-if="downloading"
      >
        <UiLoader
          :color="selectedDownload.typeColor"
        />
        <span v-if="downloading">Downloader...</span>
      </UiExpandBoxSection>
      <UiExpandBoxSection
        :color="selectedDownload.typeColor"
        v-if="!downloading"
      >
        <p>Du kan downloade datasættet som CSV i to forskellige udgaver. Som hele datasættet i en tilpasset udgave eller som uformateret rådata (kræver <a href="https://dataforsyningen.dk/?show=login" target="_blank">login</a>).</p>
      </UiExpandBoxSection>
      <footer
        class="dialog-footer"
        v-if="!downloading"
      >
        <button
          @click="closeDialog"
          class="buttonmaster cursor-point"
        >
          <span>Annullér</span>
        </button>
        <button
          @click="downloadInFormat(selectedDownload)"
          class="buttonmaster cursor-point white-text"
          :style="`background-color: ${selectedDownload.typeColor}`"
        >
          <span>Download hele datasættet</span>
        </button>
        <button
          @click="linkTo(selectedDownload.folder)"
          class="buttonmaster cursor-point white-text"
          :style="`background-color: ${selectedDownload.typeColor}`"
        >
          <span>Download rådata</span>
        </button>
      </footer>
    </Dialog>
    <Dialog
      v-if="downloadOtherDialog"
      :title="selectedDownload.typeLabel"
      :color="selectedDownload.typeColor"
      :backgroundColor="selectedDownload.typeBackgroundColor"
      @close="closeDialog"
    >
      <UiExpandBoxSection
        :color="selectedDownload.typeColor"
      >
        <p>Download af filen kræver <a href="https://dataforsyningen.dk/?show=login" target="_blank">login</a></p>
      </UiExpandBoxSection>
      <footer
        class="dialog-footer"
      >
        <button
          @click="closeDialog"
          class="buttonmaster cursor-point"
        >
          <span>Annullér</span>
        </button>
        <button
          @click="linkTo(selectedDownload.folder)"
          class="buttonmaster cursor-point white-text"
          :style="`background-color: ${selectedDownload.typeColor}`"
        >
          <span>Download</span>
        </button>
      </footer>
    </Dialog>
    <Dialog
      v-if="serviceDialog"
      @close="closeDialog"
      :title="selectedService.typeLabel"
      :color="selectedService.typeColor"
      :backgroundColor="selectedService.typeBackgroundColor"
    >
      <UiExpandBoxSection
        :color="selectedService.typeColor"
      >
        <p>Adgang til tjenesten kræver <a href="https://dataforsyningen.dk/?show=login" target="_blank">login</a>. Du kan finde hjælp i <a href="https://forsyningsdataportal.dk/vejledning">vejledningen</a>.</p>
      </UiExpandBoxSection>
      <UiExpandBoxSection
        :color="selectedService.typeColor"
        v-for="entry in selectedService.entries"
        :key="entry.id"
      >
        <h4>{{ entry.title }} ({{ entry.name }})</h4>
        <p class="description paragraph_lille">{{ entry.description }}</p>
        <UiCopyLink
          :link="entry.link"
        />
      </UiExpandBoxSection>
      <footer
        class="dialog-footer"
      >
        <button
          @click="closeDialog()"
          class="buttonmaster cursor-point white-text"
          :style="`background-color: ${selectedService.typeColor}`"
        >
          <span>Luk</span>
        </button>
      </footer>
    </Dialog>
  </article>
</template>

<script>
import { download, dataToCsvString } from '@/HelperFunctions'
import FormatTag from '@/components/shared/FormatTag'
import DataviewTag from '@/components/shared/DataviewTag'
import Dialog from '@/components/shared/baseUi/UiDialog'
import UiExpandBoxSection from '../shared/baseUi/UiExpandBoxSection.vue'
import UiCopyLink from '@/components/shared/baseUi/UiCopyLink'
import UiLoader from '@/components/shared/baseUi/UiLoader'

export default {
  name: 'LinkBox',
  components: {
    FormatTag,
    DataviewTag,
    Dialog,
    UiExpandBoxSection,
    UiCopyLink,
    UiLoader
  },
  props: {
    link: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: -1
    },
    image: {
      type: Number,
      default: -1
    },
    photoCredit: {
      type: String,
      default: 'Foto: Lars Schmidt / schmidtaps.com'
    },
    logos: {
      type: Array,
      defaul: []
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    views: {
      type: Array,
      default () {
        return [{ label: 'tabel', id: 1 }]
      }
    },
    downloads: {
      type: Array,
      default () {
        return []
      }
    },
    services: {
      type: Array,
      default () {
        return []
      }
    },
    csvColumns: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isActive: false,
      isClickable: false,
      shownServicesNum: 4,
      downloadFormats: [],
      activeTooltip: '',
      downloadTypes: [{
        backgroundColor: '#f9edee',
        categoryId: 30,
        color: '#c54d59',
        id: 30,
        list: null,
        priority: 100,
        title: 'CSV'
      }],
      selectedDownload: {},
      downloading: false,
      selectedService: {},
      downloadCsvDialog: false,
      downloadOtherDialog: false,
      serviceDialog: false
    }
  },
  computed: {
    imageUrl () {
      return this.getAssetLink(this.image)
    },
    logosWithLinks () {
      const lgs = this.logos
      const arr = []
      for (let i = 0; i < lgs.length; ++i) {
        arr[i] = {
          link: this.getAssetLink(lgs[i].logoId),
          label: lgs[i].label
        }
      }
      return arr
    },
    shownDownloads () {
      if (this.downloads && this.downloads[0] && this.downloadTypeList && this.serviceTypeList) {
        const downloads = []
        this.downloads.forEach((service) => {
          const serviceObj = service
          const formatInfo = this.getFormatInfo(service.formatIds)
          serviceObj.typeId = service.formatIds
          serviceObj.typeLabel = formatInfo.title
          serviceObj.typeColor = formatInfo.color
          serviceObj.typeBackgroundColor = formatInfo.backgroundColor
          downloads.push(serviceObj)
        })
        return downloads
      } else {
        return []
      }
    },
    shownServices () {
      if (this.services && this.services[0] && this.downloadTypeList && this.serviceTypeList) {
        const services = []
        this.services.forEach((service) => {
          const serviceObj = {}
          serviceObj.entries = []
          if (service.ids[0]) {
            service.ids.forEach(id => {
              serviceObj.entries.push(this.findService(id))
            })
          }
          const formatInfo = this.getFormatInfo(service.typeId)
          serviceObj.typeId = service.typeId
          serviceObj.typeLabel = formatInfo.title
          serviceObj.typeColor = formatInfo.color
          serviceObj.typeBackgroundColor = formatInfo.backgroundColor
          services.push(serviceObj)
        })
        return services
      } else {
        return []
      }
    },
    serviceTypeList () {
      return this.$store.state.DatasetsAttributes.data[1] ? this.$store.state.DatasetsAttributes.data[1].list : []
    },
    downloadTypeList () {
      return this.$store.state.DatasetsAttributes.data[0] ? this.$store.state.DatasetsAttributes.data[0].list : []
    }
  },
  created () {},
  mounted () {},
  methods: {
    openDownloadDialog (entry) {
      this.selectedDownload = entry
      if (entry.typeId === 63) {
        this.downloadCsvDialog = true
      } else {
        this.downloadOtherDialog = true
      }
    },
    openServiceDialog (entry) {
      this.selectedService = entry
      this.serviceDialog = true
    },
    closeDialog () {
      this.selectedService = {}
      this.selectedDownload = {}
      this.downloadCsvDialog = false
      this.downloadOtherDialog = false
      this.serviceDialog = false
    },
    downloadInFormat (downloadInfo) {
      // if (downloadInfo.typeId === 63) {
      //   this.downloading = true
      //   this.downloadCSV().then(() => {
      //     this.downloadDialog = false
      //     this.downloading = false
      //   })
      // } else {
        const url = window.location.origin + '/' + downloadInfo.folder.trim() + downloadInfo.file.trim()
        const a = document.createElement('a')
        a.href = url
        a.setAttribute('download', this.title)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      // }
    },
    downloadCSV () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('DatasetData/get', {
          id: this.id,
          views: ['table'],
          filter: null
        }).then(resp => {
          const data = this.$store.state.DatasetData.data.table
          const csv = dataToCsvString(this.csvColumns, data)
          download(csv, this.title + '.csv', 'text/csv;encoding:utf-8')
          resolve()
        })
      })
    },
    linkTo (url) {
      window.open(url, '_blank')
    },
    getAssetLink (id) {
      const img = this.$store.state.DatasetsAssets.data.find((e) => {
        return id === e.id
      })
      return img ? (window.location.origin + '/asset' + img.path + img.filename) : ''
    },
    findService (id) {
      return this.$store.state.DatasetsServices.data.find(service => service.id === id)
    },
    getFormatInfo (id) {
      const allFormats = [...this.downloadTypeList, ...this.serviceTypeList]
      const infoItem = allFormats.find(item => item.id === id)
      return infoItem
    },
    getViewRoute (type) {
      const routes = {
        table: 'data',
        map: 'kort',
        dashboard: 'dashboard'
      }
      return routes[type]
    }
  }
}
</script>

<style lang="stylus" scoped>
article > a
  display flex
  flex-direction column
  width 100%
  height 100%
  &:hover
    text-decoration none

article > a:hover .read-more
  background-color: var(--action)

.cover-image-container
  height 15vh
  min-height 15vh

.cover-image-container > img
  height 15vh
  min-height 15vh
  object-fit cover
  object-position bottom
  width 100%

header
  display flex
  flex-direction row
  padding 1rem 1rem 0 1rem
  align-items center

.dataset-icon
  flex-shrink 0

h5
  margin-bottom 0
  margin-left 1rem
  align-self center

header p
  margin-top 0
  padding 0 1rem

section.description
  padding 0 1rem
  display flex
  flex-direction column
  margin-bottom auto

section.tags
  background-color var(--background)
  border-top 1px solid var(--darkSteel)
  margin-top 0.5rem
  padding 0.5rem 1rem 0.7rem
  display flex
  flex-direction column
  cursor default
  margin-top 0

section:last-of-type
  border-bottom 1px solid var(--darkSteel)

.tag-wrapper
  display flex
  flex-direction row

.dataset-box__footer
  align-self flex-end
  display flex
  flex-direction row
  justify-content center
  align-items center
  width 100%
  padding 1rem

.dataset-box__footer a
  max-width max-content

.read-more
  transition all 200ms ease

.logo-tags
  position absolute
  bottom 0.5rem
  left 0.5rem

.logo-tag
  background-color #FFF
  border-radius 0.4rem
  padding 0.8rem
  display: inline-flex
  margin 0.5rem 0.5rem 0 0

.cover-image-container
  position relative

.logo-tag img
  height 25px
  min-height 25px
  object-fit contain

.link-input
  width 100%
  margin 1rem 0

.dialog-footer
  align-self flex-end
  display flex
  justify-content flex-end
  padding 1rem
  & button
    margin-left .5rem

.dataset-box__credit
  position absolute
  right: .5rem
  top .5rem
  color white
  font-size .8rem
  opacity .6

.viewtag
  cursor pointer
</style>
