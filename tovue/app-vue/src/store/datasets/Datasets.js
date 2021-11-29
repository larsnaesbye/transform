import {ElasticSearch} from '@/store/shared/ElasticSearch'
import {parseDatasets} from '@/store/shared/ParseData'
import {productsSearch} from '@/store/shared/Paths'

const query = () => {
        return (process.env.NODE_ENV === 'production') ? {
            size: 10000,
            sort: [
                {'product_title.keyword': {order: 'desc'}}
            ],
            query: {}
        } : {
            size: 10000,
            sort: [
                {'product_title.keyword': {order: 'desc'}}
            ],
            query: {}
        }
    },
    crud = new ElasticSearch(query, productsSearch, parseDatasets),
    state = crud.state,
    getters = crud.getters,
    actions = crud.actions,
    mutations = crud.mutations

export const Datasets = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
