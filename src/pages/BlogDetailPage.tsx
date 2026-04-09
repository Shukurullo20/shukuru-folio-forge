import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { mediaUrl } from '@/lib/env';
import { formatDate } from '@/lib/utils';
import { BackLink } from '@/components/shared/BackLink';
import { RichTextRenderer } from '@/components/shared/RichTextRenderer';
import { ReadingTracker } from '@/components/shared/ReadingTracker';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => api.blogDetail(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <div className="animate-fade-in py-8 text-xs" style={{ color: 'var(--fg3)' }}>Loading...</div>;
  if (!data) return <div className="py-8 text-xs" style={{ color: 'var(--fg3)' }}>Post not found</div>;

  const { blog, images } = data;
  const coverImage = images?.[0];

  return (
    <div className="animate-fade-in">
      <BackLink to="/blog" label="Back to blog" />
      <h1 className="text-xl font-semibold mb-2" style={{ color: 'var(--fg)' }}>{blog.title}</h1>
      <p className="text-xs mb-6" style={{ color: 'var(--fg3)' }}>{formatDate(blog.date)}</p>

      {coverImage && (
        <img
          src={mediaUrl(coverImage.filename)}
          alt={coverImage.alt || blog.title}
          className="w-full aspect-video object-cover rounded-lg mb-6"
        />
      )}

      <RichTextRenderer html={blog.text} />
      <ReadingTracker slug={slug!} contentType="BLOG" />
    </div>
  );
}
