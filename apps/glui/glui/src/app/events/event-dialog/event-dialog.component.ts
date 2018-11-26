import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList} from '@angular/material';
import { EventService } from '../event.service';
import { Event, EventState } from '../event.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'glui-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {

  
  eventList$: Observable<Event[]>
  eventListIds: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public serviceId: string,
    private eventService: EventService
    ) {
      this.eventList$ = this.eventService.getEventListDialog();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelection(events: any[]): void {
    console.log(events);
    this.eventListIds=[];
    events.forEach(item => {
      this.eventListIds.push(item.value);
    });
    console.log('############');
    console.log(this.eventListIds);
  }

  addEvents(events): void {
    events.forEach(item => {
      this.eventService.updateEventService(item.value, this.serviceId, 'Agendado');
    });
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
