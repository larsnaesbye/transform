import { ElasticSearch } from '@/store/shared/ElasticSearch'
import { parseDataset } from '@/store/shared/ParseData'
import { productsSearch } from '@/store/shared/Paths'
import { getByIds } from '@/store/shared/Queries'

// eslint-disable-next-line one-var
const parse = (data) => {
    const newData = parseDataset(data.hits.hits[0])
    return newData
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
