import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { SocialClickButton } from '@/components/shared/SocialClickButton';

export function Footer() {
  const { data: socials } = useQuery({
    queryKey: ['social-links'],
    queryFn: () => api.socialLinks(),
  });

  return (
    <footer
      className="mt-16"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-[768px] mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--fg3)' }}>
          © {new Date().getFullYear()} Shukurullo Mamadaliyev
        </span>
        <div className="flex items-center gap-3">
          {socials?.map(social => (
            <SocialClickButton key={social.id} social={social} />
          ))}
        </div>
      </div>
    </footer>
  );
}
