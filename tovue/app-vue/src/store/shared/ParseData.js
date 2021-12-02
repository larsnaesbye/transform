import { datasetMeta } from '@/MetaData'
export const parseDataset = (data) => {
  const exist = !!data._source && datasetMeta[data._source.o_id],
    source = (exist) ? data._source : '',
    dataset = (exist) ? {
      type: 'dataset',
      id: source.o_id || '',
      title: (source.product_shorttitle || source.product_title) || '',
      tooltip: source.product_title || '',
      summary: source.product_summary || '',
      description: source.product_description || '',
      description_tmp: source.product_description_tmp || '',
      image: source.product_image || 0,
      tags: [],
      downloads: [],
      services: [],
      latitude: source.product_latitude || '',
      longitude: source.product_longitude || '',
      zoom: source.product_zoom || '',
      dataStructure: source.product_datastructure || '',
      relevance: source.product_relevance || '',
      dataScheme: source.product_datascheme || '',
      overlay: source.product_overlay || '',
      layer: source.product_layer || '',
      linkTitle: source.product_linktitle || '',
      linkUrl: source.product_linkurl || '',
      relTitles: source.product_rel_titles || '',
      relDataProducts: source.product_rel_dataproducts || [],
      fields: [],
      tableSettings: datasetMeta[source.o_id].tableSettings || {},
      mapSettings: datasetMeta[source.o_id].mapSettings || {},
      dashboardSettings: datasetMeta[source.o_id].dashboardSettings || {},
      dataDescription: datasetMeta[source.o_id].dataInfo && datasetMeta[source.o_id].dataInfo.dataDescription ? datasetMeta[source.o_id].dataInfo.dataDescription : '',
      sectors: datasetMeta[source.o_id].dataInfo && datasetMeta[source.o_id].dataInfo.sectors ? datasetMeta[source.o_id].dataInfo.sectors : ''
    } : {
      type: 'dataset',
      id: '',
      title: '',
      tooltip: '',
      summary: '',
      description: '',
      description_tmp: '',
      image: 0,
      tags: [],
      downloads: [],
      services: [],
      latitude: '',
      longitude: '',
      zoom: '',
      dataStructure: '',
      relevance: '',
      dataScheme: '',
      overlay: '',
      layer: '',
      linkTitle: '',
      linkUrl: '',
      relTitles: '',
      relDataProducts: [],
      fields: [],
      tableSettings: {},
      sectors: []
    }


  // Add services
  if (exist && source.servicetypeid) {
    const allServices = []
    for (let i = 0, iEnd = source.servicetypeid.length; i < iEnd; ++i) {
      allServices[i] = {
        id: source.product_rel_services[i],
        typeId: source.servicetypeid[i]
      }
    }
    const allServiceTypes = allServices.map(service => service.typeId)
    const distinctServiceTypes = [...new Set(allServiceTypes)]
    dataset.services = distinctServiceTypes.map((typeId) => {
      return {
        typeId: typeId, ids: allServices.filter(service => service.typeId === typeId).map(service => service.id)
      }
    })
  }
  return dataset
}
