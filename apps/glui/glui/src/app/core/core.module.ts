import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialLibModule } from '@glui/material-lib';
import { RoutingModule } from '../routing/routing.module';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    MaterialLibModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports: [
    RoutingModule,
    MaterialLibModule,
    AngularFirestoreModule,
    AngularFireModule
  ],
  declarations: [],
  providers: [
    AngularFireAuth,
    AuthService
  ]
})
export class CoreModule { }
