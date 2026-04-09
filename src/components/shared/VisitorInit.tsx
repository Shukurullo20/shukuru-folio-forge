import { useEffect } from 'react';
import { api } from '@/lib/api';

export function VisitorInit() {
  useEffect(() => {
    if (sessionStorage.getItem('visitor_init')) return;
    api.visitorInit().then(() => {
      sessionStorage.setItem('visitor_init', '1');
    }).catch(() => {});
  }, []);
  return null;
}
