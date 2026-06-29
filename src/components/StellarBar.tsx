interface StellarBarProps {
  value: number;       // 0-100
  max?: number;
  variant?: 'magnitude' | 'heat' | 'nova';
  label?: string;
  showLabel?: boolean;
}

export function StellarBar({
  value,
  max = 100,
  variant = 'magnitude',
  label,
  showLabel = true,
}: StellarBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const displayLabel = label ?? `${Math.round(pct)}%`;

  return (
    <div className="stellar-bar">
      <div
        className={`stellar-bar__fill stellar-bar__fill--${variant}`}
        style={{ width: `${pct}%` }}
      />
      {showLabel && (
        <span className="stellar-bar__label">{displayLabel}</span>
      )}
    </div>
  );
}
