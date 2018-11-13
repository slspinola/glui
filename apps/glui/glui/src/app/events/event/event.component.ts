/// <reference types="@types/googlemaps" />
import { Component, OnInit, NgZone, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Event, EventState } from '../event.model';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSelectChange } from '@angular/material';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { Subject } from 'rxjs';
import { firestore } from 'firebase';
import moment = require('moment');

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'glui-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-PT' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    //{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class EventComponent implements OnInit, OnDestroy {
  eventForm: FormGroup;
  event: Event;
  isNew = true;
  spinnerOn = false;
  eventState = EventState;
  imageSrc = '/assets/images/image.jpg';
  hasImage = false;
  showImageSpinner = false;
  runUpload: Subject<string> = new Subject();
  public searchControl: FormControl;

  @ViewChild('search') public searchElementRef: ElementRef;

  map = {
    lat: 38.5490182,
    lng: -7.91107599,
    zoom: 12
  };

  marker = {
    lat: 38.5490182,
    lng: -7.91107599,
    drag: true
  };

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.event = {
      uid: '',
      user_uid: '',
      service_uid: '',
      description: '',
      location: new firestore.GeoPoint(38.5490182, -7.91107599),
      eventDate: Date.now(),
      imageUrl: '',
      state: '',
      createdAt: moment().valueOf(),
      active: true
    };
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.showImageSpinner=true;
      this.isNew = false;
      this.eventService.getEvent(id).subscribe(_event => {
        this.event = _event;
        console.log(this.event);
        this.imageSrc = this.event.imageUrl;
        this.setEventForm();
        
      });
    }
    this.setEventForm();
    this.mapSetup();
  }

  imageLoaded(){
    this.showImageSpinner = false;
  }

  ngOnDestroy(): void {
    this.eventService.resetDocument();
  }

  onChangeSelect(event: MatSelectChange) {
    console.log(event.value);
    console.log(this.eventForm.value);
  }

  get f() {
    return this.eventForm.controls;
  }

  setEventForm(): void {
    const date = moment(this.event.eventDate);
    this.eventForm = this.formBuilder.group({
      description: [this.event.description, Validators.required],
      state: [this.event.state, Validators.required],
      latitude: [this.event.location.latitude, Validators.required],
      longitude: [this.event.location.longitude, Validators.required],
      eventDate: [date, Validators.required],
      searchControl: new FormControl()
    });
  }

  submit(): void {
    this.spinnerOn = true;
    this.parseEvent();
    if(this.isNew) {
      this.addEvent();
    }else {
      this.updateEvent();
    }
  }

  _submit(): void {
    this.runUpload.next('testing run upload')
  }

  parseEvent(): void {
    this.event.description = this.eventForm.value.description;
    this.event.state = this.eventForm.value.state;

    this.event.eventDate = moment(this.eventForm.value.eventDate).valueOf();
    const lat: number = parseFloat(this.eventForm.value.latitude);
    const lng: number = parseFloat(this.eventForm.value.longitude);
    this.event.location = new firestore.GeoPoint(lat, lng);

  }

  addEvent(): void {
    this.eventService.addEvent(this.event)
    .subscribe(_eventId => {
      if(_eventId){
        if(this.hasImage) {
          this.event.uid = _eventId;
          this.runUpload.next(_eventId);
        }else{
          this.finish();
        }
      }
    },
    error => {
      this.errorHandler(error);
    });
  }

  updateEvent(): void {
    this.eventService.updateEvent(this.event)
    .subscribe(() => {
      this.finish();
    },
    error => {
      this.errorHandler(error); 
    });
  }

  finish(): void {
    this.spinnerOn = false;
    this.location.back();
  }

  cancel(): void {
    this.location.back();
  }

  errorHandler(error: string): void {
    console.log(error);
  }

  // UPLOAD FUNCTIONS

  imageAddedHandler(event: boolean): void {
    this.hasImage = event;
  }

  fileUrlHandler(url: string): void {
    this.event.imageUrl = url;
    this.eventService.updateEventUrl(this.event.uid, url)
    .subscribe(_event => {
      this.finish();
    },
    error => {
      this.errorHandler(error);
    })
  }

  // MAP FUNCTIONS

  mapSetup(): void {
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['address']
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.map.lat = place.geometry.location.lat();
          this.map.lng = place.geometry.location.lng();
          this.map.zoom = 17;
        });
      });
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.marker.lat = position.coords.latitude;
        this.marker.lng = position.coords.longitude;
      });
    }
  }

  mapDblClick($event: MouseEvent) {
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;

    this.map.lat = $event.coords.lat;
    this.map.lng = $event.coords.lng;

    this.eventForm.controls['latitude'].setValue($event.coords.lat.toFixed(9));
    this.eventForm.controls['longitude'].setValue($event.coords.lng.toFixed(9));
  }
}
