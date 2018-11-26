import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { PieChartDataSevicesState, PieChartDataSevicesType, PieChartDataEventType, PieChartDataEventState } from './dashboard.model';
import { Service } from '../service/service.model';

@Component({
  selector: 'glui-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  serviceStats: any;
  eventStats: any;

  pieChartDataSevicesState = PieChartDataSevicesState;
  pieChartDataSevicesType = PieChartDataSevicesType;

  pieChartDataEventState = PieChartDataEventState;
  pieChartDataEventType = PieChartDataEventType;
  
  constructor(private dashboardService: DashboardService) { 

  }

  ngOnInit() {
    this.serviceStatSubscribe();
    this.eventStatSubscribe();
  }

  serviceStatSubscribe(): void {
    this.dashboardService.getServicesStats().subscribe(
      _services => {
        this.serviceStats = _services;
        this.setServiceStatsChartValues();
      }
    ) 
  }

  setServiceStatsChartValues(): void {
    this.pieChartDataSevicesState.dataTable = [
      ['Seviços', 'Estado dos serviços'],
      ['Planeado', this.serviceStats.state.planned],
      ['Em Execução', this.serviceStats.state.excuting],
      ['Bloqueado',  this.serviceStats.state.blocked],
      ['Terminado', this.serviceStats.state.executed],
    ]

    this.pieChartDataSevicesType.dataTable = [
      ['Seviços', 'Estado dos serviços'],
      ['Recolha', this.serviceStats.type.collection],
      ['Limpeza', this.serviceStats.type.cleaning],
      ['Manutenção',  this.serviceStats.type.maintenance],
      ['Outro', this.serviceStats.type.other],
    ]
    
    this.pieChartDataSevicesState = Object.create(this.pieChartDataSevicesState);
    this.pieChartDataSevicesState.dataTable = this.pieChartDataSevicesState.dataTable;

    this.pieChartDataSevicesType = Object.create(this.pieChartDataSevicesType);
    this.pieChartDataSevicesType.dataTable = this.pieChartDataSevicesType.dataTable;
  }

  eventStatSubscribe(): void {
    this.dashboardService.getEventStats().subscribe(
      _events => {
        this.eventStats = _events;
        this.setEventStatsChartValues();
      }
    ) 
  }

  setEventStatsChartValues(): void {
    this.pieChartDataEventState.dataTable = [
      ['Ocorrêcias', 'Estado das ocorrências'],
      ['Novo', this.eventStats.state.new],
      ['Pendente', this.eventStats.state.pending],
      ['Agendado',  this.eventStats.state.scheduled],
      ['Tratado', this.eventStats.state.done],
    ]

    this.pieChartDataEventType.dataTable = [
      ['Ocorrêcias', 'Estado das ocorrêcias'],
      ['Recolha', this.eventStats.type.collection],
      ['Limpeza', this.eventStats.type.cleaning],
      ['Manutenção',  this.eventStats.type.maintenance],
      ['Outro', this.eventStats.type.other],
    ]
    
    this.pieChartDataEventState = Object.create(this.pieChartDataEventState);
    this.pieChartDataEventState.dataTable = this.pieChartDataEventState.dataTable;

    this.pieChartDataEventType = Object.create(this.pieChartDataEventType);
    this.pieChartDataEventType.dataTable = this.pieChartDataEventType.dataTable;
  }

}
