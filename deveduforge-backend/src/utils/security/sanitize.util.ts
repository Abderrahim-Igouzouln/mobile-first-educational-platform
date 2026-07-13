const htmlTagRegex = /<[^>]*>/g;

export function sanitizeHtml(input: string): string {
  return input.replace(htmlTagRegex, '');
}

export function sanitizeText(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}
