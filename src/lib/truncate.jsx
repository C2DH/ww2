
export function truncateText(text, maxLegth) {
    if (text.length > maxLegth) {
      return text.substring(0, maxLegth) + '...';
    }
    return text;
}