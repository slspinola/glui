import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Observable } from 'rxjs';
import { Service } from '../service.model';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'glui-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

  displayedColumns: string[] = ['iconstate', 'serviceDate', 'type', 'description', 'state', 'edit', 'delete'];
  dataSource: MatTableDataSource<Service>;

  serviceList: Observable<Service[]>
  _showFilter = false;

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.serviceService.getServiceList().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showFilter(): void{
    this._showFilter = !this._showFilter;
  }

  deleteService(serviceId: string): void{
    this.serviceService.deleteService(serviceId);
  }

}
