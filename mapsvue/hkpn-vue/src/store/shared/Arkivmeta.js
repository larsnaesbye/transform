import { environmentAPIDomains } from '@/store/shared/Paths'

export class Arkivmeta {
  constructor (path, parseData) {
    this.state = {
      data: {},
      tempData: {},
      tempQueryData: {},
      tempDataString: '',
      status: ''
    }

    this.getters = {
    }

    this.actions = {
      getAsParams ({ commit, state }, paramsObject) {
        commit('getAsParamsMutation', paramsObject)
        return state.tempQueryData
      },

      get ({ commit, dispatch, state }, queryObject) {
        return new Promise((resolve, reject) => {
          const convert = (tmp) => {
            return JSON.stringify(tmp).replaceAll(/:(?![^\\[]*\])/g, '=').replaceAll(/"|{|}|\[|\]/g, '').replaceAll(/,/g, '&').replaceAll(':', '=')
          }
          commit('request')
          const tempParams = []
          if (queryObject) {
            if (Object.keys(state.tempData).length === 0) {
              const tempObject = Object.assign({}, {
                resultsTags: Object.assign((state?.tempData?.resultsTags || {}), (queryObject.resultsTags || {})),
                resultsView: Object.assign((state?.tempData?.resultsView || {}), (queryObject.resultsView || {}))
              })
              tempParams[0] = tempObject
            } else {
              if (state.tempData.resultsTags?.arketype) {
                state.tempData.resultsTags.arketype = encodeURIComponent(state.tempData.resultsTags.arketype)
              }
              if (state.tempData.resultsTags?.daekningsomraade) {
                state.tempData.resultsTags.daekningsomraade = encodeURIComponent(state.tempData.resultsTags.daekningsomraade)
              }
              if (state.tempData.resultsTags?.kortvaerk) {
                state.tempData.resultsTags.kortvaerk = encodeURIComponent(state.tempData.resultsTags.kortvaerk)
              }
              if (state.tempData.resultsTags?.maalestok) {
                state.tempData.resultsTags.maalestok = encodeURIComponent(state.tempData.resultsTags.maalestok)
              }
              tempParams[0] = state.tempData
            }
            /* if ((!state.tempData) && (queryObject?.kortvaerk?.length > 0 || queryObject?.maalestok?.length > 0 || queryObject?.arketype?.length > 0 || queryObject?.daekningsomraade?.length > 0)) {
              console.log('here')
              const kortvaerkCount = queryObject?.resultsTags?.kortvaerk?.length || 0
              const maalestokCount = queryObject?.resultsTags?.maalestok?.length || 0
              const arketypeCount = queryObject?.resultsTags?.arketype?.length || 0
              const daekningsomraadeCount = queryObject?.resultsTags?.daekningsomraade?.length || 0
              const curParams = Object.assign({}, state.tempData)
              delete curParams.resultsTags.kortvaerk
              delete curParams.resultsTags.maalestok
              delete curParams.resultsTags.resultsTags.arketype
              delete curParams.resultsTags.daekningsomraade
              tempParams[tempParams.length] = Object.assign({}, curParams)
              for (let i = 0; i < kortvaerkCount; ++i) {
                tempParams[tempParams.length] = { kortvaerk: encodeURIComponent(queryObject.resultsTags.kortvaerk[i]) }
              }
              for (let i = 0; i < maalestokCount; ++i) {
                tempParams[tempParams.length] = { maalestok: encodeURIComponent(queryObject.resultsTags.maalestok[i]) }
              }
              for (let i = 0; i < arketypeCount; ++i) {
                tempParams[tempParams.length] = { arketype: encodeURIComponent(queryObject.resultsTags.arketype[i]) }
              }
              for (let i = 0; i < daekningsomraadeCount; ++i) {
                tempParams[tempParams.length] = { daekningsomraade: encodeURIComponent(queryObject.resultsTags.daekningsomraade[i]) }
              }
            } else {
              console.log(state.tempData)
              console.log(queryObject)
              if (state.tempData.resultsTags?.arketype) {
                state.tempData.resultsTags.arketype = encodeURIComponent(state.tempData.resultsTags.arketype)
              }
              if (state.tempData.resultsTags?.daekningsomraade) {
                state.tempData.resultsTags.daekningsomraade = encodeURIComponent(state.tempData.resultsTags.daekningsomraade)
              }
              if (state.tempData.resultsTags?.kortvaerk) {
                state.tempData.resultsTags.kortvaerk = encodeURIComponent(state.tempData.resultsTags.kortvaerk)
              }
              if (state.tempData.resultsTags?.maalestok) {
                state.tempData.resultsTags.maalestok = encodeURIComponent(state.tempData.resultsTags.maalestok)
              }
              tempParams[0] = state.tempData
              console.log(tempParams[0])
            } */
          } else {
            commit('getAsParamsMutatedString', queryObject || {})
            tempParams[0] = state.tempDataString
          }
          const mergedObject = { ...tempParams[0].resultsTags, ...tempParams[0].resultsView }
          let tempString = convert(mergedObject) || ''
          tempString = tempString.substring(1) === '?' ? tempString : '?' + tempString
          tempString = (tempString.length === 1 ? tempString : tempString + '&') + 'token=147df2cc622086861a8ca994809a1ace'
          fetch('https://' + environmentAPIDomains[process.env.NODE_ENV] + '/' + path + tempString)
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
        state.data = {}
      },

      getAsParamsMutation (state, paramsObject) {
        const tempObject = Object.assign({}, {
          resultsTags: Object.assign((state?.tempData?.resultsTags || {}), (paramsObject?.resultsTags || {})),
          resultsView: Object.assign((state?.tempData?.resultsView || {}), (paramsObject?.resultsView || {}))
        })
        const tmpFilterResult = Object.assign({
          resultsTags: Object.fromEntries(Object.entries(tempObject.resultsTags).filter(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
              return true
            } else if (typeof value === 'string' && value.length > 0) {
              return true
            } else if (typeof value === 'number' && value > -1) {
              return true
            } else {
              return false
            }
          })),
          resultsView: Object.fromEntries(Object.entries(tempObject.resultsView).filter(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
              return true
            } else if (typeof value === 'string' && value.length > 0) {
              return true
            } else if (typeof value === 'number' && value > -1) {
              return true
            } else {
              return false
            }
          }))
        })
        const filterResult = Object.assign({}, tmpFilterResult)
        state.tempData = filterResult
        for (const [key, value] of Object.entries(filterResult.resultsTags)) {
          if (Array.isArray(value)) {
            filterResult.resultsTags[key] = value.join('|')
          }
        }
        state.tempQueryData = { ...filterResult.resultsTags, ...filterResult.resultsView }
      },
      getAsParamsMutatedString (state) {
        const mergedObject = { ...state.tempData.resultsTags, ...state.tempData.resultsView }
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(mergedObject)) {
          if (Array.isArray(value)) {
            for (let i = 0, iEnd = value.length; i < iEnd; ++i) {
              if (i === 0) {
                continue
              }
              value[i] = '|' + value[i]
            }
          }
        }
        state.tempDataString = JSON.stringify(mergedObject).replaceAll(/:(?![^\\[]*\])/g, '=').replaceAll('",|', '|').replaceAll(/"|{|}|\[|\]/g, '').replaceAll(/,/g, '&')
      }
    }
  }
}
