import { useState, type FormEvent } from 'react';
import { CosmicButton } from './CosmicButton';

interface CreateStarDialogProps {
  onClose: () => void;
  onCreate: (name: string, spectralClass: string, description: string) => void;
}

const SPECTRAL_CLASSES = [
  { value: 'O', label: 'O — Gigante Azul (masiva, caliente)' },
  { value: 'B', label: 'B — Azul-Blanca' },
  { value: 'A', label: 'A — Blanca (la más brillante)' },
  { value: 'F', label: 'F — Amarilla-Blanca' },
  { value: 'G', label: 'G — Enana Amarilla (como el Sol)' },
  { value: 'K', label: 'K — Enana Naranja' },
  { value: 'M', label: 'M — Enana Roja (pequeña, fría)' },
];

export function CreateStarDialog({ onClose, onCreate }: CreateStarDialogProps) {
  const [name, setName] = useState('');
  const [spectralClass, setSpectralClass] = useState('G');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim(), spectralClass, description.trim());
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 8, 26, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        className="cosmic-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="cosmic-dialog__title">✦ Descubrir una estrella nueva</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-md">
            <label className="cosmic-label">Nombre de la estrella</label>
            <input
              className="cosmic-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Nova Prime"
              autoFocus
              required
            />
          </div>

          <div className="mb-md">
            <label className="cosmic-label">Clase espectral</label>
            <select
              className="cosmic-input"
              value={spectralClass}
              onChange={(e) => setSpectralClass(e.target.value)}
              style={{ appearance: 'auto' }}
            >
              {SPECTRAL_CLASSES.map((sc) => (
                <option key={sc.value} value={sc.value}>{sc.label}</option>
              ))}
            </select>
          </div>

          <div className="mb-md">
            <label className="cosmic-label">Descripción (opcional)</label>
            <textarea
              className="cosmic-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el propósito de esta estrella..."
              rows={3}
            />
          </div>

          <div className="cosmic-dialog__actions">
            <CosmicButton variant="default" onClick={onClose}>
              Cancelar
            </CosmicButton>
            <CosmicButton variant="gold" type="submit">
              ✦ ¡Descubrir!
            </CosmicButton>
          </div>
        </form>
      </div>
    </div>
  );
}
