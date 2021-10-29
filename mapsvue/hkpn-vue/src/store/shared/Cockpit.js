import { environmentCMSDomains } from '@/store/shared/Paths'

const tokens = {
  get: {
    production: '71760df34b950ecf2f49ce8ba369a2',
    development: '71760df34b950ecf2f49ce8ba369a2',
    staging: '71760df34b950ecf2f49ce8ba369a2'
  },
  feedback: {
    production: 'b0a673296e1c414cf337aabeb15235',
    development: 'b0a673296e1c414cf337aabeb15235',
    staging: 'b0a673296e1c414cf337aabeb15235'
  }
}

// tokens.get: 88d5ffd8e74f40fbdd4b255ad4902b, 71760df34b950ecf2f49ce8ba369a2
// tokens.feedback: 74e505e7d7ab5c87c37eeb9cf7d96c, b0a673296e1c414cf337aabeb15235

export class Cockpit {
  constructor (path, parseData) {
    this.state = {
      data: [],
      postData: {},
      status: ''
    }

    this.getters = {
    }

    this.actions = {
      get ({ commit, dispatch }, data) {
        return new Promise((resolve, reject) => {
          commit('request')
          fetch('https://' + environmentCMSDomains[process.env.NODE_ENV] + '/' + path + '?token=' + tokens.get[process.env.NODE_ENV])
            .then(resp => {
              resp.json().then(data => {
                commit('success', data)
                resolve(data)
              })
            })
            .catch((err) => {
              commit('error', err)
              reject(err)
            })
        })
      },

      post ({ commit, dispatch }, postData) {
        return new Promise((resolve, reject) => {
          commit('request')
          fetch('https://' + environmentCMSDomains[process.env.NODE_ENV] + '/' + path + '?token=' + tokens.feedback[process.env.NODE_ENV], {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              form: postData
            })
          })
            .then(resp => {
              resp.json().then(data => {
                commit('success', data)
                resolve(data)
              })
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
