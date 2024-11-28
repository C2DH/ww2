import { marked } from "marked";

export function truncateText(text, maxLength) {
    if (text && text !== "" && text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

export function convertToHtml(text) {
    
    if (containsMarkdown(text)) {
        return marked(text)
    } else {
        return text
    }
}

function containsMarkdown(text) {
    const markdownRegex = /(?:__|[*#_~`]|```|--|\+\+|\[\[|\]\]|\(\()/;
    return markdownRegex.test(text);
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

export async function fetchData(endpoint, filters = {}, limit = 10, offset = 0) {

    const searchParams = new URLSearchParams()

    if (filters && Object.keys(filters).length > 0) {
        searchParams.append("filters", JSON.stringify(filters))
    }

    if (limit) {
        searchParams.append("limit", limit)
    }
    if (offset) {
        searchParams.append("offset", offset)
    }

    const url = `/api/${endpoint}/?${searchParams.toString()}`

    try {
        const response = await fetch(url);

        if (response.status === 200) {
            return await response.json()
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données: ', error)
    }
}

export async function fetchFacets(endpoint, facets, filters) {

    // https://ww2.lu/api/document/?facets=data__authors&filters={"data__contains":{"authors":["Sonja Kmec"]}}
    // https://ww2.lu//api/document/?facets=data__authors&filters={"data__contains":{"authors":1922, Robert Lewis Koehl}}

    let url

    if (filters) {
            const filterObject = { data__contains: { authors: filters } };
            const filterString = encodeURIComponent(JSON.stringify(filterObject));
            url = `/api/${endpoint}/?facets=${facets}&filters=${filterString}`;
    } else {
        url = `/api/${endpoint}/?facets=${facets}`
    }


    try {
        const response = await fetch(url)
        if (response.status === 200) {
            return response.json()
        }

    } catch (error) {
        console.error('Erreur lors de la récupération des données: ', error)
        throw error
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

        themesData.map(theme => {
            theme.stories.map(note => {
                notes.push(note)
            })
        })
    }

    return notes
}



export function formatDate(input, lang) {
    const date = new Date(input)
    return date.toLocaleDateString(lang.replace('_', '-'), {
        month: 'long',
        year: 'numeric'
    })
}


export function transformDate(date) {
    const months = {
        "Jan": "01",
        "Feb": "02",
        "Mar": "03",
        "Apr": "04",
        "May": "05",
        "Jun": "06",
        "Jul": "07",
        "Aug": "08",
        "Sep": "09",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12"
    }

    const [month, year] = date.split("-")
    return new Date(`${year}-${months[month]}-01`)
}