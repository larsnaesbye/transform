import { Cockpit } from '@/store/shared/Cockpit'
import { parseImageData } from '@/store/shared/ParseData'
import { imageDataGet } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Cockpit(imageDataGet, parseImageData),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const ImageData = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
