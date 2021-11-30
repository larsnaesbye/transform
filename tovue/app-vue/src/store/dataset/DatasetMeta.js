import {ElasticSearch} from '@/store/shared/ElasticSearch'
import {parseDataset} from '@/store/shared/ParseData'
import {getByIds} from '@/store/shared/Queries'

const parse = (data) => {
        return ''
  },
  crud = new ElasticSearch(getByIds, 'es/products/_search', parse),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const DatasetMeta = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
