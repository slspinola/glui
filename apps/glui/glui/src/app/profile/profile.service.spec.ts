import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { Profile } from './profile.model';

const input: Profile[] = [
  { 
    id: 'qqqqqq',
    user_uid: 'abc123',
    name: 'name', 
    lastname: 'lastname', 
    active: true,
    jobs: ['worker','worker'],
    email: 'slss@slss.pt'
  },
  { 
    id: 'qqqqqq',
    user_uid: 'abc123',
    name: 'name', 
    lastname: 'lastname', 
    active: true,
    jobs: ['worker','worker'],
    email: 'slss@slss.pt'
  }
];

const data = of(input);

const collectionStub = {
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

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });
});
