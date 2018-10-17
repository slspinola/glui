import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule,
         MatSidenavModule, 
         MatIconModule,
         MatListModule, 
         MatButtonModule,
         MatFormFieldModule,
         MatInputModule,
         MatCardModule,
         MatTableModule,
         MatChipsModule 
        } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule
  ],
  exports: [
    FlexLayoutModule, 
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule
  ]
})
export class MaterialLibModule {}