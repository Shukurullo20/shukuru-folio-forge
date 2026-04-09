import { api } from '@/lib/api';
import { mediaUrl } from '@/lib/env';
import { Download } from 'lucide-react';

interface Props {
  resumeId: number;
  resumeFile: string;
  title: string;
}

export function ResumeDownloadButton({ resumeId, resumeFile, title }: Props) {
  const handleClick = () => {
    api.resumeDownload(resumeId);
    const link = document.createElement('a');
    link.href = mediaUrl(resumeFile);
    link.download = title;
    link.target = '_blank';
    link.click();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors"
      style={{ border: '1px solid var(--border)', color: 'var(--fg2)' }}
    >
      <Download size={12} />
      Download
    </button>
  );
}
