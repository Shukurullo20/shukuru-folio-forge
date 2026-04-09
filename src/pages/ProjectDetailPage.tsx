import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import { api } from '@/lib/api';
import { mediaUrl } from '@/lib/env';
import { dateRange } from '@/lib/utils';
import { BackLink } from '@/components/shared/BackLink';
import { ReadingTracker } from '@/components/shared/ReadingTracker';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => api.projectDetail(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <div className="animate-fade-in py-8 text-xs" style={{ color: 'var(--fg3)' }}>Loading...</div>;
  if (!data) return <div className="py-8 text-xs" style={{ color: 'var(--fg3)' }}>Project not found</div>;

  const { project, stacks, links, hashtags, images } = data;

  // Group stacks by category
  const stackGroups: Record<string, { category: string; items: string[] }> = {};
  stacks?.forEach(s => {
    const key = s.category.title;
    if (!stackGroups[key]) stackGroups[key] = { category: key, items: [] };
    stackGroups[key].items.push(s.name);
  });

  return (
    <div className="animate-fade-in">
      <BackLink to="/projects" label="Back" />
      <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--fg)' }}>{project.title}</h1>
      <p className="text-xs mb-2" style={{ color: 'var(--fg3)' }}>
        {dateRange(project.started_at, project.finished_at)}
      </p>

      {hashtags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {hashtags.map(h => (
            <span key={h.id} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg3)', color: 'var(--fg2)' }}>
              #{h.name}
            </span>
          ))}
        </div>
      )}

      {images?.length > 0 && (
        <div className="grid gap-4 mb-6">
          {images.map(img => (
            <img
              key={img.id}
              src={mediaUrl(img.filename)}
              alt={img.alt || project.title}
              className="w-full aspect-video object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      {Object.values(stackGroups).length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--fg)' }}>Tech Stack</h2>
          {Object.values(stackGroups).map(group => (
            <div key={group.category} className="mb-3">
              <p className="text-xs mb-1.5" style={{ color: 'var(--fg3)' }}>{group.category}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map(name => (
                  <span key={name} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg3)', color: 'var(--fg2)' }}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {links?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--fg)' }}>Links</h2>
          <div className="flex flex-col gap-2">
            {links.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
                style={{ color: '#2a9d8f' }}
              >
                <ExternalLink size={12} />
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}

      <ReadingTracker slug={slug!} contentType="PROJECT" />
    </div>
  );
}
