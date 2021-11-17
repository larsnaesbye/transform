import { Tile as TileLayer} from 'ol/layer'
import { WMTS, TileWMS} from 'ol/source'
import { Circle as CircleStyle, Fill, Stroke, Style, Text, Icon } from 'ol/style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import axios from 'axios'
import GeoJSON from 'ol/format/GeoJSON'
import Projection from 'ol/proj/Projection'
import VectorTileSource from 'ol/source/VectorTile'
import geojsonvt from 'geojson-vt'
// import pin from '../../assets/Icons/map_pin.svg'

import {ScaleLine, defaults as defaultControls} from 'ol/control'; // for our upcoming Scaleline at the bottom

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
export const scaleControl = function () {
  return new ScaleLine({
    minWidth: 140,
  });
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
