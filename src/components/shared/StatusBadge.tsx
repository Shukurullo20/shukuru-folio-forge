interface Props {
  status: string;
}

export function StatusBadge({ status }: Props) {
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in_progress' || status === 'learning';

  const bgColor = isCompleted
    ? 'rgba(42,157,143,0.1)'
    : isInProgress
    ? 'rgba(234,179,8,0.1)'
    : 'rgba(150,150,150,0.1)';

  const textColor = isCompleted
    ? 'var(--accent)'
    : isInProgress
    ? '#ca8a04'
    : 'var(--fg3)';

  const label = status.replace('_', ' ');

  return (
    <span
      className="inline-block px-1.5 py-0.5 text-xs rounded capitalize"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {label}
    </span>
  );
}
