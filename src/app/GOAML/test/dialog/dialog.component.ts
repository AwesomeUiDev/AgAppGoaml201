import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/GOAML/newModule/dialog-mts-id/data.service';
import { STRService } from 'src/app/GOAML/newModule/str-desc/custsearch.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  strbutton: boolean;
  nonstrbutton: boolean;

 // displayedColumns: string[] = ['AC_ENTRY_SR_NO', 'CR_ACCOUNT', 'DR_ACCOUNT', 'TRN_DT'];
  dataSource: any;
  text1: string;
  text2: string;
  text3: string;
  trnNo: any;
  markedValue: Array<string> = new Array<string>();
  strbuttontextarea: boolean;
  progress: boolean;
  strdataresp: any;
  userId: string;
  nonstrres: any;
  trn_ref_no: any;
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dataService: DataService,
              private api: STRService) {
    // this.dataSource = new MatTableDataSource<any>(data),
    //   console.log(this.dataSource);
    console.log(this.data);
    console.log(this.data[0]);
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    // this.dialogRef.updatePosition({ top: `30px`,
    // right: `40px`});
    this.userId = localStorage.getItem('userId');
  }

  // for str mts transaction
  strCall(TRN_NO: string) {
    console.log('Str');
    console.log(TRN_NO);
    this.trn_ref_no = 'TRN_NO';
    this.nonstrbutton = true;
    this.strbuttontextarea = true;
    console.log(this.markedValue);
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
      this.api.nonStrTransactionApiBank(TRN_NO, this.userId).subscribe(nonstrres => {
        this.nonstrres = nonstrres;
        // console.log(data);
        if (this.nonstrres) {
          Swal.fire(' Marked As Non Suspicious Transaction!');
        } else {
          Swal.fire('Server Error !');
        }
      });
      // Swal.fire("api call pending !");
    }
  }
  submitData(trnNo: string) {
    console.log(this.text1);
    console.log(this.text2);
    console.log(this.text3);
    console.log(trnNo);
    this.progress = true;
    if (this.markedValue.length !== 0) {
      console.log('Inside if str');
      this.markedValue.forEach(element => {
        if (element == trnNo) {
          Swal.fire('Already Mapped !');
        }
      });
    } else {
      this.markedValue.push(trnNo);
      console.log(this.markedValue);
      this.dataService.recieve(this.markedValue);
    }
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
        console.log(trnNo);
        this.trnNo = trnNo;
        console.log(this.trnNo);
        if (this.text1 && this.text2) {
        this.api.strTransactionMarkDataForDbBank(this.text1, this.text2, this.text3,  this.trnNo, this.userId)
        .subscribe(strdataresp => {
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
      } else {
        Swal.fire('Enter the value for Action and Reason !');
      }
      }
    });

  }
}
