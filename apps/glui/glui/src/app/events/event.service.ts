import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsCollection: AngularFirestoreCollection<Event>;
  private eventDocument: AngularFirestoreDocument<Event> = null;

  constructor(private db: AngularFirestore) {
    this.eventsCollection = db.collection<Event>('events', ref =>
      ref.orderBy('eventDate', 'desc')
    );
  }

  getEventList(): Observable<Event[]> {
    const eventList: Observable<
      Event[]
    > = this.eventsCollection.snapshotChanges().pipe(
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

  getEvent(eventId: string): Observable<Event> {
    this.eventDocument = this.db.doc<Event>(`events/${eventId}`);
    return this.eventDocument.valueChanges();
  }

  addEvent(event: Event): Observable<string> {
    return from(
      this.eventsCollection
        .add(event)
        .then(_event => {
          return _event.id;
        })
        .catch(err => {
          return err;
        })
    );
  }

  updateEvent(event: Event): Observable<Event> {
    return from(
      this.eventDocument
        .update(event)
        .then(_event => {
          return _event;
        })
        .catch(err => {
          return err;
        })
    );
  }

  updateEventUrl(eventId: string, url: string): Observable<Event> {
    return from(
      this.eventsCollection.doc(eventId)
      .update({imageUrl: url})
      .then(_event => {
        return _event;
      })
      .catch(err => {
        return err;
      })
    );
  }

  deleteEvent(eventId: string): void {
    this.eventDocument = this.db.doc<Event>(`events/${eventId}`);
    this.eventDocument.delete();
  }

  resetDocument(): void {
    this.eventDocument = null;
  }
}
