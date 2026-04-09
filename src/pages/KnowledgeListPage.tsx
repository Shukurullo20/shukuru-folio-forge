import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, BookOpen } from 'lucide-react';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { StatusBadge } from '@/components/shared/StatusBadge';

export default function KnowledgeListPage() {
  const { data: items } = useQuery({
    queryKey: ['knowledge'],
    queryFn: () => api.knowledgeList(),
  });

  return (
    <div className="animate-fade-in">
      <h1 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>Learning</h1>
      <p className="text-sm mt-1 mb-6" style={{ color: 'var(--fg3)' }}>What I'm studying and have learned</p>

      {items?.map(item => (
        <Link
          key={item.slug}
          to={`/knowledge/${item.slug}`}
          className="flex items-center justify-between py-3 transition-opacity hover:opacity-70"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-start gap-2">
            <BookOpen size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--fg3)' }} />
            <div>
              <span className="text-sm block" style={{ color: 'var(--fg)' }}>{item.title}</span>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={item.status} />
                <span className="text-xs" style={{ color: 'var(--fg3)' }}>{formatDate(item.started_at)}</span>
              </div>
            </div>
          </div>
          <ArrowRight size={12} className="flex-shrink-0 ml-4" style={{ color: 'var(--fg3)' }} />
        </Link>
      ))}
    </div>
  );
}
