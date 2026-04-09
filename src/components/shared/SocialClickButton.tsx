import { api } from '@/lib/api';
import { mediaUrl } from '@/lib/env';
import type { SocialLink } from '@/types/api';

interface Props {
  social: SocialLink;
}

export function SocialClickButton({ social }: Props) {
  const handleClick = () => {
    api.socialClick(social.id);
    window.open(social.link, '_blank', 'noopener');
  };

  return (
    <button
      onClick={handleClick}
      className="opacity-60 hover:opacity-100 transition-opacity"
      title={social.alt}
    >
      <img
        src={mediaUrl(social.image_path)}
        alt={social.image_alt || social.alt}
        width={16}
        height={16}
        className="dark:invert"
      />
    </button>
  );
}
