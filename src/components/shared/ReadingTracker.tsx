import { useEffect, useRef } from 'react';
import { api } from '@/lib/api';

interface Props {
  slug: string;
  contentType: 'BLOG' | 'KNOW_KNOWING' | 'PROJECT' | 'EXPERIENCE';
}

export function ReadingTracker({ slug, contentType }: Props) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      api.trackReading(slug, contentType);
    }, 10000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slug, contentType]);

  return null;
}
