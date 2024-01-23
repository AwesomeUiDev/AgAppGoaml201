import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatStepperModule,
  MatTabsModule,
  MatRippleModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatNativeDateModule,
  MatTreeModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatDividerModule,
  MatCardModule,
  MatDatepicker,
  MatDialogActions,
  MatSelectModule
} from "@angular/material";

import {
  MatButtonModule,
  MatInputModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatGridListModule,
  MatCheckboxModule,
  MatListModule
} from "@angular/material";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { MatProgressButtonsModule } from 'mat-progress-buttons';



@NgModule({
  imports: [
    MatButtonToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTabsModule,
    MatGridListModule
  ],
  exports: [
    MatGridListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatDialogModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSnackBarModule,
    BsDropdownModule,
    ModalModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressButtonsModule,
    MatChipsModule,
    MatSortModule
  ]
})
export class AngularMaterialModule { }
