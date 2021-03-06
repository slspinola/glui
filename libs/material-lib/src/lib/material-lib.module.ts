import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatToolbarModule,
         MatSidenavModule, 
         MatIconModule,
         MatListModule, 
         MatButtonModule,
         MatFormFieldModule,
         MatInputModule,
         MatCardModule,
         MatTableModule,
         MatChipsModule,
         MatDividerModule,
         MatAutocompleteModule,
         MatProgressSpinnerModule,
         MatNativeDateModule,
         MatDatepickerModule,
         MatSelectModule,
         MatOptionModule,
         MatDialogModule
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
    MatChipsModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule
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
    MatChipsModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule
  ]
})
export class MaterialLibModule {}