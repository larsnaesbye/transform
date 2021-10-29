import { Cockpit } from '@/store/shared/Cockpit'
import { parseInfoBoxes } from '@/store/shared/ParseData'
import { infoBoxesGet } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Cockpit(infoBoxesGet, parseInfoBoxes),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const InfoBoxes = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
