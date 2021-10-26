<template>
  <main>
    <Hero
      title="Denne side er ikke optimeret til internet explorer"
      summary="For at kunne benytte den nyeste webteknologi har vi valgt ikke at understøtte Internet Explorer. Du kan til gengæld bruge Chrome, Firefox, Safari mv."
    />
  </main>
</template>

<script>
import Hero from '@/components/shared/Hero'
export default {
  components: {
    Hero
  },
  data () {
    return {
      coverImageUrl: ''
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>

</style>
