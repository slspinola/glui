import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { Profile } from './profile.model';

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

const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data),
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
}

const AngularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

describe('ProfileService', () => {
  beforeEach(() => 
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        {provide: AngularFirestore, useValue: AngularFiresotreStub}
      ]
    }));

  it('should be created sergio spinola', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    spyOn(service, 'getProfiles').and.returnValue(of(input));
    expect(service).toBeTruthy();
  });
});
