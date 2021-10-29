export class FilterClass {
  constructor () {
    this.state = {
      data: {
        resultsTags: Object.seal({
          arketype: [],
          daekningsomraade: [],
          kortvaerk: [],
          titel: '',
          gaeldendefra: -1,
          gaeldendetil: -1,
          geometri: '',
          kortbladnummer: '',
          maalestok: [],
          fritekstsoegning: '',
          tegner: ''
        }),
        resultsView: {
          pagesize: 25,
          offset: 0,
          sort: '',
          direction: ''
        }
      },

      status: ''
    }

    this.getters = {
    }

    this.actions = {
      get ({ commit, state }) {
        return new Promise((resolve, reject) => {
          commit('request')
          resolve(state)
          commit('success')
        })
      },

      clear ({ commit, dispatch }) {
        commit('clear')
      },

      setFilterData ({ commit, state }, newFilterValue) {
        commit('setNewFilterData', newFilterValue)
        return state.data
      }
    }

    this.mutations = {
      request (state) {
        state.status = 'loading'
      },
      success (state) {
        state.status = 'success'
      },
      error (state) {
        state.status = 'error'
      },
      clear (state) {
        state.data = {
          resultsTags: Object.seal({
            arketype: [],
            daekningsomraade: [],
            kortvaerk: [],
            titel: '',
            gaeldendefra: -1,
            gaeldendetil: -1,
            geometri: '',
            kortbladnummer: '',
            maalestok: [],
            fritekstsoegning: '',
            tegner: ''
          }),
          resultsView: {
            pagesize: 25,
            offset: 0,
            sort: '',
            direction: ''
          }
        }
      },
      setNewFilterData (state, newFilterValue) {
        const resultsViews = (({ pagesize, offset, sort, direction }) => ({ pagesize, offset, sort, direction }))(newFilterValue)
        resultsViews.pagesize = +resultsViews.pagesize || state.data.resultsView.pagesize
        resultsViews.offset = +resultsViews.offset || state.data.resultsView.offset
        resultsViews.sort = resultsViews.sort || state.data.resultsView.sort
        resultsViews.direction = resultsViews.direction || state.data.resultsView.direction
        delete newFilterValue.pagesize
        delete newFilterValue.offset
        delete newFilterValue.sort
        delete newFilterValue.direction
        for (const [key, value] of Object.entries(newFilterValue)) {
          if ((typeof value === 'string') && !(value.indexOf('|') === -1)) {
            newFilterValue[key] = value.split('|')
          }
        }
        state.data = Object.assign({}, {
          resultsTags: Object.assign(state.data.resultsTags, newFilterValue),
          resultsView: Object.assign(state.data.resultsView, resultsViews)
        })
      }
    }
  }
}

// eslint-disable-next-line one-var
const crud = new FilterClass(),
  state = crud.state,
  getters = crud.getters,
  actions = crud.actions,
  mutations = crud.mutations

export const Filters = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
