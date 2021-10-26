import { ElasticSearch } from '@/store/shared/ElasticSearch'
import { parseServices } from '@/store/shared/ParseData'
import { getAll } from '@/store/shared/Queries'
import { servicesSearch } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new ElasticSearch(getAll, servicesSearch, parseServices),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const DatasetsServices = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
