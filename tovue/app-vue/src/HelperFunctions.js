import
/* webpackChunkName: "vanillaes" */
{ stringify } from '@vanillaes/csv'

export const insertEveryN = function (arr, n, val) {
  for (let i = n; i < arr.length; i = i + n + 1) {
    arr.splice(i, 0, val)
  }
  return arr
}

export const formatField = function (fieldData, fieldType, decimal, separator) {
  const dec = (!isNaN(decimal) && decimal !== '') ? decimal : null
  const sep = separator || null
  if ((fieldData !== undefined) && (fieldData !== 'null') && (fieldData !== null)) {
    let formattedField = String(fieldData)
    if ((fieldType === 'num') && !isNaN(formattedField)) {
      const negativeValue = Number(formattedField) < 0
      formattedField = negativeValue ? (Number(formattedField) * -1) : Number(formattedField)
      formattedField = Number(formattedField)
      // split into integer and decimals - if any decimals
      if (dec !== null) {
        formattedField = formattedField.toFixed(dec)
      }
      const arr = String(formattedField).split('.')

      // add thousands separator
      arr[0] = sep ? insertEveryN(arr[0].split('').reverse(), 3, '.').reverse().join('') : arr[0]

      // joins integer and decimals - if any decimals
      formattedField = arr.join(',')

      // add minus if originally negative value
      formattedField = negativeValue ? '-' + formattedField : formattedField
    } else if (fieldType === 'pct' && (!isNaN(formattedField))) {
      let pct = (Number(formattedField)) / 100
      if (dec !== null) {
        pct = pct.toFixed(dec)
      }
      const arr = String(pct).split('.')
      arr[0] = insertEveryN(arr[0].split('').reverse(), 3, '.').reverse().join('')
      formattedField = arr.join(',')
    } else {
      formattedField = String(fieldData)
    }
    return formattedField
  } else {
    return fieldData === null ? '-' : String(fieldData)
  }
}
export const download = function (content, fileName, mimeType) {
  const a = document.createElement('a')
  mimeType = mimeType || 'application/octet-stream'

  if (navigator.msSaveBlob) { // IE10
    navigator.msSaveBlob(new Blob([content], {
      type: mimeType
    }), fileName)
  } else if (URL && 'download' in a) { // html5 A[download]
    a.href = URL.createObjectURL(new Blob([content], {
      type: mimeType
    }))
    a.setAttribute('download', fileName)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } else {
    location.href = 'data:application/octet-stream,' + encodeURIComponent(content) // only this mime type is supported
  }
}
export const copyToClipboard = (text) => {
  return window.navigator.clipboard.writeText((text || '')).then(
    () => { return { state: 'success' } },
    (msg) => { return { state: 'fail', error: msg } }
  )
}
export const getAssetLink = (id, assets) => {
  const img = assets.find((e) => {
    return id === e.id
  })
  return img ? (window.location.origin + '/asset' + img.path + img.filename) : ''
}
export const loadImage = (url) => {
  const promise = new Promise(function (resolve, reject) {
    const highResImage = new Image()
    highResImage.onload = function () {
      resolve()
    }
    highResImage.src = url
  })
  return promise
}
