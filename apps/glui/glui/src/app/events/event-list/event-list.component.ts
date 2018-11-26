import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';
import { Event } from '../event.model';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'glui-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  displayedColumns: string[] = ['eventDate', 'type', 'description', 'state', 'edit', 'delete'];
  dataSource: MatTableDataSource<Event>;

  eventList: Observable<Event[]>
  _showFilter = false;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEventList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showFilter(): void{
    this._showFilter = !this._showFilter;
  }

  deleteEvent(eventId: string): void{
    this.eventService.deleteEvent(eventId);
  }

}
