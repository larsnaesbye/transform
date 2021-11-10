import axios from 'axios'
import { datasetMeta } from '@/MetaData.js'
import { restPath, restPathTest } from '@/store/shared/Paths.js'

export class ForsyningsdataApi {
  constructor (query, parseData) {
    this.state = {
      data: {
        table: [],
        map: []
      },
      status: ''
    }

    this.getters = {
    }

    this.actions = {
      get ({ commit, dispatch }, { id, views, filters }) {
        /**
         * 'id' is id of product in pimCore
         * 'views' is an array of views (eg. ['table', 'map'])
         * for each view a copy of the data will be saved in the store
         * this makes it possible to parse data differently for each view
         * this is done in store/dataset/DatasetData.js
         * 'filters' is an object where each key is the name of a filter
         */
        return new Promise((resolve, reject) => {
          commit('request')
          const token = '1fa17ba3b6fb58e8e6e8b09ba2b14be6'
          const serviceName = datasetMeta[id].RESTInfo.serviceName
          let filterQuery = ''

          // If filter object is passed to get method this creates a filter query
          // Currently not used since filtering is handled in frontend
          if (filters) {
            const filtersArr = []
            for (const key in filters) {
              if (filters[key].type === 'multiselect') {
                filtersArr.push(filters[key])
              }
            }
            filtersArr.forEach((filter, i) => {
              filterQuery += i === 0 ? '' : '&'
              filterQuery += filter.name + '='
              if (Array.isArray(filter.value)) {
                if (filter.value.length > 0) {
                  filter.value.forEach((value, index, arr) => {
                    filterQuery += index === (arr.length - 1) ? value : value + ','
                  })
                } else {
                  filterQuery += null
                }
              } else {
                filterQuery += filter.value
              }
            })
          }
          const path = ((process.env.NODE_ENV === 'production') ? restPath : restPathTest) + serviceName + '?token=' + token + filterQuery
          // const start = new Date().getTime()
          axios.get(path)
            .then((resp) => {
              // var time = new Date().getTime() - start
              // console.log('rest/' + serviceName, ' Resp: ' + time + 'ms', resp)
              const data = resp.data[datasetMeta[id].RESTInfo.rootKey]
              if (!data || !Array.isArray(data)) {
                commit('error', resp)
                reject(resp)
              } else {
                commit('success', { id, data, views })
                resolve(data)
              }
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
      success (state, { id, data, views }) {
        views.forEach(view => {
          state.data[view] = parseData(id, data, view)
        })
        state.status = 'success'
      },
      error (state) {
        state.status = 'error'
      },
      clear (state) {
        state.data = {
          table: [],
          map: []
        }
      }
    }
  }
}
