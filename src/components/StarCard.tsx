import type { Star } from '../types/star';
import { StellarBar } from './StellarBar';

interface StarCardProps {
  star: Star;
  onClick?: (star: Star) => void;
}

const SPECTRAL_CLASSES: Record<string, { label: string; color: string; icon: string }> = {
  O: { label: 'Gigante Azul', color: '#4a7bb5', icon: '🔵' },
  B: { label: 'Azul-Blanca', color: '#6a9bcc', icon: '🔷' },
  A: { label: 'Blanca Brillante', color: '#f5e6c8', icon: '⚪' },
  F: { label: 'Amarilla-Blanca', color: '#f0d888', icon: '⭐' },
  G: { label: 'Enana Amarilla', color: '#e8c878', icon: '🌞' },
  K: { label: 'Enana Naranja', color: '#d4a06a', icon: '🟠' },
  M: { label: 'Enana Roja', color: '#cc5555', icon: '🔴' },
};

function getStarInfo(spectralClass: string) {
  return SPECTRAL_CLASSES[spectralClass] ?? { label: 'Desconocida', color: '#c8a06a', icon: '✦' };
}

const STATUS_STYLES: Record<string, { label: string; color: string }> = {
  dormant: { label: '● Latente', color: '#4a7bb5' },
  burning: { label: '● Activa', color: '#e8c878' },
  supernova: { label: '● Supernova', color: '#c76b9a' },
  pulsar: { label: '● Púlsar', color: '#87ceeb' },
  giant: { label: '● Gigante', color: '#d4a06a' },
};

export function StarCard({ star, onClick }: StarCardProps) {
  const info = getStarInfo(star.spectralClass);
  const statusStyle = STATUS_STYLES[star.status] ?? { label: star.status, color: '#aaa' };

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
          color: info.color,
          textShadow: `0 0 20px ${info.color}80, 0 0 40px ${info.color}40`,
          filter: `drop-shadow(0 0 12px ${info.color}60)`,
        }}
      >
        {info.icon}
      </div>

      <div className="star-card__name">{star.name}</div>

      <div className="star-card__constellation">
        Clase {star.spectralClass} · {info.label}
      </div>

      <div className="star-card__status-badge" style={{ color: statusStyle.color }}>
        {statusStyle.label}
      </div>

      <div className="star-card__stats">
        <div>
          <span className="cosmic-label">✦ Magnitud</span>
          <StellarBar
            value={star.magnitude}
            variant="magnitude"
            label={`${star.magnitude}%`}
          />
        </div>
        <div>
          <span className="cosmic-label">♨ Calor</span>
          <StellarBar
            value={star.heat}
            variant="heat"
            label={`${star.heat}%`}
          />
        </div>
      </div>

      <div className="star-card__footer">
        <span className="cosmic-label">{star.alignmentsCompleted} alineaciones</span>
      </div>
    </div>
  );
}
