import { useEffect, useRef } from 'react';
import { api } from '@/lib/api';

interface Props {
  slug: string;
  contentType: 'BLOG' | 'KNOW_KNOWING' | 'PROJECT' | 'EXPERIENCE';
}

export function ReadingTracker({ slug, contentType }: Props) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const tick = () => {
      if (!document.hidden) {
        api.trackReading(slug, contentType);
      }
    };

    intervalRef.current = setInterval(tick, 15000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slug, contentType]);

  return null;
}
