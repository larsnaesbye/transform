import { Tile as TileLayer, Vector as VectorLayer, VectorTile as VectorTileLayer } from 'ol/layer'
import { Cluster, WMTS, TileWMS, Vector as VectorSource } from 'ol/source'
import { Circle as CircleStyle, Fill, Stroke, Style, Text, Icon } from 'ol/style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import axios from 'axios'
import GeoJSON from 'ol/format/GeoJSON'
import Projection from 'ol/proj/Projection'
import VectorTileSource from 'ol/source/VectorTile'
import geojsonvt from 'geojson-vt'
import pin from '../../assets/mapIcons/cirkel_graa_spoergsmaal.svg'

const kfText = 'Styrelsen for Dataforsyning og Effektivisering'
const kfLink = 'https://dataforsyningen.dk/asset/PDF/rettigheder_vilkaar/Vilk%C3%A5r%20for%20brug%20af%20frie%20geografiske%20data.pdf'
const kfAttributionText = '&copy; <a target="_blank" href="' + kfLink +
'">' + kfText + '</a>'
const dfLink = 'https://datafordeler.dk/vejledning/brugervilkaar/sdfe-geografiske-data/'
const dfAttributionText = '&copy; <a target="_blank" href="' + dfLink +
'">' + kfText + '</a>'

const createUrl = function (service, auth) {
  // a lot of copy from okapi. Not using 'df' option yet
  if (auth.source === 'kf') {
    const baseUrl = 'https://api.dataforsyningen.dk/'

    return baseUrl + service + '?token=' + auth.token
  } else if (auth.source === 'df') {
    const baseUrl = 'https://services.datafordeler.dk/'

    return baseUrl + service + '?username=' + auth.username + '&password=' + auth.password
  } else {
    // console.error('Unknown source: "' + auth.source + '"')
    return null
  }
}

export const createTileLayer = function (opt) {
  // a lot of copy from okapi
  const name = opt.name || ''
  const type = opt.type || ''
  const title = opt.title || name
  const color = opt.color || 'black'
  const visible = !!opt.visible
  const auth = opt.auth
  const service = opt.service || ''
  const layer = opt.layer || ''
  const style = opt.style || 'default'
  const version = opt.version || '1.1.1'
  const matrixSet = opt.matrixSet
  const format = opt.format || ''
  const size = opt.size || [256, 256]
  const tileGrid = opt.tileGrid
  const attributionText = opt.auth.source === 'kf' ? kfAttributionText : (opt.auth.source === 'df' ? dfAttributionText : opt.attribution)

  let source = null
  if (type === 'WMTS') {
    source = new WMTS({
      attributions: attributionText,
      crossOrigin: 'Anonymous',
      url: createUrl(service, auth),
      layer: layer,
      matrixSet: matrixSet,
      format: format,
      tileGrid: tileGrid,
      style: style,
      size: size
    })
  } else if (type === 'WMS') {
    source = new TileWMS({
      attributions: attributionText,
      crossOrigin: 'Anonymous',
      url: createUrl(service, auth),
      params: {
        LAYERS: layer,
        VERSION: version,
        TRANSPARENT: 'true',
        FORMAT: format,
        STYLES: style
      }
    })
  } else {
    return null
  }
  return new TileLayer({
    opacity: 1.0,
    title: title,
    name: name,
    color: color,
    type: 'base',
    visible: visible,
    source: source,
    preload: Infinity
  })
}

function createIconStyle (url, scale) {
  const src = url || pin
  const size = scale || 1
  return new Style({
    image: new Icon(({
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      src: src,
      scale: size
    }))
  })
}

