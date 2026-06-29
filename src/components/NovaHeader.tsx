import { CosmicButton } from './CosmicButton';

interface NovaHeaderProps {
  starCount: number;
  alignmentsCompleted: number;
  onCreateStar: () => void;
}

export function NovaHeader({ starCount, alignmentsCompleted, onCreateStar }: NovaHeaderProps) {
  return (
    <header className="nova-header">
      <div className="nova-header__brand">
        <span style={{ fontSize: '24px', filter: 'drop-shadow(0 0 10px rgba(200,160,106,0.4))' }}>
          ✦
        </span>
        <div>
          <h1 className="nova-header__title">Nova</h1>
          <div className="nova-header__subtitle">Atlas Estelar</div>
        </div>
      </div>

      <div className="nova-header__stats">
        <div className="nova-header__stat">
          <span>✦</span>
          <span><span className="nova-header__stat-value">{starCount}</span> estrellas</span>
        </div>
        <div className="nova-header__stat">
          <span>⟡</span>
          <span><span className="nova-header__stat-value">{alignmentsCompleted}</span> alineaciones</span>
        </div>
        <CosmicButton variant="gold" onClick={onCreateStar}>
          ✦ Descubrir estrella
        </CosmicButton>
      </div>
    </header>
  );
}
