import type { Star } from '../types/star';
import { StellarBar } from './StellarBar';

interface StarCardProps {
  star: Star;
  onClick?: (star: Star) => void;
}

const SPECTRAL_CLASSES: Record<string, { label: string; color: string; icon: string }> = {
  O: { label: 'Blue Giant', color: '#4a7bb5', icon: '🔵' },
  B: { label: 'Blue-White', color: '#87ceeb', icon: '🔷' },
  A: { label: 'White', color: '#f5e6c8', icon: '⚪' },
  F: { label: 'Yellow-White', color: '#f0d888', icon: '⭐' },
  G: { label: 'Yellow Dwarf', color: '#e8c878', icon: '🌞' },
  K: { label: 'Orange Dwarf', color: '#d4a06a', icon: '🟠' },
  M: { label: 'Red Dwarf', color: '#cc5555', icon: '🔴' },
};

function getStarIcon(spectralClass: string): string {
  return SPECTRAL_CLASSES[spectralClass]?.icon ?? '✦';
}

function getStarColor(spectralClass: string): string {
  return SPECTRAL_CLASSES[spectralClass]?.color ?? '#c8a06a';
}

const STATUS_LABELS: Record<string, string> = {
  dormant: '● Dormant',
  burning: '● Burning',
  supernova: '● Supernova',
  pulsar: '● Pulsar',
  giant: '● Giant',
};

export function StarCard({ star, onClick }: StarCardProps) {
  const starColor = getStarColor(star.spectralClass);
  const starIcon = getStarIcon(star.spectralClass);
  const spec = SPECTRAL_CLASSES[star.spectralClass];

  return (
    <div
      className="star-card"
      onClick={() => onClick?.(star)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(star); }}
    >
      <div
        className="star-card__icon"
        style={{
          color: starColor,
          textShadow: `0 0 15px ${starColor}`,
          filter: `drop-shadow(0 0 8px ${starColor})`,
        }}
      >
        {starIcon}
      </div>
      <div className="star-card__name">{star.name}</div>
      <div className="star-card__constellation">
        Class {star.spectralClass} · {spec?.label ?? 'Star'}
      </div>

      <div className="star-card__status">
        <div>
          <span className="cosmic-label">✦ Magnitude</span>
          <StellarBar
            value={star.magnitude}
            variant="magnitude"
            label={`${star.magnitude}%`}
          />
        </div>
        <div>
          <span className="cosmic-label">♨ Heat</span>
          <StellarBar
            value={star.heat}
            variant="heat"
            label={`${star.heat}%`}
          />
        </div>
      </div>

      <div className="mt-sm" style={{
        fontSize: '9px',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
        textAlign: 'center',
        marginTop: '12px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
      }}>
        {STATUS_LABELS[star.status] ?? star.status}
      </div>
    </div>
  );
}
