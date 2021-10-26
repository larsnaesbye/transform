<template>
  <main>
    <Hero
      title="Hjælp og vejledning"
      summary="Her kan du finde vejledninger og baggrundsviden om forsyningsdata samt kontaktoplysninger til support."
      :image="coverImageUrl"
    />
    <section class="content-section layout-sidebar">
      <div class="main-content">
        <h2>Brugerrettet dokumentation – vejledninger</h2>
        <ul>
          <li><a :href="udstillingsmetoderSupportPdfUrl" target="_blank">Oversigt over udstillingsmetoder</a></li>
          <li><a :href="csvSupportPdfUrl" target="_blank">Sådan åbnes den downloadede csv-fil med korrekt formatering i excel</a></li>
        </ul>
        <h2>Teknisk dokumentation</h2>
        <ul>
          <li><a :href="vejledningWMSQGISPdfUrl" target="_blank">Vejledning WMS QGIS</a></li>
          <li><a href="https://docs.kortforsyningen.dk/#forsyningsdata" target="_blank">Dokumentation REST services</a></li>
        </ul>
      </div>
      <div class="sidebar">
        <h6>Support</h6>
        <div class="contact-section">
          <div class="icon">
            <Icon
              icon="SupportIcon"
              :width="3"
              :height="3"
              :color="'#000'"
              :strokeWidth="1"
            />
          </div>
          <div class="info">
            <h3>Tlf: 78768792</h3>
          </div>
        </div>
        <div class="contact-section">
          <div class="icon">
            <Icon
              icon="MailIcon"
              :width="3"
              :height="3"
              :color="'#000'"
              :strokeWidth="1"
            />
          </div>
          <div class="info">
            <h3>support@sdfe.dk</h3>
          </div>
        </div>
        <div class="contact-section">
          <div class="info">
            <p>Vi har åbent alle hverdage kl. 10:00-15:00. Sender du os en <span style="display: inline-block">e-mail</span>, vil oplysningerne blive registreret i vores centrale, digitale system til videre sagsbehandling</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { pageMeta } from '@/MetaData'

export default {
  components: {
    Hero: () => import('@/components/shared/Hero')
  },
  data () {
    return {

    }
  },
  computed: {
    udstillingsmetoderSupportPdfUrl () {
      return this.getAssetLink(1045)
    },
    csvSupportPdfUrl () {
      return this.getAssetLink(1047)
    },
    vejledningWMSQGISPdfUrl () {
      return this.getAssetLink(2475)
    },
    coverImageUrl () {
      return this.getAssetLink(pageMeta.support.coverId)
    },
    pageAssets () {
      const ids = [1045, 1047, 2475]
      const coverPhoto = pageMeta.support.coverId
      if (coverPhoto) {
        ids.push(String(coverPhoto))
      }
      return ids
    },
    allAssets () {
      return [...this.pageAssets]
    }
  },
  mounted () {
    if (this.allAssets[0]) {
      this.$store.dispatch('SupportAssets/get', [...this.allAssets])
    }
  },
  methods: {
    getAssetLink (id) {
      const img = this.$store.state.SupportAssets.data.find((e) => {
        return id === e.id
      })
      return img ? (window.location.origin + '/asset' + img.path + img.filename) : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.sidebar h6
  margin-bottom 2rem

.contact-section
  display flex
  margin-bottom .5rem

.contact-section .icon
  margin-right .5rem

.contact-section h3
  line-height: 3rem;
</style>
