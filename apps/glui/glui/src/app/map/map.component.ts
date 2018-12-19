import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../events/event.service';
import { Event } from '../events/event.model';


@Component({
  selector: 'glui-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  eventList: Event[];

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
  public searchControl: FormControl;
  @ViewChild('search') public searchElementRef: ElementRef;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.mapSetup();
    this.eventService.getEventList().subscribe(_eventList => {
      this.eventList = _eventList;
    });
  }

  markerIconUrl(state: string): string {
    const iconUrl = "/assets/images/pins/"+state+".png";
    return iconUrl;
  }

  markerClicked(eventId): void {
    
    const url = `${window.location.origin}/event/${eventId}`;
    console.log(url);
    window.open(url, '_blank');

  }

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
          this.map.zoom = 20;
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

}
