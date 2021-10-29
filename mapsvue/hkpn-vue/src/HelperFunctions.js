export const sendFilterData = (filterStates, store, router) => {
  store.dispatch('Filters/setFilterData', filterStates).then((mutatedFilterStates) => {
    store.dispatch('Kort/getAsParams', mutatedFilterStates).then((tempParams) => {
      router.push({
        query: tempParams
      })
    })
  })
}
