import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User, Email } from './user.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
 //fbUser: firebase.User;
  isAuthenticated: BehaviorSubject<boolean>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { 
    this.isAuthenticated = new BehaviorSubject<boolean>(false);
    this.user = this.afAuth.authState.pipe(
      switchMap( user => {
        if(user) {
          this.isAuthenticated.next(true);
          const u = this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          //console.log('################')
          //console.log(u);
          return u;
        } else {
          this.isAuthenticated.next(false);
          return of(null);
        }
      })
    )
  }

  getUser(): Promise<User> {
    return this.user.pipe(first()).toPromise();

    // const {uid} = await this.authService.getUser();
  }

  updateIsAuthenticated(show: boolean): void {
    this.isAuthenticated.next(show);
  }

  login(credentials: Email) {
    this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(
      fbUser => {
        if(fbUser !== undefined && fbUser!== null){
          this.updateIsAuthenticated(true);
          this.router.navigate(['/glui']);
          this.updateUserData(fbUser.user);
        }
      })
    .catch(
      error => {
        this.handleError(error);
      }
    )
  }

  logout() {
    this.afAuth.auth.signOut().then(
      () => {
        this.updateIsAuthenticated(false);
        this.router.navigate(['/login']);
      }
    )
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email || null
    };
    return userRef.set(data);
  }

  private handleError(error: Error) {
    console.error(error);
  }
}
