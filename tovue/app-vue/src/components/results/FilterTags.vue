<template>
  <div>
    <h6>{{ resultsTotal }} RESULTATOR FOR</h6>
  </div>
  <section
      class="active-filters"
  >
    <div
      @click="removeTag(tag)"
      v-for="tag in filteredResultsTags"
     :key="tag"
    >
      <h6>{{ tag }}</h6>
      <span>
        <Icon
          icon="CloseIcon"
          :width="1.4"
          :height="1.4"
          :strokeWidth="1"
        />
      </span>
    </div>
  </section>
</template>

<script>
import { inject } from 'vue'
import { sendFilterData } from '@/HelperFunctions'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'FilterTags',
  props: {
    resultsTotal: {
      type: Number
    },
    filteredResultsTags: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const colors = inject('themeColors')
    const filters = inject('providedFilters')
    const getKeyByValue = (value) => {
      return Object.keys(filters.value.resultsTags).find((key) => {
        const curItem = filters.value.resultsTags[key]
        if (Array.isArray(curItem)) {
          return curItem.includes(value)
        } else {
          return curItem === value
        }
      })
    }
    const removeTag = (tag) => {
      let temp = filters.value.resultsTags
      const key = getKeyByValue(tag)
      if (Array.isArray(temp[key])) {
        const remove = temp[key].indexOf(tag)
        temp[key].splice(remove, 1)
        temp = temp[key]
        sendFilterData(Object.assign(filters.value.resultsTags, {
          [key]: temp
        }), store, router)
      } else if (typeof tag === 'number') {
        sendFilterData(Object.assign(filters.value.resultsTags, {
          [key]: -1
        }), store, router)
      } else if (typeof tag === 'string') {
        sendFilterData(Object.assign(filters.value.resultsTags, {
          [key]: ''
        }), store, router)
      }
      if (Object.values(filters.value.resultsTags).every((currentVal) => {
        return !((Array.isArray(currentVal) || (typeof currentVal === 'string')) ? (currentVal.length) : (currentVal !== -1)) // test for number first
      })) {
        window.location.search = ''
      }
    }
    return {
      colors,
      removeTag
    }
  }
}
</script>

<style scoped>
.active-filters {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
div {
  border-radius: 15px;
  margin: 5px 5px 5px 0;
  display: inline-flex;
  height: max-content;
  width: fit-content;
}
.active-filters div {
  background-color: var(--action2);
  border: 1px solid var(--darkSteel);
  padding: 2px 5px 2px 10px;
}

.active-filters h6 {
  color: var(--white);
  margin: 2px;
  padding-top: 2px;
}
h6 {
  padding-top: 0.5vh;
  color: var(--darkSteel2);
  white-space: nowrap;
  word-break: keep-all;
  flex-shrink: 0;
}
</style>
