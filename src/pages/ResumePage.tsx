import { useQuery } from '@tanstack/react-query';
import { FileText } from 'lucide-react';
import { api } from '@/lib/api';
import { ResumeDownloadButton } from '@/components/shared/ResumeDownloadButton';

export default function ResumePage() {
  const { data: resumes } = useQuery({
    queryKey: ['resumes'],
    queryFn: api.resumes,
  });

  return (
    <div className="animate-fade-in">
      <h1 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>Resume</h1>
      <p className="text-sm mt-1 mb-6" style={{ color: 'var(--fg3)' }}>Download my resume</p>

      <div className="flex flex-col gap-3">
        {resumes?.map(resume => (
          <div
            key={resume.id}
            className="flex items-center justify-between p-4 rounded-lg"
            style={{
              border: '1px solid var(--border)',
              backgroundColor: resume.is_active ? 'var(--accent-light)' : 'transparent',
            }}
          >
            <div className="flex items-center gap-3">
              <FileText size={16} style={{ color: 'var(--fg3)' }} />
              <div>
                <span className="text-sm" style={{ color: 'var(--fg)' }}>{resume.title}</span>
                {resume.is_active && (
                  <span className="ml-2 text-xs" style={{ color: '#2a9d8f' }}>Active</span>
                )}
              </div>
            </div>
            <ResumeDownloadButton
              resumeId={resume.id}
              resumeFile={resume.resume_file}
              title={resume.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
