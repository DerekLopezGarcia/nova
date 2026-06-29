import { useState, useCallback } from 'react';
import { NovaHeader } from './components/NovaHeader';
import { StarCard } from './components/StarCard';
import { CosmicPanel } from './components/CosmicPanel';
import { CreateStarDialog } from './components/CreateStarDialog';
import type { Star } from './types/star';
import { SAMPLE_STARS } from './data/sample-stars';
import './styles/cosmic-theme.css';

export default function App() {
  const [stars, setStars] = useState<Star[]>(SAMPLE_STARS);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);

  const totalAlignments = stars.reduce((sum, s) => sum + s.alignmentsCompleted, 0);

  const handleCreateStar = useCallback(
    (name: string, spectralClass: string, description: string) => {
      const newStar: Star = {
        id: `star-${Date.now()}`,
        name,
        spectralClass,
        status: 'dormant',
        magnitude: 100,
        heat: 100,
        lastAlignment: 'Acabo de nacer',
        discoveredAt: new Date().toISOString(),
        description,
        alignmentsCompleted: 0,
      };
      setStars((prev) => [...prev, newStar]);
      setShowCreate(false);
    },
    [],
  );

  const handleStarClick = useCallback((star: Star) => {
    setSelectedStar(star);
  }, []);

  return (
    <div className="app" style={{ position: 'relative', zIndex: 1 }}>
      {/* Constellation background lines */}
      <svg className="constellation-bg" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <line className="constellation-line" x1="15%" y1="30%" x2="35%" y2="50%" />
        <line className="constellation-line" x1="35%" y1="50%" x2="55%" y2="35%" />
        <line className="constellation-line" x1="55%" y1="35%" x2="75%" y2="55%" />
        <line className="constellation-line" x1="75%" y1="55%" x2="85%" y2="40%" />
        <line className="constellation-line" x1="25%" y1="65%" x2="45%" y2="50%" />
        <line className="constellation-line" x1="45%" y1="50%" x2="65%" y2="70%" />
        <line className="constellation-line" x1="65%" y1="70%" x2="85%" y2="55%" />
      </svg>

      <NovaHeader
        starCount={stars.length}
        alignmentsCompleted={totalAlignments}
        onCreateStar={() => setShowCreate(true)}
      />

      <main className="app__main">
        {stars.length === 0 ? (
          <div className="empty-cosmos">
            <div className="empty-cosmos__icon">🌌</div>
            <p className="empty-cosmos__text">
              El cosmos está vacío.<br />
              Descubre tu primera estrella para empezar.
            </p>
            <p className="empty-cosmos__hint">
              Haz clic en "Descubrir estrella" para iluminar el cielo ✦
            </p>
          </div>
        ) : (
          <div className="nova-grid-wrapper">
            <div className="nova-grid">
              {stars.map((star) => (
                <StarCard
                  key={star.id}
                  star={star}
                  onClick={handleStarClick}
                />
              ))}
            </div>
          </div>
        )}

        {selectedStar && (
          <div className="star-detail-overlay">
            <CosmicPanel
              variant="gold"
              className="animate-slide-up"
              title={`✦ ${selectedStar.name}`}
            >
              <div style={{ fontSize: '12px', lineHeight: '2.2', color: 'var(--text-primary)' }}>
                <p>        <strong>Clase espectral:</strong> {selectedStar.spectralClass}</p>
                <p>        <strong>Estado:</strong> {selectedStar.status}</p>
                <p>        <strong>Alineaciones:</strong> {selectedStar.alignmentsCompleted}</p>
                <p>        <strong>Última alineación:</strong> {selectedStar.lastAlignment}</p>
                <p>        <strong>Descubierta:</strong> {new Date(selectedStar.discoveredAt).toLocaleDateString()}</p>
                {selectedStar.description && (
                  <p style={{ marginTop: '8px', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                    "{selectedStar.description}"
                  </p>
                )}
              </div>
              <div className="mt-md text-center">
                <button
                  className="cosmic-btn"
                  onClick={() => setSelectedStar(null)}
                >
                  Cerrar
                </button>
              </div>
            </CosmicPanel>
          </div>
        )}
      </main>

      {showCreate && (
        <CreateStarDialog
          onClose={() => setShowCreate(false)}
          onCreate={handleCreateStar}
        />
      )}
    </div>
  );
}
