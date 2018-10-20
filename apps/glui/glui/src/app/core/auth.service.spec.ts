import { TestBed, async, inject } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

let service: AuthService;

const authStub: any = {
  authState: {}
};

const storeStub = {
  doc() {
    return {
      valueChanges() {
        return of({property: 'test'});
      }
    };
  }
};

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [
        {provide: AngularFireAuth, useValue: authStub},
        {provide: AngularFirestore, useValue: storeStub},
        AuthService
      ]
    });

    authStub.authState = of({username: 'test'});
    spyOn(storeStub, 'doc').and.stub();
    service = TestBed.get(AuthService);
  });

  
});