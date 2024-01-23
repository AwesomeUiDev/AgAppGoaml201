import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm',
  template: `<h1 matDialogTitle class="mb-05">{{ data.title }}</h1>
    <div mat-dialog-content class="mb-1">{{ data.message }}</div>
    <div mat-dialog-actions>
    <button 
    type="button" 
    mat-raised-button
    style="background: #1B2631;" class="text-white"
    (click)="dialogRef.close(true)">{{data.ok}}</button>
    &nbsp;
    <span fxFlex></span>
    <button 
    type="button"
    style="background: #DC143C;" class="text-white"
    mat-raised-button 
    (click)="dialogRef.close(false)">{{data.cancel}}</button>
    </div>`,
})
export class AppComfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<AppComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
}