import { Arkivmeta } from '@/store/shared/Arkivmeta'
import { parseArketyper } from '@/store/shared/ParseData'
import { arketyperGet } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Arkivmeta(arketyperGet, parseArketyper),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const Arketyper = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
