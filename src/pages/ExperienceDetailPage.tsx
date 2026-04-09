import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import { api } from '@/lib/api';
import { mediaUrl } from '@/lib/env';
import { dateRange } from '@/lib/utils';
import { BackLink } from '@/components/shared/BackLink';
import { RichTextRenderer } from '@/components/shared/RichTextRenderer';
import { ReadingTracker } from '@/components/shared/ReadingTracker';

export default function ExperienceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['experience', slug],
    queryFn: () => api.experienceDetail(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <div className="animate-fade-in py-8 text-xs" style={{ color: 'var(--fg3)' }}>Loading...</div>;
  if (!data) return <div className="py-8 text-xs" style={{ color: 'var(--fg3)' }}>Not found</div>;

  const { experience, stacks, links, images } = data;
  const coverImage = images?.[0];

  return (
    <div className="animate-fade-in">
      <BackLink to="/experience" label="Back" />
      <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--fg)' }}>{experience.title}</h1>
      <p className="text-sm mb-1" style={{ color: '#2a9d8f' }}>{experience.position}</p>
      <p className="text-xs mb-6" style={{ color: 'var(--fg3)' }}>
        {dateRange(experience.started_at, experience.finished_at)}
      </p>

      {coverImage && (
        <img
          src={mediaUrl(coverImage.filename)}
          alt={coverImage.alt || experience.title}
          className="w-full aspect-video object-cover rounded-lg mb-6"
        />
      )}

      {experience.description && <RichTextRenderer html={experience.description} />}

      {stacks?.length > 0 && (
        <div className="mt-6 mb-6">
          <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--fg)' }}>Tech Stack</h2>
          <div className="flex flex-wrap gap-1.5">
            {stacks.map(s => (
              <span key={s.id} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg3)', color: 'var(--fg2)' }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {links?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--fg)' }}>Links</h2>
          <div className="flex flex-col gap-2">
            {links.map(link => {
              const iconSrc = link.icon_link || (link.image ? mediaUrl(link.image.filename) : null);
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
                  style={{ color: '#2a9d8f' }}
                >
                  {iconSrc ? (
                    <img src={iconSrc} alt={link.title} width={12} height={12} className="rounded-sm" />
                  ) : (
                    <ExternalLink size={12} />
                  )}
                  {link.title}
                </a>
              );
            })}
          </div>
        </div>
      )}

      <ReadingTracker slug={slug!} contentType="EXPERIENCE" />
    </div>
  );
}
