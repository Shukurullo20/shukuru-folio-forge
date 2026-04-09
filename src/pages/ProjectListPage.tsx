import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { mediaUrl } from '@/lib/env';
import { StatusBadge } from '@/components/shared/StatusBadge';

export default function ProjectListPage() {
  const [offset, setOffset] = useState(0);
  const [all, setAll] = useState<any[]>([]);

  const { data } = useQuery({
    queryKey: ['projects', offset],
    queryFn: async () => {
      const result = await api.projectList(10, offset);
      if (offset === 0) setAll(result);
      else setAll(prev => [...prev, ...result]);
      return result;
    },
  });

  const projects = offset === 0 ? (data ?? []) : all;
  const hasMore = data && data.length === 10;

  const getThumbnail = (images: any[]) => {
    if (!images?.length) return null;
    return images.find((i: any) => i.role === 'thumbnail') || images[0];
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>Projects</h1>
      <p className="text-sm mt-1 mb-6" style={{ color: 'var(--fg3)' }}>Things I've built</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p: any) => {
          const thumb = getThumbnail(p.images);
          return (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="rounded-lg overflow-hidden transition-all hover:opacity-80"
              style={{ border: '1px solid var(--border)' }}
            >
              {thumb && (
                <div className="aspect-video overflow-hidden" style={{ background: 'var(--bg2)' }}>
                  <img
                    src={mediaUrl(thumb.filename)}
                    alt={thumb.alt || p.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{p.title}</span>
                  <ArrowRight size={12} className="mt-1 flex-shrink-0 ml-2" style={{ color: 'var(--fg3)' }} />
                </div>
                <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--fg2)' }}>{p.short_description}</p>

                {p.hashtags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.hashtags.slice(0, 4).map((h: any) => (
                      <span
                        key={h.id}
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--bg3)', color: 'var(--fg2)' }}
                      >
                        {h.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <StatusBadge status={p.status} />
                  <span className="text-xs" style={{ color: 'var(--fg3)' }}>{p.date_in_year}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <button
          onClick={() => setOffset(prev => prev + 10)}
          className="mt-6 text-xs px-4 py-2 rounded transition-opacity hover:opacity-70"
          style={{ border: '1px solid var(--border)', color: 'var(--fg2)' }}
        >
          Load More
        </button>
      )}
    </div>
  );
}
