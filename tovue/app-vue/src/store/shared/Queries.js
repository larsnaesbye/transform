export const getByIds = (ids) => {
  return {
    query: {
      ids: {
        values: ids
      }
    }
  }
}
export const getAll = () => {
  return {
    size: 9999,
    query: {
    }
  }
}
