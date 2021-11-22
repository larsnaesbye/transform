import Vue from 'vue'
import Vuex from 'vuex'

import { Datasets } from '@/store/datasets/Datasets'
import { DatasetsAssets } from '@/store/datasets/DatasetsAssets'
// import { DatasetsAttributes } from '@/store/datasets/DatasetsAttributes'
// import { DatasetsServices } from '@/store/datasets/DatasetsServices'
import { DatasetData } from '@/store/dataset/DatasetData'
import { DatasetMeta } from '@/store/dataset/DatasetMeta'
import { HomeAssets } from '@/store/home/HomeAssets'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Datasets,
    DatasetsAssets,
    // DatasetsAttributes,
    // DatasetsServices,
    DatasetData,
    DatasetMeta,
    HomeAssets
  }
})
