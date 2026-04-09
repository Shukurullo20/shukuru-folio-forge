import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface Props {
  to: string;
  label?: string;
}

export function BackLink({ to, label = 'Back' }: Props) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="inline-flex items-center gap-1 text-xs mb-6 transition-opacity hover:opacity-70"
      style={{ color: 'var(--fg3)' }}
    >
      <ArrowLeft size={12} />
      ← {label}
    </button>
  );
}
