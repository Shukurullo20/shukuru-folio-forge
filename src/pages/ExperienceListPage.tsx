import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { dateRange } from '@/lib/utils';

export default function ExperienceListPage() {
  const { data: experiences } = useQuery({
    queryKey: ['experiences'],
    queryFn: () => api.experienceList(),
  });

  return (
    <div className="animate-fade-in">
      <h1 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>Experience</h1>
      <p className="text-sm mt-1 mb-6" style={{ color: 'var(--fg3)' }}>Where I've worked</p>

      {experiences?.map(exp => (
        <Link
          key={exp.slug}
          to={`/experience/${exp.slug}`}
          className="flex items-center justify-between py-3 transition-opacity hover:opacity-70"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div>
            <span className="text-sm block" style={{ color: 'var(--fg)' }}>{exp.title}</span>
            <span className="text-xs" style={{ color: 'var(--fg3)' }}>{exp.position}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <span className="text-xs" style={{ color: 'var(--fg3)' }}>
              {dateRange(exp.started_at, exp.finished_at)}
            </span>
            <ArrowRight size={12} style={{ color: 'var(--fg3)' }} />
          </div>
        </Link>
      ))}
    </div>
  );
}
