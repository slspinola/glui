import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../core/auth.service';
import { of, BehaviorSubject, Observable } from 'rxjs';

class AuthenticationServiceStub {
  isAuthenticated: BehaviorSubject<boolean>;
  login(email: string, password: string){};

  isUserAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
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


describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  const mockAuthService: AuthenticationServiceStub = new AuthenticationServiceStub();
  mockAuthService.isAuthenticated = new BehaviorSubject<boolean>(true);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavComponent ],
      providers:[
        {provide: AuthService, useValue: mockAuthService},
        {provide: AngularFireAuth, useClass: AngularFireAuthStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
