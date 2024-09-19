import { marked } from "marked";


export function truncateText(text, maxLength) {
    if (text && text.length > maxLength) {
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
  const markdownRegex = /[#*_\-`>\[\]!]/
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