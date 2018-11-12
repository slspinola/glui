import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EventComponent } from './event.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { of } from 'rxjs';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { MatSelectModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const input: Event =
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
  };

const data = of(input);

const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data),
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
};

const AngularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

const mapsStub = {
  load: jasmine.createSpy('load').and.returnValue(new Promise(() => {
    return true;
  }))
};

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventComponent ],
      imports:[
        BrowserAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        AgmCoreModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule
      ],
      providers: [
        EventService,
        MapsAPILoader,
        {provide: AngularFirestore, useValue: AngularFiresotreStub},
        {
          provide: MapsAPILoader,
          useValue: mapsStub
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
