import { ElasticSearch } from '@/store/shared/ElasticSearch'
import { parseAssets } from '@/store/shared/ParseData'
import { getByIds } from '@/store/shared/Queries'

const crud = new ElasticSearch(getByIds, 'es/assets/_search', parseAssets),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const AboutAssets = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
