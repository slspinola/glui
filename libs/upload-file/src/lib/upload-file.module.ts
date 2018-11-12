import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { DropzoneDirective } from './upload/dropzone.directive';
import { FileSizePipe } from './file-size.pipe';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    UploadComponent
  ],
  declarations: [UploadComponent, DropzoneDirective, FileSizePipe]
})
export class UploadFileModule {}
