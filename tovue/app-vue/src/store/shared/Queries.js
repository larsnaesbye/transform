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
      match_all: {}
    }
  }
}
export const testQuery = {
  size: 9999,
  query: {
    bool: {
      must: {
        match: {
          _index: 'features'
        }
      },
      filter: {
        ids: {
          values: ['1460', '410']
        }
      }
    }
  }
}
export const testQuery2 = {
  size: 10000,
  query: {
    bool: {
      must: {
        match: {
          _id: 1994
        }
      }
    }
  }
}
export const testQuery3 = {
  size: 10000,
  query: {
    bool: {
      must: {
        match_all: {}
      }
    }
  }
}
