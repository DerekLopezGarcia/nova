import { useState, type FormEvent } from 'react';
import { CosmicButton } from './CosmicButton';

interface CreateStarDialogProps {
  onClose: () => void;
  onCreate: (name: string, spectralClass: string, description: string) => void;
}

const SPECTRAL_CLASSES = [
  { value: 'O', label: 'O — Blue Giant (massive, hot)' },
  { value: 'B', label: 'B — Blue-White' },
  { value: 'A', label: 'A — White (brightest)' },
  { value: 'F', label: 'F — Yellow-White' },
  { value: 'G', label: 'G — Yellow Dwarf (like our Sun)' },
  { value: 'K', label: 'K — Orange Dwarf' },
  { value: 'M', label: 'M — Red Dwarf (small, cool)' },
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
        <h2 className="cosmic-dialog__title">✦ Discover a New Star</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-md">
            <label className="cosmic-label">Star Name</label>
            <input
              className="cosmic-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Nova Prime"
              autoFocus
              required
            />
          </div>

          <div className="mb-md">
            <label className="cosmic-label">Spectral Class</label>
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
            <label className="cosmic-label">Description (optional)</label>
            <textarea
              className="cosmic-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this star's purpose..."
              rows={3}
            />
          </div>

          <div className="cosmic-dialog__actions">
            <CosmicButton variant="default" onClick={onClose}>
              Cancel
            </CosmicButton>
            <CosmicButton variant="gold" type="submit">
              ✦ Discover!
            </CosmicButton>
          </div>
        </form>
      </div>
    </div>
  );
}
