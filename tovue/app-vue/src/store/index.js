import Vue from 'vue'
import Vuex from 'vuex'

import { Datasets } from '@/store/datasets/Datasets'
import { DatasetMeta } from '@/store/dataset/DatasetMeta'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Datasets,
    DatasetMeta,
  }
})
