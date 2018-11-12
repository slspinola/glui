import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable} from 'rxjs';

@Component({
  selector: 'glui-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  //showMenu: boolean;
  showMenu$: Observable<boolean>;

  menuItems = [
    {title: 'Dashboard', icon:'dashboard', routerLink:'/dashboard'},
    {title: 'Colaboradores', icon:'supervised_user_circle', routerLink:'/profiles'},
    {title: 'Serviços', icon:'ballot', routerLink:'/service'},
    {title: 'Ocorrências', icon:'style', routerLink:'/events'},
    {title: 'Agendamentos', icon:'event', routerLink:'.'},
  ];

  constructor(private authServ: AuthService) { 
    /*this.authServ.isAuthenticated.subscribe(show =>{
      this.showMenu = show;
    });*/
  }

  ngOnInit() {
    this.showMenu$ = this.authServ.isUserAuthenticated();
  }

}
