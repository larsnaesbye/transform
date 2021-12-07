<template>
  <main>
    <section class="content-section layout-1col"
    >
    <p v-html="htmlText"></p>
    </section>
  </main>
</template>

<script>
import { pageMeta } from '@/MetaData'
import { getAssetLink, loadImage } from '@/HelperFunctions'

export default {
  components: {
  },
  data () {
    return {
      coverImageUrl: ''
    }
  },
  computed: {
    pageAssets () {
      return this.$store.state.AboutAssets.data
    },
    htmlText () {
      return ''
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>

</style>
