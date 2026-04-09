import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { mediaUrl } from '@/lib/env';
import { formatDate, getSiteContentValue } from '@/lib/utils';
import { RichTextRenderer } from '@/components/shared/RichTextRenderer';
import { SocialClickButton } from '@/components/shared/SocialClickButton';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { API_BASE_URL } from '@/lib/env';

export default function HomePage() {
  const { data: siteContent } = useQuery({ queryKey: ['site-content'], queryFn: api.siteContent });
  const { data: socials } = useQuery({ queryKey: ['social-links'], queryFn: api.socialLinks });
  const { data: blogs } = useQuery({ queryKey: ['blogs-home'], queryFn: () => api.blogList(5, 0) });
  const { data: projects } = useQuery({ queryKey: ['projects-home'], queryFn: () => api.projectList(6, 0) });

  const content = siteContent?.content ?? [];
  const richContent = siteContent?.['rich-content'] ?? [];

  const fullName = getSiteContentValue(content, 'full_name');
  const position = getSiteContentValue(content, 'position');
  const shortDesc = getSiteContentValue(content, 'short_description');
  const imageUrl = getSiteContentValue(content, 'image_url');
  const aboutMe = getSiteContentValue(richContent, 'about_me');

  const profileImgUrl = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`) : '';

  const getThumbnail = (images: any[]) => {
    if (!images?.length) return null;
    return images.find((i: any) => i.role === 'thumbnail') || images[0];
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--fg)' }}>{fullName}</h1>
          <p className="text-sm mt-1" style={{ color: '#2a9d8f' }}>{position}</p>
          <p className="text-sm mt-2" style={{ color: 'var(--fg3)' }}>{shortDesc}</p>
          <div className="flex items-center gap-3 mt-3">
            {socials?.map(s => <SocialClickButton key={s.id} social={s} />)}
          </div>
        </div>
        {profileImgUrl && (
          <img
            src={profileImgUrl}
            alt={fullName}
            className="w-16 h-16 rounded-full flex-shrink-0 object-cover"
            style={{ border: '1px solid var(--border)' }}
          />
        )}
      </div>

      {/* About */}
      {aboutMe && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--fg)' }}>About</h2>
          <RichTextRenderer html={aboutMe} />
        </section>
      )}

      {/* Recent Posts */}
      {blogs && blogs.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Recent Posts</h2>
            <Link to="/blog" className="text-xs hover:opacity-70" style={{ color: 'var(--fg3)' }}>
              All posts →
            </Link>
          </div>
          {blogs.map(blog => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="flex items-center justify-between py-3 transition-opacity hover:opacity-70"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <span className="text-sm" style={{ color: 'var(--fg)' }}>{blog.title}</span>
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                <span className="text-xs" style={{ color: 'var(--fg3)' }}>{formatDate(blog.date)}</span>
                <ArrowRight size={12} style={{ color: 'var(--fg3)' }} />
              </div>
            </Link>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Projects</h2>
            <Link to="/projects" className="text-xs hover:opacity-70" style={{ color: 'var(--fg3)' }}>
              All projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(project => {
              const thumb = getThumbnail(project.images);
              return (
                <Link
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                  className="rounded-lg overflow-hidden transition-all hover:opacity-80"
                  style={{ border: '1px solid var(--border)' }}
                >
                  {thumb && (
                    <div className="aspect-video overflow-hidden" style={{ background: 'var(--bg2)' }}>
                      <img
                        src={mediaUrl(thumb.filename)}
                        alt={thumb.alt || project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{project.title}</span>
                      <ArrowRight size={12} className="mt-1 flex-shrink-0 ml-2" style={{ color: 'var(--fg3)' }} />
                    </div>
                    <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--fg2)' }}>{project.short_description}</p>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={project.status} />
                      <span className="text-xs" style={{ color: 'var(--fg3)' }}>{project.date_in_year}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
