// import { ForsyningsdataApi } from '@/store/shared/ForsyningsdataREST'
import { flattenEPT } from '@/HelperFunctions'

// eslint-disable-next-line one-var
const query = (id) => {
    return id
  },
  parseForsyningsdata = (id, data, view) => {
    let rows
    if (Array.isArray(data)) {
      if (id === 2934) {
        rows = (view === 'map') ? flattenEPT(data, 'vaerk') : flattenEPT(data, 'anlaeg')
        rows.forEach(row => {
          if (row.vaerk_branchekode === '351100') {
            row.branche = '351100 (Produktion af elektricitet)'
          } else if (row.vaerk_branchekode === '353000') {
            row.branche = '353000 (Varmeforsyning)'
          } else {
            row.branche = 'Anden branchekode'
          }
        })
      } else {
        rows = data
      }
    } else {
      rows = []
    }
    return rows
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
