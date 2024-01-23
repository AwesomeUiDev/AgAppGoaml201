import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, ThemePalette } from '@angular/material';
import Swal from 'sweetalert2';
import { STRService } from '../str-desc/custsearch.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-dialog-mts-id',
  templateUrl: './dialog-mts-id.component.html',
  styleUrls: ['./dialog-mts-id.component.css']
})
export class DialogMtsIdComponent implements OnInit {
  dataSource: any;
  strbutton: boolean;
  strbuttontextarea: boolean;
  nonstrbutton: boolean;
  text1: string;
  text2: string;
  text3: string;
  strdataresp: any;
  userId: any;
  sender: boolean;
  receiver: boolean;
  progress: boolean;
  markedValue: Array<string> = new Array<string>();
  constructor(public dialogRef: MatDialogRef<DialogMtsIdComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private api: STRService,
              private dataService: DataService) {
      this.dataSource = new MatTableDataSource<any>(data),
      console.log(this.dataSource);
      console.log(this.data);
      console.log(this.data.TRN_NO);
      console.log(this.data.EVENT);
      if (this.data.EVENT == 'SEND') {
        this.sender = true;
      } else {
        this.receiver = true;
      }
      dialogRef.disableClose = true;
     }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }
  // for str mts transaction
  strCall(TRN_NO: string) {
    console.log('Str');
    console.log(TRN_NO);
    this.nonstrbutton = true;
//     if(this.markedValue.length!==0){
//       console.log("Inside if str");
//     this.markedValue.forEach(element => {
//   if(element==TRN_NO){
//     Swal.fire("Already Mapped !");
//   }
// });
// }else{
//   this.markedValue.push(TRN_NO);
//   console.log(this.markedValue);
//   this.dataService.recieve(this.markedValue);
// }
    this.strbuttontextarea = true;
    console.log( this.markedValue);
  }
  // for non str mts
  nonStrCall(TRN_NO: string) {
    console.log('Non Str');
    console.log(TRN_NO);
    this.strbutton = true;
   // this.markedValue.push(TRN_NO);
    console.log(this.markedValue);
    if (this.markedValue.length !== 0) {
     console.log('Inside if non str');
     this.markedValue.forEach(element => {
      if (element == TRN_NO) {
        Swal.fire('Already Marked !');
      }
    });
  } else {
    console.log('Inside else !');
    console.log(TRN_NO);
    this.markedValue.push(TRN_NO);
    console.log(this.markedValue);
    this.dataService.recieve(this.markedValue);
    // api call
    this.api.nonStrTransactionApi(TRN_NO, this.userId).subscribe(data => {
      this.data = data;
      console.log(data);
      if (this.data) {
        Swal.fire(' Marked As Non Suspicious Transaction!');
      } else {
        Swal.fire('Server Error !');
      }
    });

  }
  }
  submitData(event: string, TRN_NO: string) {
    console.log(this.text1);
    console.log(this.text2);
    console.log(this.text3);
    console.log(event);
    this.progress = true;
    if (this.markedValue.length !== 0) {
      console.log('Inside if str');
      this.markedValue.forEach(element => {
  if (element == TRN_NO) {
    Swal.fire('Already Mapped !');
  }
});
} else {
  this.markedValue.push(TRN_NO);
  console.log(this.markedValue);
  this.dataService.recieve(this.markedValue);
}
    if (this.text1 && this.text2) {
Swal.fire({
  title: 'Are you sure?',
  text: 'You won\'t be able to revert this!',
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes !'
} as any).then((result) => {
  if (result.value) {
    this.strbuttontextarea = false;

    this.api.strTransactionMarkDataForDb(this.text1, this.text2, this.text3, this.data.TRN_NO, this.userId, event).subscribe(strdataresp => {
      this.strdataresp = strdataresp;
      console.log(this.strdataresp.message);
      if (this.strdataresp) {
        this.progress = false;
        Swal.fire(

              ' Status For the Process: ' + this.strdataresp.message,

            );
      } else {
        Swal.fire('Unable to process Data !');
      }
          });
          }
    });
  } else {
    this.progress=false;
    Swal.fire('Enter the value for Action and Reason !');
  }
  }

}
// export interface ChipColor {
//   name: string;
// //  color: ThemePalette;
// }
// export class ChipsStackedExample {
//   availableColors:
//   ChipColor[] =
//    [
//     {name: 'none', color: undefined},
//     {name: 'Primary', color: 'primary'},
//     {name: 'Accent', color: 'accent'},
//     {name: 'Warn', color: 'warn'}
//   ];
// }
