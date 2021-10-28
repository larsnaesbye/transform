<template>
  <section class="results-footer">
    <h6>Resultater pr side</h6>
    <select id="pagesize" name="pagesize" @change="setPageSize($event)">
      <option :value="10">10</option>
      <option :value="25" selected>25</option>
      <option :value="50">50</option>
      <option :value="75">75</option>
      <option :value="100">100</option>
    </select>
    <article class="pagination">
      <button
          v-if="pageCounter != 1"
          class="change-page-button cursor-point"
          @click="changePage('-')">
        <Icon
            icon="MoreIcon"
            :width="2"
            :height="2"
            :color="colors.darkSteel"
            :strokeWidth="0.8"
            :style="'transform: translateY(-4px) translateX(-7px)rotate(-180deg)'"
            class="page-icon"
        />
      </button>
      <div class="page-range">
        <button class="pagination-buttons cursor-point"
                v-if="pageCounter > 3"
                @click="goToPage(1)">
          <span>1</span>
        </button>
        <button
            class="pagination-buttons"
            v-if="pageCounter > 3">
          <span>. . .</span>
        </button>
        <button
            class="pagination-buttons cursor-point"
            v-for="page in visiblePages"
            :key="page"
            :style="{'background-color': page === pageCounter ? 'rgba(143, 177, 181, 0.6)' : 'white'}"
            @click="goToPage(page)">
          <span :style="{'font-weight': page === pageCounter ? '500' : '300'}">{{ page }}</span>
        </button>
        <button
            class="pagination-buttons"
            v-if="pageCounter < pagesTotal - 3">
          <span>. . .</span>
        </button>
        <button class="pagination-buttons cursor-point"
                v-if="pageCounter < pagesTotal - 3"
                @click="lastPage">
          <span>{{ pagesTotal }}</span>
        </button>
      </div>
      <button
          v-if="pageCounter != pagesTotal"
          class="change-page-button cursor-point"
          @click="changePage('+')">
        <Icon
            icon="MoreIcon"
            :width="2"
            :height="2"
            :color="colors.darkSteel"
            :strokeWidth="0.8"
            :style="'transform: translateY(-4px) translateX(-4px)'"
            class="page-icon cursor-point"
        />
      </button>
    </article>
  </section>
</template>

<script>
import { inject, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { sendFilterData } from '@/HelperFunctions'

export default {
  name: 'ControlsBottom',
  props: {
    resultsTotal: {
      type: Number
    }
  },
  setup (props) {
    const filters = inject('providedFilters')
    const colors = inject('themeColors')
    const store = useStore()
    const router = useRouter()
    const range = ref(5)
    const setPageSize = (e) => {
      sendFilterData(Object.assign(filters.value.resultsView, {
        pagesize: +e.target.value
      }), store, router)
    }
    const changePage = (direction) => {
      const resultsView = filters.value.resultsView
      if (direction === '+' && resultsView.offset <= props.resultsTotal) {
        const tempOffset = resultsView.offset + resultsView.pagesize
        sendFilterData(Object.assign(filters.value.resultsView, {
          offset: +tempOffset
        }), store, router)
      } else if (direction === '-' && resultsView.offset > 0) {
        const tempOffset = resultsView.offset - resultsView.pagesize
        sendFilterData(Object.assign(filters.value.resultsView, {
          offset: +tempOffset
        }), store, router)
      }
    }
    const firstPage = () => {
      sendFilterData(Object.assign(filters.value.resultsView, {
        offset: 0
      }), store, router)
    }
    const lastPage = () => {
      const newOffset = props.resultsTotal - filters.value.resultsView.pagesize
      sendFilterData(Object.assign(filters.value.resultsView, {
        offset: newOffset
      }), store, router)
    }
    const goToPage = (page) => {
      const newOffset = (page * filters.value.resultsView.pagesize) - filters.value.resultsView.pagesize
      sendFilterData(Object.assign(filters.value.resultsView, {
        offset: newOffset
      }), store, router)
    }
    const visiblePages = computed(() => {
      let tempRange = range.value
      if (tempRange > pagesTotal.value) {
        tempRange = pagesTotal.value
        return Array.from({ length: tempRange }, (_, i) => (i + 1))
      } else {
        const half = Math.round((tempRange / 2) - 1)
        let to = tempRange
        if (pageCounter.value + half >= pagesTotal.value) {
          to = pagesTotal.value
        } else if (pageCounter.value > half) {
          to = pageCounter.value + half
        }
        const from = to - tempRange
        return Array.from({ length: tempRange }, (_, i) => (i + 1) + from)
      }
    })
    const pageCounter = computed(() => {
      const resultsView = filters.value.resultsView
      if (resultsView.offset <= 0) {
        return 1
      }
      const tempCounter = filters.value.resultsView.offset / filters.value.resultsView.pagesize
      return Math.ceil((tempCounter + 1))
    })
    const pagesTotal = computed(() => {
      const tempTotal = props.resultsTotal / filters.value.resultsView.pagesize
      return Math.ceil(tempTotal)
    })
    return {
      filters,
      colors,
      setPageSize,
      lastPage,
      firstPage,
      changePage,
      goToPage,
      pageCounter,
      pagesTotal,
      visiblePages
    }
  }
}
</script>

<style scoped>
.results-footer {
  display: inline-flex;
  border-top: 2px solid var(--darkSteel);
  width: 100%;
  padding-top: 1rem;
}
.pagination {
  display: inline-flex;
  margin: 0 0 0 auto;
}
.change-page-button {
  border: 1px solid var(--darkSteel);
  border-radius: 20px;
  width: 34px;
  height: 34px;
  margin: 0;
}
.pagination-buttons {
  border-radius: 15px;
  border: none;
  width: min-content;
  min-width: 32px;
  height: 32px;
}
.page-range {
  border: 1px solid var(--darkSteel);
  border-radius: 20px;
  height: 34px;
  margin: 0 5px 0 5px;
  display: inline-flex;
}
select {
  border-radius: 15px;
  border: 1px solid var(--darkSteel);
  margin: 0 0.5rem 0 0.5rem;
  width: 50px;
  height: 30px;
  transform: translateY(-5px);
}
</style>
