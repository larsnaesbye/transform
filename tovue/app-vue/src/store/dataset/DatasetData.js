import {ForsyningsdataApi} from '@/store/shared/ForsyningsdataREST'

const query = (id) => {
        return id
    },
    parseForsyningsdata = (id, data, view) => {
        let rows
        rows = []
        return rows
    },
    crud = new ForsyningsdataApi(query, parseForsyningsdata),
    state = crud.state,
    getters = crud.getters,
    actions = crud.actions,
    mutations = crud.mutations

export const DatasetData = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
