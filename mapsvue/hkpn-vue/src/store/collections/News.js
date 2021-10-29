import { Cockpit } from '@/store/shared/Cockpit'
import { parseNews } from '@/store/shared/ParseData'
import { newsGet } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Cockpit(newsGet, parseNews),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const News = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
