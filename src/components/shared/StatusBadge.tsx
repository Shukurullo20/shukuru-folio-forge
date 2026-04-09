interface Props {
  status: string;
}

export function StatusBadge({ status }: Props) {
  const isGreen = status === 'completed' || status === 'learned';
  const isYellow = status === 'in_progress' || status === 'learning';
  const isBlue = status === 'learning';

  const bgColor = isGreen
    ? 'rgba(42,157,143,0.1)'
    : isYellow
    ? 'rgba(59,130,246,0.1)'
    : 'rgba(150,150,150,0.1)';

  const textColor = isGreen
    ? 'var(--accent)'
    : isYellow
    ? '#3b82f6'
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
