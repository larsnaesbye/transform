import { Cockpit } from '@/store/shared/Cockpit'
import { parseHero } from '@/store/shared/ParseData'
import { heroGet } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Cockpit(heroGet, parseHero),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const Hero = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
