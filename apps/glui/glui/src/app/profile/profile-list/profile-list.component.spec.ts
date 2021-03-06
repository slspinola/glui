import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';
import { ProfileListComponent } from './profile-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileService } from '../profile.service';
import { of } from 'rxjs';
import { Profile } from '../profile.model';


const input: any[] = [
  { 
    id: 'qqqqqq',
    user_uid: 'abc123',
    name: 'name', 
    lastname: 'lastname', 
    active: true,
    jobs: ['worker','worker'],
    email: 'slss@slss.pt',
    payload: {
      doc: {
        data() {
          return input[1];
        },
        id: 'qqqqqq'
      },
    }
  },
  { 
    id: 'qqqqqq',
    user_uid: 'abc123',
    name: 'name', 
    lastname: 'lastname', 
    active: true,
    jobs: ['worker','worker'],
    email: 'slss@slss.pt',
    payload: {
      doc: {
        data() {
          return input[1];
        },
        id: 'qqqqqq'
      },
    }
  }
];

const data = of(input);
const dataSingle = of(input[0]);

const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data),
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data),
  doc: jasmine.createSpy('doc').and.returnValue(dataSingle)
}

const AngularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

describe('ProfileListComponent', () => {
  let component: ProfileListComponent;
  let fixture: ComponentFixture<ProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileListComponent ],
      imports: [ 
        MatTableModule
      ],
      providers:[
        ProfileService,
        {provide: AngularFirestore, useValue: AngularFiresotreStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
