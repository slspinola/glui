export interface Service {
  id?: string;
  user_uid?: string;
  worker: string;
  workerid: string,
  description: string;
  observation: string;
  serviceDate: number;
  state: string;
  type: string;
  createdAt: number;
  active: boolean;
}

export const ServiceState = [
  { state: 'Planeado' },
  { state: 'Em Execução' },
  { state: 'Bloqueado' },
  { state: 'Terminado' }
];

export const ServiceType = [
  { type: 'Recolha' },
  { type: 'Limpeza' },
  { type: 'Manutenção' },
  { type: 'Outro' }
];