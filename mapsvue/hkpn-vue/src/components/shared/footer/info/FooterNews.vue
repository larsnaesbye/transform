<template>
  <article>
    <h6 class="h6_caption">Nyheder</h6>
    <a :href="news.link" class="row" v-for="article in news" :key="article.link">
      <Icon
          icon="BeskedIcon"
          :width="3"
          :height="3"
          :strokeWidth="1"
          :color="colors.turquoise"
      />
      <div class="row-content-wrapper">
        <div class="row-content">
          <h5 class="turquoise">{{ article.title }}</h5>
          <p>{{ article.summary }}</p>
        </div>
        <div class="row-footer">
          <p class="row-footer__date paragraph_lille">{{ article.date }}</p>

          <Icon
              icon="ExpandIcon"
              :width="2"
              :height="2"
              :strokeWidth="1"
              :color="colors.black"
          />
        </div>
      </div>
    </a>
  </article>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'FooterNews',

  setup () {
    const colors = inject('themeColors')
    return {
      colors
    }
  },

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
  }
}
</script>

<style scoped>

.row {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--darkSteel);
  margin-bottom: 1rem;
}

.row-content-wrapper {
  padding: 0 1rem;
  width: 100%;
}

.row-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.row-footer > *:last-child {
  margin-left: auto;
}

.row-footer__date {
  font-style: italic
}

h6 {
  padding-left: 1rem;
  border-bottom: 1px solid var(--darkSteel);
  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;
}

section {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
}

.turquoise {
  color: var(--turquoise)
}
</style>
