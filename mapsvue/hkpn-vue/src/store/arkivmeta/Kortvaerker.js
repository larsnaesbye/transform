import { Arkivmeta } from '@/store/shared/Arkivmeta'
import { parseKortvaerker } from '@/store/shared/ParseData'
import { kortvaerkerGet } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Arkivmeta(kortvaerkerGet, parseKortvaerker),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const Kortvaerker = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
