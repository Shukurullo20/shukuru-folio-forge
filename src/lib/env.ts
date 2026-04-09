export const API_BASE_URL = 'https://api.mamadaliyev.uz';
export const MEDIA_BASE_URL = 'https://api.mamadaliyev.uz/media';

export function mediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/media')) return `${API_BASE_URL}${path}`;
  return `${MEDIA_BASE_URL}/${path}`;
}
