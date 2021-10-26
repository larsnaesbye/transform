import
/* webpackChunkName: "vanillaes" */
{ stringify } from '@vanillaes/csv'

// avoid loading stringify in IE since it causes problems
// import { isIE } from 'mobile-device-detect'
// const stringify = !isIE ? require(/* webpackChunkName: "vanillaes" */'@vanillaes/csv').stringify : function (val) { return val }

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
export const dataToCsvString = function (columnDef, data) {
  const headerRow = []
  const dataRows = []
  for (let i = 0; i < columnDef.length; i++) {
    headerRow[i] = columnDef[i].label
  }
  for (let j = 0; j < data.length; j++) {
    const dataRow = data[j]
    const csvRow = []
    for (let k = 0; k < columnDef.length; k++) {
      const col = columnDef[k]
      csvRow[k] = String(formatField(dataRow[col.fieldId], col.type, col.decimal, col.separator)).split(',').join('$_§')
    }
    dataRows[j] = csvRow
  }
  const csvArr = [headerRow, ...dataRows]
  const stringified = stringify(csvArr).replace(/,/g, ';').split('$_§').join(',')
  const BOM = '\uFEFF'
  return BOM + stringified
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
export const flattenEPT = (data, level) => {
  const rows = []
  data.forEach((selskab, index) => {
    // LEVEL 1
    if (selskab.vaerker && selskab.vaerker[0]) {
      selskab.vaerker.forEach(vaerk => {
        if (level === 'vaerk') {
          const newRow = {}
          for (const key in vaerk) {
            newRow[key] = vaerk[key]
          }
          for (const key in selskab) {
            if (key !== 'vaerker') {
              newRow[key] = selskab[key]
            }
          }
          rows.push(newRow)
        }
        if (level === 'anlaeg' && vaerk.anlaeg && Array.isArray(vaerk.anlaeg)) {
          vaerk.anlaeg.forEach(anlaeg => {
            const newRow = {}
            for (const key in anlaeg) {
              newRow[key] = anlaeg[key]
            }
            for (const key in vaerk) {
              if (key !== 'anlaeg') {
                newRow[key] = vaerk[key]
              }
            }
            for (const key in selskab) {
              if (key !== 'vaerker') {
                newRow[key] = selskab[key]
              }
            }
            rows.push(newRow)
          })
        }
      })
    } else {
      rows.push(selskab)
    }
  })
  return rows
}
export const hexToRgb = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  hex = hex.slice(0, 7)
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  // eslint-disable-next-line multiline-ternary
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}
