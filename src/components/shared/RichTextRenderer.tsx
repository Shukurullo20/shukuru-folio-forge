import { prefixMediaSrcs } from '@/lib/utils';

interface Props {
  html: string;
}

export function RichTextRenderer({ html }: Props) {
  const processed = prefixMediaSrcs(html);
  return (
    <div
      className="ck-prose"
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}