export const createFeaturesLayer = function (markerArray) {
  const source = new VectorSource({})
  const addressCalls = []
  const addressFeatures = []
  const dawsUrl = 'https://dawa.aws.dk/adresser?format=json&struktur=mini&q='

  markerArray.forEach(function (marker) {
    const feature = new Feature()
    for (const key in marker) {
      feature.set(key, marker[key])
    }
    if (marker.lon && marker.lat) {
      feature.set('geometry', new Point(fromLonLat([marker.lon, marker.lat], 'EPSG:25832')))
    }
    if (marker.address && !(marker.lon && marker.lat)) {
      addressFeatures.push(feature)
      addressCalls.push(axios({
        method: 'get',
        url: dawsUrl + marker.address
      }))
    }
    source.addFeature(feature)
  })
  if (addressCalls.length > 0) {
    Promise.all(addressCalls).then((returnValues) => {
      for (let i = 0; i < returnValues.length; i++) {
        // finding lon and lat of first result and setting geometry of the corresponding feature (marker)
        const lon = returnValues[i].data[0].x
        const lat = returnValues[i].data[0].y
        const featureRef = addressFeatures[i]
        featureRef.set('geometry', new Point(fromLonLat([lon, lat], 'EPSG:25832')))
      }
    })
  }
  const styleCache = {}
  const clusters = new VectorLayer({
    source: source,
    style: function (feature) {
      const iconUrl = feature.get('iconUrl') || pin
      const iconSize = feature.get('size')
      let style = styleCache['_' + iconUrl + iconSize]
      if (!style) {
        style = createIconStyle(iconUrl, iconSize)
        styleCache['_' + iconUrl + iconSize] = style
      }
      return style
    }
  })
  return clusters
}
export const createClusterLayer = function (markerArray) {
  const source = new VectorSource({})
  const addressCalls = []
  const addressFeatures = []
  const dawsUrl = 'https://dawa.aws.dk/adresser?format=json&struktur=mini&q='

  markerArray.forEach(function (marker) {
    const feature = new Feature()
    for (const key in marker) {
      feature.set(key, marker[key])
    }
    if (marker.lon && marker.lat) {
      feature.set('geometry', new Point(fromLonLat([marker.lon, marker.lat], 'EPSG:25832')))
    }
    if (marker.address && !(marker.lon && marker.lat)) {
      addressFeatures.push(feature)
      addressCalls.push(axios({
        method: 'get',
        url: dawsUrl + marker.address
      }))
    }
    source.addFeature(feature)
  })
  if (addressCalls.length > 0) {
    Promise.all(addressCalls).then((returnValues) => {
      for (let i = 0; i < returnValues.length; i++) {
        // finding lon and lat of first result and setting geometry of the corresponding feature (marker)
        const lon = returnValues[i].data[0].x
        const lat = returnValues[i].data[0].y
        const featureRef = addressFeatures[i]
        featureRef.set('geometry', new Point(fromLonLat([lon, lat], 'EPSG:25832')))
      }
    })
  }
  const clusterSource = new Cluster({
    distance: 25,
    source: source
  })
  const styleCache = {}
  const clusters = new VectorLayer({
    source: clusterSource,
    style: function (feature) {
      const amount = feature.get('features').length
      const iconUrl = feature.get('features')[0].get('iconUrl') || pin
      const iconSize = feature.get('features')[0].get('size')
      let style = styleCache['_' + amount + iconUrl + iconSize]
      if (!style) {
        if (amount > 1) {
          style = new Style({
            image: new CircleStyle({
              radius: 10,
              stroke: new Stroke({
                color: '#fff'
              }),
              fill: new Fill({
                color: '#3399CC'
              })
            }),
            text: new Text({
              text: String(amount),
              fill: new Fill({
                color: '#fff'
              })
            })
          })
        } else {
          style = createIconStyle(iconUrl, iconSize)
        }
        styleCache['_' + amount + iconUrl + iconSize] = style
      }
      return style
    }
  })
  return clusters
}
export const replacer = function (key, value) {
  if (value.geometry) {
    let type
    const rawType = value.type
    let geometry = value.geometry

    if (rawType === 1) {
      type = 'MultiPoint'
      if (geometry.length === 1) {
        type = 'Point'
        geometry = geometry[0]
      }
    } else if (rawType === 2) {
      type = 'MultiLineString'
      if (geometry.length === 1) {
        type = 'LineString'
        geometry = geometry[0]
      }
    } else if (rawType === 3) {
      type = 'Polygon'
      if (geometry.length > 1) {
        type = 'MultiPolygon'
        geometry = [geometry]
      }
    }

    return {
      type: 'Feature',
      geometry: {
        type: type,
        coordinates: geometry
      },
      properties: value.tags
    }
  } else {
    return value
  }
}
export const addGeoJsonLayer = function (map) {
  // GEOJSON TO TILE WITH HELP FROM
  // this: https://github.com/mapbox/geojson-vt
  // and this: https://openlayers.org/en/latest/examples/geojson-vt.html

  const url = 'geojson/elnetgraenser_jan2020_etrs89_utm32.geojson'
  fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      const tileIndex = geojsonvt(json, {
        extent: 4096,
        debug: 1
      })
      const format = new GeoJSON({
        // Data returned from geojson-vt is in tile pixel units
        dataProjection: new Projection({
          code: 'TILE_PIXELS',
          units: 'tile-pixels',
          extent: [0, 0, 4096, 4096]
        })
      })
      const vectorSource = new VectorTileSource({
        tileUrlFunction: function (tileCoord) {
          // Use the tile coordinate as a pseudo URL for caching purposes
          return JSON.stringify(tileCoord)
        },
        tileLoadFunction: function (tile, url) {
          const tileCoord = JSON.parse(url)
          const data = tileIndex.getTile(
            tileCoord[0],
            tileCoord[1],
            tileCoord[2]
          )
          const geojson = JSON.stringify(
            {
              type: 'FeatureCollection',
              features: data ? data.features : []
            },
            replacer
          )
          const features = format.readFeatures(geojson, {
            extent: vectorSource.getTileGrid().getTileCoordExtent(tileCoord),
            featureProjection: map.getView().getProjection()
          })
          tile.setFeatures(features)
        }
      })
      const vectorLayer = new VectorTileLayer({
        source: vectorSource
      })
      map.addLayer(vectorLayer)
    })
}
