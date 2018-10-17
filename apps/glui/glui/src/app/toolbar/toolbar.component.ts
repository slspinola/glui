import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'glui-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isAuth: boolean

  constructor(private authServ: AuthService) { 
    this.authServ.isAuthenticated.subscribe(show =>{
      this.isAuth = show;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authServ.logout();
  }

}
