import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MEDIA_BASE_URL } from "./env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatMonthYear(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export function dateRange(start: string, end: string | null): string {
  return `${formatMonthYear(start)} — ${end ? formatMonthYear(end) : 'Present'}`;
}

export function getSiteContentValue(content: { key: string; value: string }[], key: string): string {
  return content.find(c => c.key === key)?.value ?? '';
}

export function prefixMediaSrcs(html: string): string {
  if (!html) return '';
  return html.replace(/src="(?!http)([^"]+)"/g, `src="${MEDIA_BASE_URL}/$1"`);
}
