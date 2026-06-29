export interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'working' | 'harvesting' | 'resting' | 'error';
  health: number;    // 0-100
  energy: number;    // 0-100
  lastTask?: string;
  createdAt: string;
  model?: string;
  tasksCompleted: number;
}
