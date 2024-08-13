import { all } from "axios";
import { marked } from "marked";


export function truncateText(text, maxLegth) {
    if (text.length > maxLegth) {
        return text.substring(0, maxLegth) + '...';
    }
    return text;
}


export function convertToHtml(text, index) {
    
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