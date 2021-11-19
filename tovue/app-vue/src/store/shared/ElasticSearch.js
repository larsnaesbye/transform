import axios from 'axios'

export class ElasticSearch {
  constructor (query, path, parseData) {
    this.state = {
      data: [],
      status: ''
    }

    this.getters = {
    }

    this.actions = {
      get ({ commit, dispatch }, data) {
        return ""
      },
      clear ({ commit, dispatch }) {
        commit('clear')
      }
    }

    this.mutations = {
      request (state) {
        state.status = 'loading'
      },
      success (state, data) {
        state.data = parseData(data)
        state.status = 'success'
      },
      error (state) {
        state.status = 'error'
      },
      clear (state) {
        state.data = []
      }
    }
  }
}
