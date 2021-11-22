import {ElasticSearch} from '@/store/shared/ElasticSearch'
import {parseDataset} from '@/store/shared/ParseData'
import {productsSearch} from '@/store/shared/Paths'
import {getByIds} from '@/store/shared/Queries'

const parse = (data) => {
        return parseDataset(data.hits.hits[0])
  },
  crud = new ElasticSearch(getByIds, productsSearch, parse),
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
