import { TestBed } from '@angular/core/testing';
import { EventService } from './event.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { Event } from './event.model';
import { firestore } from 'firebase';

const input: any[] = [
  {
    id: 'zzzzzzzzzzzzzz',
    uid: 'testuid',
    user_uid: 'useruid_zz',
    service_uid: 'serviceuid',
    description: 'serviceComponent',
    location: new firestore.GeoPoint(38.5490182, -7.91107599),
    eventDate: 1543233469,
    imageUrl: 'http://www.pde.uk.com/uploads/images/660-plastic-bin-cutout.jpg',
    state: 'novo',
    type: 'limpeza',
    createdAt: 1543233469,
    active: true,
    payload: {
      doc: {
        data() {
          return input[1];
        },
        id: 'sssssssssssss'
      },
    }
  },
  {
    id: 'ssssssssssssss',
    uid: 'testuid_ss',
    user_uid: 'useruid',
    service_uid: 'serviceuid',
    description: 'serviceComponent',
    location: new firestore.GeoPoint(38.5490182, -7.91107599),
    eventDate: 1543233469,
    imageUrl: 'http://www.pde.uk.com/uploads/images/660-plastic-bin-cutout.jpg',
    state: 'novo',
    type: 'limpeza',
    createdAt: 1543233469,
    active: true
  }
];

const data = of(input);

const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data),
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
};

const AngularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

describe('EventService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
        { provide: AngularFirestore, useValue: AngularFiresotreStub }
      ]
    });

    
  });

  it('should be created', () => {   
    const service: EventService = TestBed.get(EventService);
    expect(service).toBeTruthy();
  });
});
