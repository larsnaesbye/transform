import { datasetMeta } from '@/MetaData'
export const parseDataset = (data) => {
  // eslint-disable-next-line one-var
  const exist = !!data._source && datasetMeta[data._source.o_id],
    source = (exist) ? data._source : '',
    // eslint-disable-next-line multiline-ternary
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


  // add downloads
  if (exist && source.product_relations) {
    for (let i = 0, iEnd = source.product_relations.length; i < iEnd; ++i) {
      // if an item with the same index as the current item in product_relations exists
      // in either product_ftppath, product_fmename or product_mapcutouts then theese types
      // exists and is added.
      if (source.product_ftpurl[i]) {
        dataset.downloads[i] = {
          type: 'ftp',
          link: source.product_ftpurl[i],
          title: source.product_ftptitel[i],
          subtitle: source.product_ftpsubtitel[i],
          description: source.product_ftpdescription[i],
          formatIds: source.product_relations[i].format[0]
        }
      } else if (source.product_httpurl[i]) {
        dataset.downloads[i] = {
          type: 'http',
          link: source.product_httpurl[i],
          title: source.product_httptitel[i],
          subtitle: source.product_httpsubtitel[i],
          description: source.product_httpdescription[i],
          formatIds: source.product_relations[i].format[0]
        }
      } else if (source.product_fmename[i]) {
        dataset.downloads[i] = {
          type: 'fme',
          formatIds: source.product_relations[i].format[0],
          name: source.product_fmename[i],
          cutouts: source.product_fmecutouts[i]
        }
      } else if (source.product_mapcutouts[i]) {
        dataset.downloads[i] = {
          type: 'map',
          formatIds: source.product_relations[i].format[0],
          cutouts: source.product_mapcutouts[i],
          link: Number(source.product_mapcutoutlink[i]),
          folder: source.product_mapcutoutfolder[i],
          file: source.product_mapcutoutdetails[i]
        }
      }
    }
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
