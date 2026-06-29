import { useState, type FormEvent } from 'react';
import { PixelButton } from './PixelButton';

interface CreateAgentDialogProps {
  onClose: () => void;
  onCreate: (name: string, model: string, systemPrompt: string) => void;
}

export function CreateAgentDialog({ onClose, onCreate }: CreateAgentDialogProps) {
  const [name, setName] = useState('');
  const [model, setModel] = useState('opencode-go/deepseek-v4-flash');
  const [systemPrompt, setSystemPrompt] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim(), model, systemPrompt.trim());
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--space-md)',
      }}
      onClick={onClose}
    >
      <div
        className="pixel-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '420px' }}
      >
        <h2 className="pixel-dialog__title">🌱 Plant a New Agent</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-md">
            <label className="pixel-label">Agent Name</label>
            <input
              className="pixel-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. CropWatch"
              autoFocus
              required
            />
          </div>

          <div className="mb-md">
            <label className="pixel-label">Model</label>
            <select
              className="pixel-input"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={{ appearance: 'auto' }}
            >
              <option value="opencode-go/deepseek-v4-flash">DeepSeek V4 Flash</option>
              <option value="opencode-go/sonnet">Sonnet</option>
              <option value="opencode-go/general">General</option>
            </select>
          </div>

          <div className="mb-md">
            <label className="pixel-label">System Prompt (optional)</label>
            <textarea
              className="pixel-input"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Describe what this agent should do..."
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="pixel-dialog__actions">
            <PixelButton variant="default" onClick={onClose}>
              Cancel
            </PixelButton>
            <PixelButton variant="green" type="submit">
              🌱 Plant!
            </PixelButton>
          </div>
        </form>
      </div>
    </div>
  );
}
