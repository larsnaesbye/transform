import { Arkivmeta } from '@/store/shared/Arkivmeta'
import { parseKort } from '@/store/shared/ParseData'
import { kortGet } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Arkivmeta(kortGet, parseKort),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const Kort = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
