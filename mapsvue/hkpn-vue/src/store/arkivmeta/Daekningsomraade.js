import { Arkivmeta } from '@/store/shared/Arkivmeta'
import { parseDaekningsomraader } from '@/store/shared/ParseData'
import { daekningsomraaderGet } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Arkivmeta(daekningsomraaderGet, parseDaekningsomraader),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const Daekningsomraader = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
