import { Cockpit } from '@/store/shared/Cockpit'
import { parseKnownIssues } from '@/store/shared/ParseData'
import { knowIssuesGet } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Cockpit(knowIssuesGet, parseKnownIssues),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const KnownIssues = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
