import { ElasticSearch } from '@/store/shared/ElasticSearch'
import { attributesSearch } from '@/store/shared/Paths'

const attributeCategories = {
  format: { // Reference in frontend.
    id: 2, // Made up id. Should be unique.
    name: 'format', // Class name in pimcore.
    title: 'Download format', // Display name in the filter.
    action: 'Download' // Display name on buttons.
  },
  coordinateSystem: {
    id: 3,
    name: 'coordinateSystem',
    title: 'Download koordinatsystem',
    action: ''
  },
  serviceType: {
    id: 4,
    name: 'serviceType',
    title: 'Webservice format',
    action: 'Webservice'
  }
}
// eslint-disable-next-line one-var
const query = () => {
    return {
      size: 9999,
      query: {
        bool: {
          should: [
            {
              match: {
                c_name: attributeCategories.format.name
              }
            },
            {
              match: {
                c_name: attributeCategories.serviceType.name
              }
            }
          ],
          minimum_should_match: 1
        }
      }
    }
  },
  parseFormat = (data) => {
    // eslint-disable-next-line one-var
    const exist = !!data._source,
      source = (exist) ? data._source : ''
    // eslint-disable-next-line multiline-ternary
    return (exist) ? {
      id: Number(source.o_id),
      title: source.format_name,
      categoryId: attributeCategories.format.id,
      backgroundColor: source.format_backgroundcolor,
      color: source.format_color,
      priority: source.format_priority,
      mimetype: source.format_mimetype,
      extension: source.format_fileextension,
      list: []
    } : {
      id: 0,
      title: '',
      categoryId: attributeCategories.format.id,
      color: '',
      priority: 0,
      mimetype: '',
      extension: '',
      list: []
    }
  },
  parseServiceType = (data) => {
    const exist = !!data._source,
      source = (exist) ? data._source : ''
    return (exist) ? {
      id: Number(source.o_id),
      title: source.servicetype_name,
      categoryId: attributeCategories.serviceType.id,
      backgroundColor: source.servicetype_backgroundcolor,
      color: source.servicetype_color,
      priority: source.servicetype_priority,
      list: []
    } : {
      id: 0,
      title: '',
      categoryId: attributeCategories.serviceType.id,
      color: '',
      priority: 0,
      list: []
    }
  },
  parseData = (data) => {
    const state = [
      { // formats
        title: attributeCategories.format.title,
        list: []
      }, { // serviceType
        title: attributeCategories.serviceType.title,
        list: []
      }
    ]
    for (let i = data.hits.hits.length - 1, x = 0, y = 0; i > -1; --i) {
      const curItem = data.hits.hits[i],
        cname = curItem._source.c_name;
      (cname === attributeCategories.serviceType.name)
        ? ((state[1].list[x] = parseServiceType(curItem)) && (++x))
        : (cname === attributeCategories.format.name)
            ? ((state[0].list[y] = parseFormat(curItem)) && (++y))
            : (cname === attributeCategories.coordinateSystem.name)
    }
    return state
  },
  crud = []

export const DatasetsAttributes = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
