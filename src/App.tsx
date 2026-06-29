import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { AgentCard } from './components/AgentCard';
import { PixelPanel } from './components/PixelPanel';
import { CreateAgentDialog } from './components/CreateAgentDialog';
import type { Agent } from './types/agent';
import { SAMPLE_AGENTS } from './data/sample-agents';
import './styles/pixel-theme.css';
import './styles/global.css';

export default function App() {
  const [agents, setAgents] = useState<Agent[]>(SAMPLE_AGENTS);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const totalHarvests = agents.reduce((sum, a) => sum + a.tasksCompleted, 0);

  const handleCreateAgent = useCallback(
    (name: string, model: string, _systemPrompt: string) => {
      const newAgent: Agent = {
        id: `agent-${Date.now()}`,
        name,
        status: 'idle',
        health: 100,
        energy: 100,
        lastTask: 'Just planted! 🌱',
        createdAt: new Date().toISOString(),
        model,
        tasksCompleted: 0,
      };
      setAgents((prev) => [...prev, newAgent]);
      setShowCreate(false);
    },
    [],
  );

  const handleAgentClick = useCallback((agent: Agent) => {
    setSelectedAgent(agent);
  }, []);

  return (
    <div className="app">
      <Header
        agentCount={agents.length}
        tasksCompleted={totalHarvests}
        onCreateAgent={() => setShowCreate(true)}
      />

      <main className="app__main">
        {agents.length === 0 ? (
          <div className="empty-meadow">
            <div className="empty-meadow__icon">🌱</div>
            <p className="empty-meadow__text">
              Your meadow is empty.<br />
              Plant your first agent to get started!
            </p>
            <p className="empty-meadow__hint">
              Click "New Agent" above to sow a seed 🌰
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-md">
              <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '11px', color: 'var(--sv-brown-mid)' }}>
                🌾 Your Meadow
              </h2>
            </div>

            <div className="meadow-grid">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onClick={handleAgentClick}
                />
              ))}
            </div>
          </>
        )}

        {selectedAgent && (
          <PixelPanel
            variant="gold"
            className="mt-lg"
            title={`📋 ${selectedAgent.name}`}
          >
            <div style={{ fontSize: '8px', lineHeight: '2' }}>
              <p><strong>Status:</strong> {selectedAgent.status}</p>
              <p><strong>Model:</strong> {selectedAgent.model}</p>
              <p><strong>Tasks completed:</strong> {selectedAgent.tasksCompleted}</p>
              <p><strong>Last task:</strong> {selectedAgent.lastTask}</p>
              <p><strong>Planted:</strong> {new Date(selectedAgent.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-md text-center">
              <button
                className="pixel-btn pixel-btn--sm"
                onClick={() => setSelectedAgent(null)}
              >
                Close
              </button>
            </div>
          </PixelPanel>
        )}
      </main>

      {showCreate && (
        <CreateAgentDialog
          onClose={() => setShowCreate(false)}
          onCreate={handleCreateAgent}
        />
      )}
    </div>
  );
}
