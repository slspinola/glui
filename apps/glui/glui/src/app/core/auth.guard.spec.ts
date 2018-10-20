import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

class AuthenticationServiceStub {
  login(email: string, password: string){
  }
}

class AngularFireAuthStub {
  readonly auth: AuthStub = new AuthStub();
}

class AuthStub {
  onAuthStateChanged() {
    return of({uid: '1234'});
  }
}

class RouterStub {
  navigateByUrl(url: string) {
      return url;
  }
}


describe('AuthGuard', () => {

  const mockAuthService: AuthenticationServiceStub = new AuthenticationServiceStub();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        AuthService,
        {provide: Router, useClass: RouterStub},
        {provide: AuthService, useValue: mockAuthService},
        {provide: AngularFireAuth, useClass: AngularFireAuthStub}
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
