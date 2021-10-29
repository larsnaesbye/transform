import { Cockpit } from '@/store/shared/Cockpit'
import { parseAbout } from '@/store/shared/ParseData'
import { aboutGet } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Cockpit(aboutGet, parseAbout),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const About = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
