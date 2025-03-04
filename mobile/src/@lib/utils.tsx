export function wordToWordCapitalize(text: string | undefined): string {
  if (!text) {
    return '';
  }
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
