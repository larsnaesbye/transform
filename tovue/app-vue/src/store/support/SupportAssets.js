import { ElasticSearch } from '@/store/shared/ElasticSearch'
import { parseAssets } from '@/store/shared/ParseData'
import { getByIds } from '@/store/shared/Queries'
import { assetsSearch } from '@/store/shared/Paths'

const crud = new ElasticSearch(getByIds, assetsSearch, parseAssets),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const SupportAssets = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
