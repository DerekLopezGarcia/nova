interface PixelProgressBarProps {
  value: number;       // 0-100
  max?: number;        // default 100
  variant?: 'health' | 'energy' | 'xp';
  label?: string;
  showLabel?: boolean;
}

export function PixelProgressBar({
  value,
  max = 100,
  variant = 'health',
  label,
  showLabel = true,
}: PixelProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const displayLabel = label ?? `${Math.round(pct)}%`;

  return (
    <div className="pixel-progress">
      <div
        className={`pixel-progress__fill pixel-progress__fill--${variant}`}
        style={{ width: `${pct}%` }}
      />
      {showLabel && (
        <span className="pixel-progress__label">{displayLabel}</span>
      )}
    </div>
  );
}
