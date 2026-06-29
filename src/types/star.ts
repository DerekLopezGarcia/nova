export interface Star {
  id: string;
  name: string;
  spectralClass: string;      // O, B, A, F, G, K, M (stellar classification)
  status: 'dormant' | 'burning' | 'supernova' | 'pulsar' | 'giant';
  magnitude: number;           // 0-100 (brightness)
  heat: number;                // 0-100 (stellar heat)
  lastAlignment?: string;      // Last task/alignment completed
  discoveredAt: string;
  description?: string;
  alignmentsCompleted: number;
}
