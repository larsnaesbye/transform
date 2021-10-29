export const parseInfoBoxes = (data) => {
  // eslint-disable-next-line one-var
  const infoBoxData = [],
    tempData = data?.entries
  // it's quicker to count down
  for (let i = tempData.length - 1, c = 0; i > -1; --i, ++c) {
    const curItem = tempData[i]

    infoBoxData[c] = {
      id: curItem._id,
      title: curItem.title,
      imagePath: curItem.image.path, // add alternate image path in case of error
      description: curItem.content,
      priority: curItem.priority,
      arketypeID: curItem.arketype_ID
    }
  }
  return infoBoxData
}

export const parseAbout = (data) => {
  // eslint-disable-next-line one-var
  const aboutData = [], tempData = data?.entries
  // it's quicker to count down
  for (let i = tempData.length - 1, c = 0; i > -1; --i, ++c) {
    const curItem = tempData[i]

    aboutData[c] = {
      id: curItem._id,
      title: curItem.title,
      subtitle: curItem.subtitle,
      summary: curItem.summary,
      date: curItem.date,
      contentLeft: curItem.contentLeft,
      contentRight: curItem.contentRight
    }
  }
  return aboutData
}

export const parseNews = (data) => {
  // eslint-disable-next-line one-var
  const newsData = [],
    tempData = data?.entries
  // it's quicker to count down
  for (let i = tempData.length - 1, c = 0; i > -1; --i, ++c) {
    const curItem = tempData[i]

    newsData[c] = {
      id: curItem._id,
      title: curItem.title,
      summary: curItem.summary,
      date: curItem.date,
      content: curItem.content
    }
  }
  return newsData
}

export const parseImageData = (data) => {
  // eslint-disable-next-line one-var
  const imageData = [],
    tempData = data?.entries
  // it's quicker to count down
  for (let i = tempData.length - 1, c = 0; i > -1; --i, ++c) {
    const curItem = tempData[i]
    imageData[c] = {
      width: curItem.width,
      height: curItem.height
    }
  }
  return imageData
}

export const parseKnownIssues = (data) => {
  const knownIssuesData = {
    title: data.title,
    updated: data.updated,
    content: data.content
  }
  return knownIssuesData
}
export const parseHero = (data) => {
  const heroData = {
    title: data.title,
    imagePath: data.image.path,
    description: data.content
  }
  return heroData
}

export const parseFeedback = (data) => {
  // eslint-disable-next-line one-var
  const feedbackData = [], tempData = data?.entries
  // it's quicker to count down
  for (let i = tempData.length - 1, c = 0; i > -1; --i, ++c) {
    const curItem = tempData[i]

    feedbackData[c] = {
      id: curItem._id,
      title: curItem.title,
      subtitle: curItem.subtitle,
      summary: curItem.summary,
      date: curItem.date,
      content: curItem.content
    }
  }
  return feedbackData
}

export const parseArketyper = (data) => {
  // eslint-disable-next-line one-var
  const arketyperData = [],
    tempData = data

  for (let i = tempData.length - 1, c = 0; i > -1; --i, ++c) {
    const curItem = tempData[i]

    arketyperData[c] = curItem
  }
  return arketyperData
}
export const parseArketyperKortvaerker = (data) => {
  // eslint-disable-next-line one-var
  const arketyperKortvaerkerData = [],
    tempData = data
  // it's quicker to count down
  for (let i = tempData.length - 1, c = 0; i > -1; --i, ++c) {
    const curItem = tempData[i]

    arketyperKortvaerkerData[c] = {
      arketype: curItem.arketype,
      arkenavn: curItem.arkenavn,
      kortvaerker: curItem.kortvaerker
    }
  }
  return arketyperKortvaerkerData
}
export const parseDaekningsomraader = (data) => {
  // eslint-disable-next-line one-var
  const daekningsomraaderData = [],
    tempData = data

  for (let i = tempData.length - 1, c = 0; i > -1; --i, ++c) {
    const curItem = tempData[i]

    daekningsomraaderData[c] = curItem
  }
  return daekningsomraaderData.sort()
}

export const parseKortvaerker = (data) => {
  // eslint-disable-next-line one-var
  const kortvaerkerData = [],
    tempData = data

  for (let i = tempData.length - 1, c = 0; i > -1; --i, ++c) {
    const curItem = tempData[i]

    kortvaerkerData[c] = curItem
  }
  return kortvaerkerData.sort()
}

export const parseMaalestok = (data) => {
  // eslint-disable-next-line one-var
  const maalstokData = [],
    tempData = data

  for (let i = tempData.length - 1, c = 0; i > -1; --i, ++c) {
    const curItem = tempData[i]

    maalstokData[c] = curItem
  }
  return maalstokData.sort((a, b) => {
    const tempA = +a.substring(2)
    const tempB = +b.substring(2)
    return (tempA === tempB) ? 0 : ((tempA > tempB) ? 1 : -1)
  })
}

export const parseKort = (data) => {
  // eslint-disable-next-line one-var
  const kortData = [],
    tempData = data?.kort ?? []
  for (let i = 0, iEnd = tempData.length; i < iEnd; ++i) {
    const curItem = tempData[i]

    kortData[i] = {
      arketype: curItem.arketype,
      id: curItem.id,
      titel: curItem.titel,
      daekningsomraade: curItem.daekningsomraade.toString(),
      kortvaerk: curItem.kortvaerk,
      gaeldendefra: curItem.gaeldendefra,
      gaeldendetil: curItem.gaeldendetil,
      kortbladnummer: curItem.kortbladnummer,
      maalestok: curItem.maalestok,
      filer: curItem.filer,
      aarformaalt: curItem.aarformaalt,
      aarforudgivelse: curItem.aarforudgivelse,
      alternativtitel: curItem.alternativtitel,
      bemaerkning: curItem.bemaerkning,
      originalkortprojektion: curItem.originalkortprojektion,
      originalehjoernekoordinater: curItem.originalehjoernekoordinater,
      stedbetegnelse: curItem.stedbetegnelse,
      tegner: curItem.tegner,
      udgiver: curItem.udgiver,
      uniktkortnavn: curItem.uniktkortnavn
    }
  }
  return kortData
}
