<template>
  <article class="layout-6col">
    <li class=" cursor-point"
        v-for="infobox in filteredBoxes"
        :key="infobox.id"
        :title="infobox.title"
        :imagePath="infobox.imagePath"
        :description="infobox.description"
        :arketypeID="infobox.arketypeID">
      <section class="linkBoxes" @click="setChosenArketype(infobox.arketypeID)">
        <img :src="'https://hkcms.dataforsyningen.dk' + infobox.imagePath">
        <header>
          <h3> {{ infobox.title }}</h3>
        </header>
        <p> {{ infobox.description }}</p>
      </section>
    </li>
  </article>
</template>

<script>
import { computed, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { sendFilterData } from '@/HelperFunctions'

export default {
  name: 'Infoboxes',
  props: {
    mapgroups: {
      type: Array,
      default () {
        return []
      }
    }
  },

  setup (props) {
    const store = useStore()
    const router = useRouter()
    const filters = inject('providedFilters')
    const setChosenArketype = (chosenArketype) => {
      sendFilterData(Object.assign(filters.value.resultsTags, {
        arketype: chosenArketype
      }), store, router)
    }
    const filteredBoxes = computed(() => {
      const byPriority = props.mapgroups.slice(0)
      byPriority.sort(function (a, b) {
        return a.priority - b.priority
      })
      return byPriority
    })
    return {
      setChosenArketype,
      filteredBoxes
    }
  }
}
</script>

<style scoped>
article {
  padding: 3.5vh 3.5vw;
}

section.linkBoxes {
  min-width: 15rem;
  max-width: 23rem;
  min-height: 20rem;
  max-height: 28rem;
  width: auto;
  margin: 0;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: content-box;
  border: 4px solid var(--darkSteel);
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  height: 100%;
  -webkit-transition: all 300ms linear;
  -moz-transition: all 300ms linear;
  -o-transition: all 300ms linear;
  transition: all 300ms linear;
}

section:hover {
  box-shadow: 14px 14px 28px rgba(0,0,50,0.15), 10px 10px 10px rgba(0,0,50,0.10);
  -webkit-transform: scale(1.01);
  -moz-transform: scale(1.01);
  -o-transform: scale(1.01);
  transform: scale(1.01);
}

header {
  display: flex;
  flex-direction: row;
  padding: 1rem 1rem 0 1rem;
}

img {
  height: 15vh;
  min-height: 125px;
  object-fit: cover;
}

h3 {
  color: var(--black2)
}

p {
  padding: 0 1rem;
}

li {
  list-style-type: none;
}
</style>
