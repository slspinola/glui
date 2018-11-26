export interface Event {
  id?: string;
  uid: string;
  user_uid?: string;
  service_uid?: string;
  description: string;
  location?: firebase.firestore.GeoPoint;
  eventDate: number;
  imageUrl?: string;
  state: string;
  type: string;
  createdAt: number;
  active: boolean;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export const EventState = [
  { state: 'Novo' },
  { state: 'Pendente' },
  { state: 'Agendado' },
  { state: 'Tratado' }
];

export const EventType = [
  { type: 'Recolha' },
  { type: 'Limpeza' },
  { type: 'Manutenção' },
  { type: 'Outro' }
];