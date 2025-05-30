import { marked } from 'marked'

const renderer = new marked.Renderer()
const originalLink = renderer.link
renderer.link = function (href, title, text) {
  const html = originalLink.call(this, href, title, text)
  return html.replace(
    '<a',
    '<a target="_blank" rel="noopener noreferrer" style="text-decoration: underline"'
  )
}

export function truncateText(text, maxLength) {
  if (text && text !== '' && text.length > maxLength) {
    return text.substring(0, maxLength) + '...'
  }
  return text
}

export function markdownToHtml(text) {
  if (text && text !== '') {
    return marked.parse(text, { renderer })
  }
  return text
}

export function convertToHtml(text) {
  if (containsMarkdown(text)) {
    return marked(text)
  } else {
    return text
  }
}

function containsMarkdown(text) {
  const markdownRegex = /(?:__|[*#_~`]|```|--|\+\+|\[\[|\]\]|\(\()/
  return markdownRegex.test(text)
}

export function cleanText(text) {
  return text
    .replace(/> /gm, ' ')
    .replace(/>\n/gm, ' ')
    .replace(/\\'/g, "'")
    .replace('\\"', '"')
    .replace(/"/g, '')
    .replace(/[„“]/g, '')
    .replace('?', ' ')
}

export async function fetchData(
  endpoint,
  filters = {},
  limit,
  offset = 0,
  facets = false,
  exclude = false
) {
  const searchParams = new URLSearchParams()

  if (filters && Object.keys(filters).length > 0) {
    searchParams.append('filters', JSON.stringify(filters))
  }

  if (limit) {
    searchParams.append('limit', limit)
  }
  if (offset) {
    searchParams.append('offset', offset)
  }
  if (facets) {
    searchParams.append('facets', facets)
  }

  let url = `/api/${endpoint}/?${searchParams.toString()}`

  if (exclude) {
    url = `/api/${endpoint}/?${searchParams.toString()}&exclude=%7B"tags__slug":"no-level-3"%7D`
  }

  try {
    const response = await fetch(url)

    if (response.status === 200) {
      return await response.json()
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données: ', error)
  }
}

export async function fetchFacets(
  endpoint,
  facets,
  filters = {},
  exclude,
  limit = ''
) {
  const searchParams = new URLSearchParams()

  if (facets) {
    searchParams.append('facets', facets)
  }

  if (filters && Object.keys(filters).length > 0) {
    searchParams.append('filters', JSON.stringify(filters))
  }

  let url = `/api/${endpoint}/?${searchParams.toString()}`

  if (exclude) {
    url = url + '&exclude=%7B"tags__slug":"no-level-3"%7D'
  }

  if (limit) {
    url = url + `&limit=${limit}`
  }

  try {
    const response = await fetch(url)

    if (response.status === 200) {
      return await response.json()
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données: ', error)
  }
}

export async function getAllNotes() {
  let notes = []
  const catalogue = await fetchData(`story/catalogue`)
  const allThemes = catalogue.stories

  if (catalogue && allThemes.length > 0) {
    const themesData = await Promise.all(
      allThemes.map(async (item) => {
        return fetchData(`story/${item.slug}`)
      })
    )

    themesData.map((theme) => {
      theme.stories.map((note) => {
        notes.push(note)
      })
    })
  }

  return notes
}

// export function formatDate(input, lang) {
//     const date = new Date(input)
//     return date.toLocaleDateString(lang.replace('_', '-'), {
//         month: 'long',
//         year: 'numeric'
//     })
// }

export function formatDate(input, lang) {
  const date = new Date(input)
  if (lang === 'fr_FR' || lang === 'de_DE') {
    return date.toLocaleDateString(lang.replace('_', '-'), {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } else if (lang === 'en_GB') {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }
}

export function transformDate(date) {
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  }

  const [month, year] = date.split('-')
  return new Date(`${year}-${months[month]}-01`)
}
