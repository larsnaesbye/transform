import datasets from '@/Data.js'

// TODO: use fetch instead of axios, implement progress and abortAPI
export class ForsyningsdataApi {
  constructor (query, parseData) {
    this.state = {
      data: [],
      status: ''
    }

    this.getters = {
    }

    this.actions = {
      get ({ commit, dispatch }, { id, columnDef }) {
        return new Promise((resolve, reject) => {
          commit('request')
          datasets(query(id))
            .then((data) => {
              commit('success', { data, columnDef })
              resolve(data)
            })
            .catch((err) => {
              commit('error', err)
              reject(err)
            })
        })
      },
      clear ({ commit, dispatch }) {
        commit('clear')
      }
    }

    this.mutations = {
      request (state) {
        state.status = 'loading'
      },
      success (state, { data, columnDef }) {
        state.data = parseData(data, columnDef)
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
