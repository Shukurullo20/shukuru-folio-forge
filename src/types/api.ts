export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  date: string;
  short_description?: string;
}

export interface BlogDetail {
  content_type: 'BLOG';
  blog: { id: number; title: string; slug: string; date: string; text: string };
  images: ImageItem[];
}

export interface ImageItem {
  id: number;
  alt: string;
  filename: string;
  role: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  short_description: string;
  status: 'draft' | 'in_progress' | 'completed';
  date_in_year: string;
  images: ImageItem[];
  hashtags: { id: number; name: string }[];
}

export interface ProjectDetail {
  content_type: 'PROJECT';
  project: { id: number; title: string; slug: string; started_at: string; finished_at: string | null };
  stacks: StackItem[];
  links: LinkItem[];
  hashtags: { id: number; name: string }[];
  images: ImageItem[];
}

export interface StackItem {
  id: number;
  name: string;
  category: { id: number; title: string };
}

export interface LinkItem {
  id: number;
  title: string;
  url: string;
  icon_link: string | null;
  image: ImageItem | null;
}

export interface ExperienceItem {
  slug: string;
  title: string;
  position: string;
  started_at: string;
  finished_at: string | null;
  images: ImageItem[];
}

export interface ExperienceDetail {
  content_type: 'EXPERIENCE';
  experience: { id: number; title: string; slug: string; position: string; description: string; started_at: string; finished_at: string | null };
  stacks: StackItem[];
  links: LinkItem[];
  images: ImageItem[];
}

export interface KnowledgeItem {
  slug: string;
  title: string;
  status: 'learning' | 'learned' | 'dropped';
  started_at: string;
  finally_at: string | null;
}

export interface KnowledgeDetail {
  content_type: 'KNOW_KNOWING';
  know_knowing: { slug: string; title: string; text: string; status: 'learning' | 'learned' | 'dropped'; started_at: string; finally_at: string | null };
}

export interface SocialLink {
  id: number;
  alt: string;
  link: string;
  icon_link: string | null;
  image_path: string;
  image_alt: string;
}

export interface SiteContent {
  content: { key: string; value: string }[];
  'rich-content': { key: string; value: string }[];
}

export interface ResumeItem {
  id: number;
  title: string;
  is_active: boolean;
  resume_file: string;
}

export interface StackCategory {
  title: string;
  id: number;
  stacks: { name: string; category_id: number; id: number }[];
}
