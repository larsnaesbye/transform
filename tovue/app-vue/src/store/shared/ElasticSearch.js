// copy paste fra Dataforsyningen
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
        return new Promise((resolve, reject) => {
          commit('request')
          axios.post(window.location.origin + '/' + path, query(data), { timeout: 5000 })
            .then((resp) => {
              // console.log(path, resp)
              commit('success', resp.data)
              resolve(resp)
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
