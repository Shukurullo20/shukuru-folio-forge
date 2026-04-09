import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { mediaUrl } from '@/lib/env';
import { dateRange } from '@/lib/utils';

export default function ExperienceListPage() {
  const { data: experiences } = useQuery({
    queryKey: ['experiences'],
    queryFn: () => api.experienceList(),
  });

  const getLogo = (images: any[]) => {
    if (!images?.length) return null;
    return images.find((i: any) => i.role === 'thumbnail') || images[0];
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>Experience</h1>
      <p className="text-sm mt-1 mb-6" style={{ color: 'var(--fg3)' }}>Where I've worked</p>

      <div className="flex flex-col gap-3">
        {experiences?.map(exp => {
          const logo = getLogo(exp.images);
          return (
            <Link
              key={exp.slug}
              to={`/experience/${exp.slug}`}
              className="flex items-center gap-4 p-4 rounded-lg transition-all hover:opacity-80"
              style={{ border: '1px solid var(--border)' }}
            >
              {logo ? (
                <img
                  src={mediaUrl(logo.filename)}
                  alt={logo.alt || exp.title}
                  className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                  style={{ border: '1px solid var(--border)' }}
                  loading="lazy"
                />
              ) : (
                <div
                  className="w-11 h-11 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-semibold"
                  style={{ background: 'var(--bg3)', color: 'var(--fg3)' }}
                >
                  {exp.title.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium block truncate" style={{ color: 'var(--fg)' }}>{exp.title}</span>
                <span className="text-xs" style={{ color: '#2a9d8f' }}>{exp.position}</span>
                <span className="text-xs block mt-0.5" style={{ color: 'var(--fg3)' }}>
                  {dateRange(exp.started_at, exp.finished_at)}
                </span>
              </div>
              <ArrowRight size={14} className="flex-shrink-0" style={{ color: 'var(--fg3)' }} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
