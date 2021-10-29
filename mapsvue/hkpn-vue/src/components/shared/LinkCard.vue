<template>
  <div class="linkcard">
    <div class="linkcard--icon">
      <Icon
          :icon="icon"
          width="2"
          height="2"
          strokeWidth="0.8"
          :color="colors.turquoise"
      />
    </div>
    <div class="linkcard--main">
      <h2 class="linkcard--header">
        <a :href="headerLink">{{header}}</a>
      </h2>
      <div class="linkcard--description" v-html="description"/>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'LinkCard',
  setup () {
    const colors = inject('themeColors')
    return {
      colors
    }
  },

  props: {
    header: {
      type: String
    },
    headerLink: {
      type: String
    },
    description: {
      type: String
    },
    icon: {
      type: String
    }
  }
}
</script>

<style scoped>
.linkcard {
  display: inline-flex;
  border-bottom: 1px solid var(--darkSteel);
}

.linkcard > * {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.linkcard--header a {
  font-size: 1.1875rem;
  color: var(--black);
}

.linkcard--description {
  margin: 0;
}

.linkcard--main {
  margin-left: 1rem;
}

</style>
