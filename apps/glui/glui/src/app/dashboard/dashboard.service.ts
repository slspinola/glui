import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { ServicesStats, EventStats } from './dashboard.model';
import { Service} from '../service/service.model';
import { Event} from '../events/event.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private serviceCollection: AngularFirestoreCollection<Service>;
  private eventCollection: AngularFirestoreCollection<Event>;

  private servicesStats$ = new Subject<any>();
  private eventStats$ = new Subject<any>();

  servicesStats = ServicesStats;
  eventStats = EventStats;

  constructor(private db: AngularFirestore) { 
    this.serviceCollection = this.db.collection<Service>('services');
    this.eventCollection = this.db.collection<Event>('events');
    this.setServicesStats();
    this.setEventStats();
  }

  setServicesStats(): void {
    this.serviceCollection.valueChanges().subscribe( 
      _serviceList => {
        _serviceList.forEach(_service => {
          this.servicesStats.state.planned = _service.state === 'Planeado'? this.servicesStats.state.planned + 1 : this.servicesStats.state.planned;
          this.servicesStats.state.excuting = _service.state === 'Em Execução'? this.servicesStats.state.excuting + 1  : this.servicesStats.state.excuting;
          this.servicesStats.state.blocked = _service.state === 'Bloqueado'? this.servicesStats.state.blocked + 1  : this.servicesStats.state.blocked;
          this.servicesStats.state.executed = _service.state === 'Terminado'? this.servicesStats.state.executed + 1  : this.servicesStats.state.executed;
          this.servicesStats.type.collection = _service.type === 'Recolha'? this.servicesStats.type.collection + 1  : this.servicesStats.type.collection;
          this.servicesStats.type.cleaning = _service.type === 'Limpeza'? this.servicesStats.type.cleaning + 1  : this.servicesStats.type.cleaning;
          this.servicesStats.type.maintenance = _service.type === 'Manutenção'? this.servicesStats.type.maintenance + 1  : this.servicesStats.type.maintenance;
          this.servicesStats.type.other = _service.type === 'Outro'? this.servicesStats.type.other + 1  : this.servicesStats.type.other;
        });
        this.servicesStats$.next(this.servicesStats);
      });

  }

  getServicesStats(): Observable<any> {
    return  this.servicesStats$.asObservable();
  }

  setEventStats(): void {
    this.eventCollection.valueChanges().subscribe( 
      _eventList => {
        _eventList.forEach(_service => {
          this.eventStats.state.new = _service.state === 'Novo'? this.eventStats.state.new + 1 : this.eventStats.state.new;
          this.eventStats.state.pending = _service.state === 'Pendente'? this.eventStats.state.pending + 1  : this.eventStats.state.pending;
          this.eventStats.state.scheduled = _service.state === 'Agendado'? this.eventStats.state.scheduled + 1  : this.eventStats.state.scheduled;
          this.eventStats.state.done = _service.state === 'Tratado'? this.eventStats.state.done + 1  : this.eventStats.state.done;
          this.eventStats.type.collection = _service.type === 'Recolha'? this.eventStats.type.collection + 1  : this.eventStats.type.collection;
          this.eventStats.type.cleaning = _service.type === 'Limpeza'? this.eventStats.type.cleaning + 1  : this.eventStats.type.cleaning;
          this.eventStats.type.maintenance = _service.type === 'Manutenção'? this.eventStats.type.maintenance + 1  : this.eventStats.type.maintenance;
          this.eventStats.type.other = _service.type === 'Outro'? this.eventStats.type.other + 1  : this.eventStats.type.other;
        });
        this.eventStats$.next(this.eventStats);
      });
  }

  getEventStats(): Observable<any> {
    return  this.eventStats$.asObservable();
  }
}