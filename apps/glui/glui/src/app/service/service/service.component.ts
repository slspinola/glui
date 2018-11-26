import { Component,  OnInit, NgZone, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import moment = require('moment');
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDialog} from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSelectChange } from '@angular/material';
import { Service, ServiceState, ServiceType  } from '../service.model';
import { ServiceService } from '../service.service';
import { Observable } from 'rxjs';
import { Profile } from '../../profile/profile.model';
import { Event } from '../../events/event.model';
import { EventDialogComponent } from '../../events/event-dialog/event-dialog.component';

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
  selector: 'glui-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
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
export class ServiceComponent implements OnInit, OnDestroy {
  spinnerOn = false;
  isNew = true;
  service: Service;
  serviceForm: FormGroup;
  serviceState = ServiceState;
  serviceType = ServiceType;
  workers$: Observable<Profile[]>;
  workerList: Profile[] = [];
  eventList$: Observable<Event[]>;
  eventList: Event[];
  eventListIds: string[];

  constructor(
    private serviceService: ServiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.service = {
      user_uid: '',
      worker: 'Colaborador',
      workerid: '',
      description: '',
      observation: '',
      serviceDate: Date.now(),
      state: 'Planeado',
      type: '',
      createdAt: moment().valueOf(),
      active: true,
    };

    //this.workers$ = this.serviceService.getProfiles();

    this.serviceService.getProfiles()
      .subscribe(_workers => {
          this.workerList = _workers
      });

    const id = this.route.snapshot.paramMap.get('id');
    if(id!==null){
      this.isNew = false;
      this.serviceService.getService(id).subscribe(
        _service => {
          this.service = _service;
          this.service.id = id;
          this.setServiceForm();
          this.serviceService.getEvents(this.service.id).subscribe(
            _events => {
              this.eventList = _events;
            }
          );
        })
    }
    this.setServiceForm();
  }

  ngOnDestroy(): void {
    this.serviceService.resetDocument();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '50%',
      data: this.service.id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      console.log(result);
    });
  }

  onChangeSelect(service: MatSelectChange) {
    console.log(service.value);
    console.log(this.serviceForm.value.worker);
  }

  get f() {
    return this.serviceForm.controls;
  }

  onSelection(events: any[]): void {
    console.log(events);
    this.eventListIds=[];
    events.forEach(item => {
      this.eventListIds.push(item.value);
    });
  }

  removeEvents(events): void {
    this.eventListIds.forEach(item => {
      this.serviceService.updateEventService(item, '', 'Pendente');
    });
    this.eventListIds = [];
  }

  updateEvents(state: string): void {

    this.eventList.forEach(_event => {
      this.serviceService.updateEventService(_event.id, this.service.id, state);
    });
  }


  setServiceForm(): void {
    const date = moment(this.service.serviceDate);
    let worker: Profile = null
    if(!this.isNew){
      worker = this.workerList.find(x => x.id === this.service.workerid);
    }
    this.serviceForm = this.formBuilder.group({
      description: [this.service.description, Validators.required],
      state: [this.service.state, Validators.required],
      observation: [this.service.observation],
      type: [this.service.type, Validators.required],
      
      workerControl: [worker, Validators.required],
      serviceDate: [date, Validators.required],
    });
  }

  compareFn(x: Profile, y: Profile): boolean {
    return x && y ? x.id === y.id : x === y;
    }

  submit(): void {
    this.spinnerOn = true;
    this.parseService();
    if(this.isNew) {
      this.addService();
    }else {
      this.updateService();
    }
  }

  parseService(): void {
    this.service.description = this.serviceForm.value.description;
    this.service.state = this.serviceForm.value.state;
    this.service.type = this.serviceForm.value.type;
    this.service.observation = this.serviceForm.value.observation;
    this.service.observation = this.serviceForm.value.observation;
    this.service.serviceDate = moment(this.serviceForm.value.serviceDate).valueOf();
    const worker: Profile =  this.serviceForm.value.workerControl
    this.service.worker = worker.name+' '+worker.lastname;
    this.service.workerid = worker.id;
  }

  addService(): void {
    this.serviceService.addService(this.service)
    .subscribe(_serviceId => {
      this.isNew = false;
      this.serviceService.getService(_serviceId).subscribe(
        _service => {
          this.service = _service;
          this.service.id = _serviceId;
          this.serviceService.getEvents(this.service.id).subscribe(
            _events => {
              this.eventList = _events;
            }
          );
          this.spinnerOn = false;
        })
    },
    error => {
      this.errorHandler(error); 
    });
  }

  updateService(): void {
    this.serviceService.updateService(this.service)
    .subscribe(() => {
      if(this.service.state==='Terminado') {
        this.updateEvents('Tratado');
      }
      this.finish();
    },
    error => {
      this.errorHandler(error); 
    });
  }

  cancel(): void {
    this.location.back();
  }

  finish(): void {
    this.spinnerOn = false;
    //this.location.back();
  }

  errorHandler(error: string): void {
    console.log(error);
  }

}
