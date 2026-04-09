import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { BackLink } from '@/components/shared/BackLink';
import { RichTextRenderer } from '@/components/shared/RichTextRenderer';
import { ReadingTracker } from '@/components/shared/ReadingTracker';
import { StatusBadge } from '@/components/shared/StatusBadge';

export default function KnowledgeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['knowledge', slug],
    queryFn: () => api.knowledgeDetail(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <div className="animate-fade-in py-8 text-xs" style={{ color: 'var(--fg3)' }}>Loading...</div>;
  if (!data) return <div className="py-8 text-xs" style={{ color: 'var(--fg3)' }}>Not found</div>;

  const item = data.know_knowing;

  return (
    <div className="animate-fade-in">
      <BackLink to="/knowledge" label="Back" />
      <h1 className="text-xl font-semibold mb-2" style={{ color: 'var(--fg)' }}>{item.title}</h1>
      <div className="flex items-center gap-2 mb-6">
        <StatusBadge status={item.status} />
        <span className="text-xs" style={{ color: 'var(--fg3)' }}>{formatDate(item.started_at)}</span>
        {item.finally_at && (
          <span className="text-xs" style={{ color: 'var(--fg3)' }}>— {formatDate(item.finally_at)}</span>
        )}
      </div>

      <RichTextRenderer html={item.text} />
      <ReadingTracker slug={slug!} contentType="KNOW_KNOWING" />
    </div>
  );
}
