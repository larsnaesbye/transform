import { Arkivmeta } from '@/store/shared/Arkivmeta'
import { parseArketyperKortvaerker } from '@/store/shared/ParseData'
import { arketyperKortvaerkerGet } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Arkivmeta(arketyperKortvaerkerGet, parseArketyperKortvaerker),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const ArketyperKortvaerker = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
