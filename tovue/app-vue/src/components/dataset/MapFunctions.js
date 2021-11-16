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
import pin from '../../assets/Icons/map_pin.svg'

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
