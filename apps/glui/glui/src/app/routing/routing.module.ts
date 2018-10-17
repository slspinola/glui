import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile/profile.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ServiceComponent } from '../service/service/service.component';
import { ProfileListComponent } from '../profile/profile-list/profile-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'glui', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'profiles', component: ProfileListComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'service', component: ServiceComponent, canActivate: [AuthGuard]},

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
