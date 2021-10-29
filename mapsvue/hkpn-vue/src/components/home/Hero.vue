<template>
  <section class="layout-3col_footer"
  :style="'background-image: linear-gradient(90deg, rgba(28, 36, 0, 0.6), transparent), linear-gradient(180deg, rgba(36, 46, 0, 0.6) 24%, transparent), url(' + image +');'">
    <article>
      <h1>
        {{ hero.title }}
      </h1>
      <p>
        {{ hero.description }}
      </p>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  created () {
    this.$store.dispatch('Hero/clear')
    this.$store.dispatch('Hero/get').then(() => {
      this.hero = this.$store.state.Hero.data
    })
  },
  data () {
    return {
      hero: []
    }
  },

  computed: {
    image () {
      const data = this.$store.state.Hero.data
      return data ? ('https://hkcms.dataforsyningen.dk' + data.imagePath) : ''
    }
  }
}
</script>

<style scoped>
section {
  padding: 0 5vw;
  margin: 0;
  display: flex;
  min-height: fit-content;
  background-repeat: no-repeat;
  background-size: 112%;
  background-color: var(--darkTurquoise2);
  background-position-y: 20%;
  background-position-x: 45%;
}

article {
  margin-top: calc(2rem + 1rem + 4rem);
  margin-left: 1rem;
  padding: 5vw 0 5vw 0;
  display: flex;
  flex-direction: column;
  max-width: 45rem;
  min-width: 15rem;
}

h1 {
  color: var(--white);
}

p {
  margin-top: 0;
  color: var(--white);
}
</style>
