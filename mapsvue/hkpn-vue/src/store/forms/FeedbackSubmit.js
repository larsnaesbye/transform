import { Cockpit } from '@/store/shared/Cockpit'
import { submitFeedback } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const crud = new Cockpit(submitFeedback, (data) => { return data }),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const FeedbackSubmit = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
