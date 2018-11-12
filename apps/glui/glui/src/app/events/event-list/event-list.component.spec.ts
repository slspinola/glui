import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material';
import { EventListComponent } from './event-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { of } from 'rxjs';

const input: Event[] = [
  {
    uid: 'testuid',
    user_uid: 'useruid',
    service_uid: 'serviceuid',
    description: 'description',
    location: new firestore.GeoPoint(38.5490182, -7.91107599),
    eventDate: Date.now(),
    imageUrl: 'http://www.pde.uk.com/uploads/images/660-plastic-bin-cutout.jpg',
    state: 'novo',
    createdAt: Date.now(),
    active: true
  },
  {
    uid: 'testuid',
    user_uid: 'useruid',
    service_uid: 'serviceuid',
    description: 'description',
    location: new firestore.GeoPoint(38.5490182, -7.91107599),
    eventDate: Date.now(),
    imageUrl: 'http://www.pde.uk.com/uploads/images/660-plastic-bin-cutout.jpg',
    state: 'novo',
    createdAt: Date.now(),
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

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListComponent ],
      imports:[
        RouterTestingModule,
        MatTableModule

      ],
      providers: [
        EventService,
        {provide: AngularFirestore, useValue: AngularFiresotreStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
