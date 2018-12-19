import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { ProfileService } from './profile/profile.service';
import { ServiceComponent } from './service/service/service.component';
import { ServiceListComponent } from './service/service-list/service-list.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventService } from './events/event.service';
import { EventComponent } from './events/event/event.component';
import { EventDialogComponent } from './events/event-dialog/event-dialog.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent, 
    ToolbarComponent, 
    SidenavComponent, 
    LoginComponent, 
    HomeComponent, 
    DashboardComponent, 
    ProfileListComponent, ProfileComponent, 
    ServiceComponent, ServiceListComponent, 
    EventListComponent, EventComponent, EventDialogComponent, MapComponent, 
  ],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  entryComponents: [EventDialogComponent],
  providers: [ProfileService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule {}
