import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
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

  return (
    <div className="animate-fade-in">
      <h1 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>Projects</h1>
      <p className="text-sm mt-1 mb-6" style={{ color: 'var(--fg3)' }}>Things I've built</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p: any) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="p-4 rounded-lg transition-opacity hover:opacity-70"
            style={{ border: '1px solid var(--border)' }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{p.title}</span>
              <ArrowRight size={12} className="mt-1 flex-shrink-0" style={{ color: 'var(--fg3)' }} />
            </div>
            <p className="text-xs mb-3" style={{ color: 'var(--fg2)' }}>{p.short_description}</p>
            <div className="flex items-center gap-2">
              <StatusBadge status={p.status} />
              <span className="text-xs" style={{ color: 'var(--fg3)' }}>{p.date_in_year}</span>
            </div>
          </Link>
        ))}
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
