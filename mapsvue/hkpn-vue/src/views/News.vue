<template>
  <Background />
  <article>
    <header class="title">
      <h1>
        Nyheder
      </h1>
      <p>Her vil du kunne læse de seneste nyheder fra historiskekort.dk, hvor vi vil melde ud hvis der kommer nye data eller features på siden.</p>
    </header>
    <section class="row">
      <div class="left-col">
        <li v-for="article in news"
            :key="article.id"
            :title="article.title"
            :date="article.date"
            :summary="article.summary"
            :content="article.content"
        >
          <section class="news">
            <header>
              <span> {{ article.date }}</span>
              <h3> {{ article.title }}</h3>
            </header>
            <p v-html="article.content"></p>
          </section>
        </li>
      </div>
      <div class="right-col dark-background"></div>
    </section>
  </article>
</template>

<script>
import Background from '@/components/shared/HeaderBackground'

export default {
  name: 'News',
  components: { Background },

  created () {
    this.$store.dispatch('News/clear')
    this.$store.dispatch('News/get').then(() => {
      this.news = this.$store.state.News.data
    })
  },

  data () {
    return {
      news: []
    }
  },

  computed: {
    image () {
      const data = this.$store.state.News.data
      return data ? ('https://hkcms.dataforsyningen.dk' + data.images) : ''
    }
  }
}
</script>

<style scoped>
.row {
  margin-left: 5vw;
  display: flex;
}
.left-col {
  margin-right: auto;
  padding-right: 3.5vw;
  padding-bottom: 3.5vh;
  width: 70%;
}
article {
  border-bottom: 1px solid var(--action);
}
.dark-background {
  background-color: var(--background);
}
.right-col {
  padding: 1vw 5vw 1vw 1vw;
  width: 30%;
}
li {
  list-style-type: none;
  padding-top: 3vh;
}
.title {
  border-bottom: 1px solid var(--action);
  padding: 3.5vh 0;
}
.title p {
  margin-left: 5vw;
}
h1 {
  margin-left: 5vw;
}
</style>
