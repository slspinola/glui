import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../core/auth.service';
import { of, BehaviorSubject } from 'rxjs';

class AuthenticationServiceStub {
  isAuthenticated: BehaviorSubject<boolean>;
  login(email: string, password: string){};
}

class AngularFireAuthStub {
  readonly auth: AuthStub = new AuthStub();
}

class AuthStub {
  onAuthStateChanged() {
    return of({uid: '1234'});
  }
}

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  const mockAuthService: AuthenticationServiceStub = new AuthenticationServiceStub();
  mockAuthService.isAuthenticated = new BehaviorSubject<boolean>(false);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ToolbarComponent
      ],
      providers:[
        {provide: AuthService, useValue: mockAuthService},
        {provide: AngularFireAuth, useClass: AngularFireAuthStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
