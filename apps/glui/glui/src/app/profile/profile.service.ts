import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from './profile.model';
import { Email } from '../core/user.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profilesCollection: AngularFirestoreCollection<Profile>;
  private profileDocument: AngularFirestoreDocument<Profile> = null;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.profilesCollection = db.collection<Profile>('profiles', ref => ref.orderBy('name', 'asc'));
  }

  getProfiles(): Observable<Profile[]> {
    const profileList: Observable<Profile[]> = this.profilesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Profile;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );
    return profileList;
    //return this.profilesCollection.valueChanges();
  }

  getProfile(profileId: string): Observable<Profile> {
    this.profileDocument = this.db.doc<Profile>(`profiles/${profileId}`);
    return this.profileDocument.valueChanges();
  }

  test() {

  }

  createUser(email: Email, displayName: string): Observable<string> {
 
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email.email, email.password)
      .then(userCredential => {
        // TODO: comment log
        console.log(userCredential);
        return userCredential.user.uid;
      })
      .catch(err => {
        // TODO: comment log
        console.log(err);
        return err;
      }));
  }

  addProfile(profile: Profile): Observable<Profile> {
    return from(this.profilesCollection.add(profile)
      .then(_profile => {
        return _profile;
      })
      .catch(err => {
        return err;
      })
    );
  }

  updateProfile(profile: Profile): Observable<Profile> {
     return from(this.profileDocument.update(profile)
      .then((_profile) => {
          return _profile;
      })
      .catch(err => {
        return err;
      })
      );
  }

  deleteProfile(profileId: string): void{
    this.profileDocument = this.db.doc<Profile>(`profiles/${profileId}`);
    this.profileDocument.delete();
  }

  resetDocunment(): void {
    this.profileDocument = null;
  }
}
