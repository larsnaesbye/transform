<template>
  <main>
    <Hero
      :title="title"
      :summary="summary"
      :image="coverImageUrl"
    >
      <div class="hero-links">
        <a v-for="partner in partnerlinks" :href="partner.url" target="_blank" rel="noopener" :key="partner.url">{{ partner.label }}</a>
      </div>
    </Hero>
    <section
      class="content-section layout-6col"
    >
      <LinkBox
        v-for="box in linkBoxes"
        :key="box.linkTitle"
        :internal-link="box.internalLink"
        :link="box.link"
        :link-title="box.linkTitle"
        :imageUrl="box.imageUrl"
        :title="box.title"
        :summary="box.summary"
      />
    </section>
    <section class="content-section layout-1col"
    >
      <h3>Andre sider med klima-, energi-, og forsyningsdata</h3>
      <UiHorizontalScroller :scrollAmount="45">
        <div class="webkit-box-container">
          <ExtLinkBox
            v-for="(box, index) in extLinkBoxes"
            :key="index"
            :link="box.link"
            :title="box.title"
            :summary="box.summary"
          />
        </div>
        <template v-slot:button-scroll-left>
          <Icon icon="PrevIcon" border :backgroundColor="$themeColors.white" class="opacity75"/>
        </template>
        <template v-slot:button-scroll-right>
          <Icon icon="NextIcon" border :backgroundColor="$themeColors.white" class="opacity75"/>
        </template>
      </UiHorizontalScroller>
    </section>
  </main>
</template>

<script>
import { pageMeta } from '@/MetaData'
import { getAssetLink, loadImage } from '@/HelperFunctions'

export default {
  name: 'Home',
  components: {
    Hero: () => import('@/components/shared/Hero'),
    UiHorizontalScroller: () => import('@/components/shared/baseUi/UiHorizontalScroller'),
    LinkBox: () => import('@/components/home/LinkBox'),
    ExtLinkBox: () => import('@/components/home/ExtLinkBox')
  },
  data () {
    return {
      coverImageUrl: '',
      linkBoxes: [
        {
          link: '/dataoversigt',
          linkTitle: 'Se vores datasæt',
          imageUrl: '',
          title: 'Se vores datasæt',
          summary: 'Hent data og informationer om datas oprindelse, opdateringsfrekvens og hvordan data kan anvendes.'
        },
        {
          link: '/om',
          linkTitle: 'Om forsyningsdata',
          imageUrl: '',
          title: 'Læs mere om data og hvem der står bag forsyningsdataportal.dk',
          summary: 'Læs mere om forsyningsdata og historien bag en samlet indgang til data.'
        },
        {
          link: '/vejledning',
          linkTitle: 'Hjælp og vejledning',
          imageUrl: '',
          title: 'Få hjælp til at hente data',
          summary: 'Hent brugervejledning og teknisk information.'
        }
      ],
      extLinkBoxes: [
        {
          title: 'EnergiDataPortal',
          summary: 'Indgang til alle services og spørgsmål relateret til åbne data hos Energinet.',
          link: 'https://energidataportal.dk/'
        },
        {
          title: 'Services hos Energistyrelsen',
          summary: 'Indgang til alle services relateret til bl.a. data og analyser hos Energistyrelsen.',
          link: 'https://ens.dk/service'
        },
        {
          title: 'Spar Energi',
          summary: 'Energistyrelsens side om energi. Her finder du gode råd om el, varme og energirigtige løsninger.',
          link: 'https://sparenergi.dk/'
        },
        {
          title: 'GEUS',
          summary: 'Datacenter for De Nationale Geologiske Undersøgelser for Danmark og Grønland (GEUS) kan tilgås her.',
          link: 'https://geus.dk'
        },
        {
          title: 'Danmarks Statistik',
          summary: 'En samlet indgang til statistik om Danmark',
          link: 'https://www.dst.dk'
        }
      ]
    }
  },
  computed: {
    pageAssets () {
      return this.$store.state.HomeAssets.data
    },
    title () {
      return pageMeta.forside.title
    },
    summary () {
      return pageMeta.forside.summary
    },
    partnerlinks () {
      return pageMeta.forside.partnerLinks
    }
  },
  methods: {},
  mounted () {
    this.$nextTick(() => {
      const linkBoxAssetsIds = [1725, 1719, 1717]
      const coverImageId = pageMeta.forside.coverId
      const ids = [coverImageId, ...linkBoxAssetsIds]

      this.$store.dispatch('HomeAssets/get', ids).then(() => {
        linkBoxAssetsIds.forEach((id, i) => {
          const url = getAssetLink(id, this.pageAssets)
          loadImage(url).then(() => {
            this.linkBoxes[i].imageUrl = url
          })
        })
        const coverUrl = getAssetLink(coverImageId, this.pageAssets)
        loadImage(coverUrl).then(() => {
          this.coverImageUrl = coverUrl
        })
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
.hero-links
  display flex
  flex-wrap wrap

.hero-links > a
  color white
  margin-right 1rem
  white-space nowrap
  font-weight bolder

.bottom-ruler
  border-bottom 2px solid var(--darkSteel)
</style>
