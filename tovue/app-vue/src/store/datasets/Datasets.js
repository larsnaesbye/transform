import { ElasticSearch } from '@/store/shared/ElasticSearch'
import { parseDatasets } from '@/store/shared/ParseData'
import { productsSearch } from '@/store/shared/Paths'

// eslint-disable-next-line one-var
const query = () => {
    // eslint-disable-next-line multiline-ternary
    return (process.env.NODE_ENV === 'production') ? {
      size: 10000,
      sort: [
        { 'product_title.keyword': { order: 'desc' } }
      ],
      query: {
        bool: {
          must: [
            {
              match: {
                tag_names: 'forsyningsdata'
              }
            }
          ]
        }
      }
    } : {
      size: 10000,
      sort: [
        { 'product_title.keyword': { order: 'desc' } }
      ],
      query: {
        bool: {
          must: [
            {
              match: {
                tag_names: 'forsyningsdata'
              }
            }
          ]
        }
      }
    }
  },
  crud = []

export const Datasets = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
