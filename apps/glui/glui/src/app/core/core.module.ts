import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialLibModule } from '@glui/material-lib';
import { RoutingModule } from '../routing/routing.module';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AgmCoreModule } from '@agm/core';
import { UploadFileModule } from '@glui/upload-file';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    MaterialLibModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA9B5lKRV1rYLROsZamGMRDpwZ_VPXlNA4',
      libraries: ["places"]
    }),
    UploadFileModule,
    Ng2GoogleChartsModule
  ],
  exports: [
    RoutingModule,
    MaterialLibModule,
    AngularFirestoreModule,
    AngularFireModule,
    AgmCoreModule,
    UploadFileModule,
    Ng2GoogleChartsModule
  ],
  declarations: [
  ],
  providers: [
    AngularFireAuth,
    AngularFireStorage,
    AuthService
  ]
})
export class CoreModule { }
