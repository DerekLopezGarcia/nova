import { PixelButton } from './PixelButton';

interface HeaderProps {
  agentCount: number;
  tasksCompleted: number;
  onCreateAgent: () => void;
}

export function Header({ agentCount, tasksCompleted, onCreateAgent }: HeaderProps) {
  return (
    <header className="meadow-header">
      <div className="flex items-center gap-md">
        <span style={{ fontSize: '20px' }}>🌿</span>
        <h1 className="meadow-header__title">Prompt Meadow</h1>
      </div>

      <div className="meadow-header__stats">
        <div className="meadow-header__stat">
          <span>🐑</span>
          <span>{agentCount} agents</span>
        </div>
        <div className="meadow-header__stat">
          <span>🌾</span>
          <span>{tasksCompleted} harvests</span>
        </div>
        <PixelButton variant="gold" onClick={onCreateAgent}>
          🌱 New Agent
        </PixelButton>
      </div>
    </header>
  );
}
