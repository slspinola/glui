import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from './profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Profile } from '../profile.model';
import { MatAutocompleteModule } from '@angular/material';
import { of } from 'rxjs';
import { ProfileService } from '../profile.service';
import { AngularFirestore } from '@angular/fire/firestore';


const input: Profile[] = [
  { 
    id: 'id',
    user_uid: 'useruid',
    name: 'name', 
    lastname: 'lastname', 
    active: true,
    jobs: ['worker','worker'],
    email: 'slss@slss.pt'
  },
  { 
    id: 'id',
    user_uid: 'useruid',
    name: 'name', 
    lastname: 'lastname', 
    active: true,
    jobs: ['worker','worker'],
    email: 'slss@slss.pt'
  }
];

const data = of(input);

const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data),
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
}

const AngularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  const locationStub = {
    back: jasmine.createSpy('back')
}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports:[
        RouterTestingModule,
        ReactiveFormsModule,
        MatAutocompleteModule
      ],
      providers: [
        ProfileService,
        {provide: AngularFirestore, useValue: AngularFiresotreStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
