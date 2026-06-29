import type { Agent } from '../types/agent';
import { PixelProgressBar } from './PixelProgressBar';

interface AgentCardProps {
  agent: Agent;
  onClick?: (agent: Agent) => void;
}

const AGENT_EMOJIS = ['🐝', '🐞', '🦋', '🐌', '🐛', '🐜', '🦎', '🐑', '🐄', '🐔', '🐤', '🦆'];

function getAgentEmoji(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
  }
  return AGENT_EMOJIS[Math.abs(hash) % AGENT_EMOJIS.length];
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  return (
    <div
      className="agent-card"
      onClick={() => onClick?.(agent)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(agent); }}
    >
      <div className="agent-card__icon">{getAgentEmoji(agent.id)}</div>
      <div className="agent-card__name">{agent.name}</div>
      <div className={`pixel-label text-center mb-sm`}>{agent.status}</div>

      <div className="agent-card__status">
        <div>
          <span className="pixel-label">❤️ HP</span>
          <PixelProgressBar
            value={agent.health}
            variant="health"
            label={`${agent.health}/100`}
          />
        </div>
        <div>
          <span className="pixel-label">⚡ Energy</span>
          <PixelProgressBar
            value={agent.energy}
            variant="energy"
            label={`${agent.energy}/100`}
          />
        </div>
      </div>

      {agent.lastTask && (
        <div className="mt-sm" style={{ fontSize: '7px', color: 'var(--sv-brown-light)' }}>
          📋 {agent.lastTask}
        </div>
      )}
    </div>
  );
}
