import { API_BASE_URL } from './env';
import type {
  BlogItem, BlogDetail, ProjectItem, ProjectDetail,
  ExperienceItem, ExperienceDetail, KnowledgeItem, KnowledgeDetail,
  SocialLink, SiteContent, ResumeItem, StackCategory
} from '@/types/api';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  visitorInit: () => apiFetch<{ detail: string; status: boolean; is_new_visitor: boolean }>('/api/v1/visitor/init'),

  blogList: (limit = 15, offset = 0) => apiFetch<BlogItem[]>(`/api/v1/blog/list?limit=${limit}&offset=${offset}`),
  blogDetail: (slug: string) => apiFetch<BlogDetail>(`/api/v1/blog/${slug}`),

  projectList: (limit = 10, offset = 0) => apiFetch<ProjectItem[]>(`/api/v1/project/list?limit=${limit}&offset=${offset}`),
  projectDetail: (slug: string) => apiFetch<ProjectDetail>(`/api/v1/project/${slug}`),

  experienceList: (limit = 30, offset = 0) => apiFetch<ExperienceItem[]>(`/api/v1/experience/list?limit=${limit}&offset=${offset}`),
  experienceDetail: (slug: string) => apiFetch<ExperienceDetail>(`/api/v1/experience/${slug}`),

  knowledgeList: (limit = 30, offset = 0) => apiFetch<KnowledgeItem[]>(`/api/v1/know-knowing/list?limit=${limit}&offset=${offset}`),
  knowledgeDetail: (slug: string) => apiFetch<KnowledgeDetail>(`/api/v1/know-knowing/${slug}`),

  socialLinks: () => apiFetch<SocialLink[]>('/api/v1/social/list'),
  socialClick: (id: number) => fetch(`${API_BASE_URL}/api/v1/social/click?social_link_id=${id}`, { method: 'POST' }).catch(() => {}),

  siteContent: () => apiFetch<SiteContent>('/api/v1/site-content/all'),

  resumes: () => apiFetch<ResumeItem[]>('/api/v1/resume/all'),
  resumeDownload: (id: number) => fetch(`${API_BASE_URL}/api/v1/resume/analysis-download?resume_id=${id}`, { method: 'POST' }).catch(() => {}),

  stacks: () => apiFetch<StackCategory[]>('/api/v1/stack/stacks'),

  trackReading: (slug: string, contentType: string) =>
    fetch(`${API_BASE_URL}/api/v1/analysis/${slug}?content_type=${contentType}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seconds: 15 }),
    }).catch(() => {}),
};
