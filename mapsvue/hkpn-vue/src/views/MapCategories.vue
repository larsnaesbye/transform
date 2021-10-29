<template>
  <Hero />
  <section>
    <div>CMS Data</div>
    <ul>
      <li v-for="data in collectionData"
          :key="data.id">
        {{ data }}
      </li>
    </ul>
  </section>
</template>

<script>
import Hero from '@/components/apps/Hero'

export default {
  name: 'Apps',
  components: { Hero },
  data () {
    return {
      collectionData: []
    }
  },

  methods: {
    loadCMSData () {
      fetch('https://test3.dataforsyningen.dk/api/collections/get/infoboks?token=88d5ffd8e74f40fbdd4b255ad4902b')
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((data) => {
          const collectionData = []
          for (const id in data) {
            collectionData.push({
              id: id
            })
          }
          this.collectionData = collectionData
        })
    }
  },
  mounted () {
    this.loadCMSData()
  }
}

</script>

<style scoped>
section {
  padding: 1rem 5rem 1rem 5rem;
}
</style>
