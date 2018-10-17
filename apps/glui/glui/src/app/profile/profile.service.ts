import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profilesCollection: AngularFirestoreCollection<Profile>

  constructor(db: AngularFirestore) { 
    this.profilesCollection = db.collection<Profile>('profiles', ref => ref.orderBy('name','asc'));
  }

  getProfiles(): Observable<Profile[]> {
    return this.profilesCollection.valueChanges();
  }
}
