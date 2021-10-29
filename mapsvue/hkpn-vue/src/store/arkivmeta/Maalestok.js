import { Arkivmeta } from '@/store/shared/Arkivmeta'
import { parseMaalestok } from '@/store/shared/ParseData'
import { maalestokGet } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Arkivmeta(maalestokGet, parseMaalestok),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const Maalestok = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
