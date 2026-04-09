import { prefixMediaSrcs } from '@/lib/utils';

interface Props {
  html: string;
}

export function RichTextRenderer({ html }: Props) {
  const processed = prefixMediaSrcs(html);
  return (
    <div
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}
