import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service} from './service.model';
import { Profile } from '../profile/profile.model';
import { Event } from '../events/event.model';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private serviceCollection: AngularFirestoreCollection<Service>;
  private serviceDocument: AngularFirestoreDocument<Service> = null;
  private profilesCollection: AngularFirestoreCollection<Profile>;
  private eventsCollection: AngularFirestoreCollection<Event>;

  constructor(private db: AngularFirestore) { 
    this.serviceCollection = db.collection<Service>('services', ref => 
      ref.orderBy('serviceDate', 'desc')
    );
    this.profilesCollection = db.collection<Profile>('profiles', ref => ref.orderBy('name', 'asc'));
  }

  getServiceList(): Observable<Service[]> {
    return this.serviceCollection.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as Service;
          const id = a. payload.doc.id;
          return {id, ...data}
        })
        )
    );
  }

  getService(serviceId: string): Observable<Service> {
    this.serviceDocument = this.db.doc<Service>(`services/${serviceId}`);
    return this.serviceDocument.valueChanges();
  }

  addService(service: Service): Observable<string> {
    return from(
      this.serviceCollection
        .add(service)
        .then(_service => {
          return _service.id;
        })
        .catch(err => {
          return err;
        })
    );
  }

  updateService(service: Service): Observable<Service> {
    return from(
      this.serviceDocument
        .update(service)
        .then(_service => {
          return _service;
        })
        .catch(err => {
          return err;
        })
    );
  }

  deleteService(serviceId: string): void {
    this.serviceDocument = this.db.doc<Service>(`services/${serviceId}`);
    this.serviceDocument.delete();
  }

  getEvents(serviceId: string): Observable<Event[]> { 
    this.eventsCollection = this.db.collection<Event>('events', ref => ref.where('service_uid', '==', serviceId));
    const eventList: Observable<Event[]> = this.eventsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Event;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return eventList;
  }

  getProfiles(): Observable<Profile[]> {
    return this.profilesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Profile;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );
  }

  updateEventService(eventId: string, serviceId: string, state: string): Observable<Event> {
    return from(
      this.eventsCollection.doc(eventId)
      .update({service_uid: serviceId, state: state})
      .then(_event => {
        return _event;
      })
      .catch(err => {
        return err;
      })
    );
  }

  resetDocument(): void {
    this.serviceDocument = null;
  }
}

