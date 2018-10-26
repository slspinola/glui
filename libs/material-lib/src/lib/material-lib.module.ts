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
         MatChipsModule,
         MatDividerModule,
         MatAutocompleteModule,
         MatProgressSpinnerModule
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
    MatProgressSpinnerModule
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
    MatProgressSpinnerModule
  ]
})
export class MaterialLibModule {}