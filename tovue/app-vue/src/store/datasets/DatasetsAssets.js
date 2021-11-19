import { ElasticSearch } from '@/store/shared/ElasticSearch'
import { parseAssets } from '@/store/shared/ParseData'
import { getByIds } from '@/store/shared/Queries'
import { assetsSearch } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = []

export const DatasetsAssets = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
