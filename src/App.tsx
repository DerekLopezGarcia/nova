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
        lastAlignment: 'Just born! 💫',
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
      <NovaHeader
        starCount={stars.length}
        alignmentsCompleted={totalAlignments}
        onCreateStar={() => setShowCreate(true)}
      />

      <main className="app__main">
        {stars.length === 0 ? (
          <div className="empty-cosmos">
            <div className="empty-cosmos__icon animate-float">🌌</div>
            <p className="empty-cosmos__text">
              The cosmos is empty.<br />
              Discover your first star to begin.
            </p>
            <p className="empty-cosmos__hint">
              Click "Discover Star" to light up the sky 💫
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-md">
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                color: 'var(--text-gold)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                ✦ Your Constellation
              </h2>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--text-secondary)',
              }}>
                {stars.length} star{stars.length !== 1 ? 's' : ''} · {totalAlignments} alignments
              </span>
            </div>

            <div className="nova-grid">
              {stars.map((star) => (
                <StarCard
                  key={star.id}
                  star={star}
                  onClick={handleStarClick}
                />
              ))}
            </div>
          </>
        )}

        {selectedStar && (
          <CosmicPanel
            variant="gold"
            className="mt-lg animate-slide-up"
            title={`✦ ${selectedStar.name}`}
          >
            <div style={{ fontSize: '12px', lineHeight: '2', color: 'var(--text-primary)' }}>
              <p><strong>Spectral Class:</strong> {selectedStar.spectralClass}</p>
              <p><strong>Status:</strong> {selectedStar.status}</p>
              <p><strong>Alignments completed:</strong> {selectedStar.alignmentsCompleted}</p>
              <p><strong>Last alignment:</strong> {selectedStar.lastAlignment}</p>
              <p><strong>Discovered:</strong> {new Date(selectedStar.discoveredAt).toLocaleDateString()}</p>
              {selectedStar.description && (
                <p><strong>Description:</strong> {selectedStar.description}</p>
              )}
            </div>
            <div className="mt-md text-center">
              <button
                className="cosmic-btn cosmic-btn--sm"
                onClick={() => setSelectedStar(null)}
              >
                ✦ Close
              </button>
            </div>
          </CosmicPanel>
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
