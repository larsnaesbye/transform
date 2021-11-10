import { ForsyningsdataApi } from '@/store/shared/ForsyningsdataREST'
import { flattenEPT } from '@/HelperFunctions'

// eslint-disable-next-line one-var
const query = (id) => {
    return id
  },
  parseForsyningsdata = () => {
    return []
  },
  crud = new ForsyningsdataApi(query, parseForsyningsdata),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const DatasetData = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
