import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile/profile.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ServiceComponent } from '../service/service/service.component';
import { ServiceListComponent } from '../service/service-list/service-list.component';
import { ProfileListComponent } from '../profile/profile-list/profile-list.component';
import { EventListComponent } from '../events/event-list/event-list.component';
import { EventComponent } from '../events/event/event.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'glui', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'profiles', component: ProfileListComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'events', component: EventListComponent, canActivate: [AuthGuard]},
  { path: 'event', component: EventComponent, canActivate: [AuthGuard]},
  { path: 'event/:id', component: EventComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'services', component: ServiceListComponent, canActivate: [AuthGuard]},
  { path: 'service', component: ServiceComponent, canActivate: [AuthGuard]},
  { path: 'service/:id', component: ServiceComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {initialNavigation: 'enabled'})
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
