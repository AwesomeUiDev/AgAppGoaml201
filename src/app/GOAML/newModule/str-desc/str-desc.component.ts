import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { PeriodicElement } from 'src/app/GOAML/messages/messages.component';
import { MtsDesc } from './strdesc.model';
import { CustomerDetailsBank } from './customerDetails.model';
import Swal from 'sweetalert2';
import { Transactiondata } from './transaction.model';
import { Router } from '@angular/router';
import { STRService } from './custsearch.service';
import { Mtsdata, Bankdata } from './form.model';
import { IfStmt } from '@angular/compiler';
import { DialogComponent } from 'src/app/GOAML/test/dialog/dialog.component';
import { TransactionDetails } from 'src/app/GOAML/test/dialog/transactiondetails.model';
import { Mtsidsenddata } from './mtsissend.model';
import { DialogMtsIdComponent } from '../dialog-mts-id/dialog-mts-id.component';
import { DataService } from '../dialog-mts-id/data.service';

@Component({
  selector: 'app-str-desc',
  templateUrl: './str-desc.component.html',
  styleUrls: ['./str-desc.component.css']
})
export class StrDescComponent implements OnInit {
  displayedColumns: string[] = ['TRN_REF_NO', 'MODULE', 'AC_NO', 'DRCR_IND', 'AC_CCY', 'LCY_AMOUNT', 'TRN_DT'];
  displayedColumns1: string[] = ['TRN_NO', 'CHANNEL', 'TRN_DT', 'LCY_AMOUNT'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  bankform: FormGroup;
  mtsform: FormGroup;
  // mydata : any | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // bank
  trndetails1: boolean;
  debitaccount: boolean;
  datasub: any | undefined;
  dataSource: any;
  dataSource1: any;
  contactSource: any;
  cond1: any;
  dropdown1: any;
  dropdown2: any;
  bank: boolean;
  mts: boolean;
  trnbank: any;
  custtypeI: boolean;
  typec: boolean;
  actnamebank: any;
  actnobank: any;
  cifbank: any;
  date1: any;
  submitbank: any;
  trnnomts: any;
  idnomts: any;
  submitmts: any;
  data: any;
  res: any;
  trndata: any;
  datatrn: any;
  fortrn: any;
  fortrn1: any;
  resp: any;
  senderId: any;
  sendtable: any;
  receiverId: any;
  sender: boolean;
  receiver: boolean;
  dataforstrforbanktrndebit: any;
  trndetailsData: TransactionDetails;
  submitbankfortransaction: boolean;
  accountdetails: Array<MtsDesc>;
  custDetails: CustomerDetailsBank;
  dataforstr: MtsDesc;
  arrayfordebit: any;
  arrayforcredit: any;
  arrayfortrn: any;
  custtypeIdata: any;
  checkType: any;
  custtypeB: boolean;
  trndetails: Array<Transactiondata>;
  mtsref: Mtsdata = new Mtsdata();
  bankref: Bankdata = new Bankdata();
  actclass: any;
  btypecustdata: any;
  mtsIdSendData: Array<Mtsidsenddata>;
  mtsdataidsend: Mtsidsenddata;
  mtsdataidsend1: Mtsidsenddata;
  bankdatawithnormaldebittype: any;
  creditdatfornormalaccount: any;
  // for transation type and g
  debitA: boolean;
  debitG: boolean;
  creditA: boolean;
  creditG: boolean;
  constructor(private api: STRService, private router: Router,
              private cdr: ChangeDetectorRef,
              public dialog: MatDialog, private dataService: DataService) {
    this.bankform = new FormGroup({
      trnbank: new FormControl(''),
      actnamebank: new FormControl(''),
      actnobank: new FormControl(''),
      cifbank: new FormControl(''),
      todate: new FormControl(''),
      fromdate: new FormControl(''),
    });
    this.mtsform = new FormGroup({
      trnmts: new FormControl(''),
      idmts: new FormControl(''),
      dropdownmts: new FormControl(''),
      todate1: new FormControl(''),
      fromdate1: new FormControl(''),
    });
  }

  ngOnInit() {
    // this.cond1=true;
    this.dataService.dataSubject.subscribe(data => {
      this.datasub = data;
      console.log(this.datasub);
      // this.mydata=data;
    });
  }
  // for dropdown
  getDropdown(search) {
    console.log(search);
    if (search === 'bank') {
      this.dropdown1 = true;
      this.dropdown2 = false;
      this.bank = false;
      this.mts = false;
    } else {
      this.dropdown2 = true;
      this.dropdown1 = false;
      this.bank = false;
      this.mts = false;
    }
  }
  // get the dropdown value

  getData(val1) {
    console.log(val1);
    this.bank = true;
    this.mts = false;
    if (val1 === 'txnno') {
      this.trnbank = true;
      this.actnamebank = false;
      this.actnobank = false;
      this.cifbank = false;
      this.date1 = false;
      this.submitbank = false;
    }
    if (val1 === 'actno') {
      // this.trnbank = false;
      this.actnobank = true;
      this.actnamebank = false;
      this.trnbank = false;
      this.cifbank = false;
      this.date1 = true;
    }
    // if (val1 == "actname") {
    //   this.actnamebank = true;
    //   this.trnbank = false;
    //   this.actnobank = false;
    //   this.cifbank = false;
    //   this.date1 = true;
    // }
    // if (val1 == "cif") {
    //   this.cifbank = true;
    //   this.actnobank = false;
    //   this.actnamebank = false;
    //   this.trnbank = false;
    //   this.date1 = true;
    // }
    if (this.actnamebank || this.actnobank || this.cifbank) {
      console.log('call button perm' + this.trnbank);
      this.submitbank = true;
    }
  }
  getData2(val1) {
    console.log(val1);
    this.mts = true;
    this.bank = false;
    if (val1 == 'transactionno') {
      this.trnnomts = true;
      this.idnomts = false;
      this.sendtable = false;
    }if(val1 == 'idno'){
      this.idnomts = true;
      this.trnnomts = false;
    } if (this.trnnomts || this.idnomts) {
      this.submitmts = true;
    }
  }
  // for mts based on the
  dataformtstrn() {
    console.log(this.mtsform.value);
    this.mtsref = this.mtsform.value;
    // data based on the customer transaction number.
    if (this.mtsref.trnmts) {
      this.api.getDataForMtsTrn(this.mtsform.value).subscribe(res => {
        this.res = res;
        console.log(this.res);
        this.mtsform.reset();
        if (this.res) {
          if (this.res.length !== 0) {
            console.log(res);
            // this.mtsdataidsend1 = this.res;
            console.log(this.res);
            this.showDialog2();
          } else {
            Swal.fire('Unable to Query Data !', 'Either data is Processed or Transaction Number is Invalid !');
          }
        } else {
          Swal.fire('No Related data','or Already Mapped !');
        }
      });
    } else if (this.mtsref.idmts && this.mtsref.dropdownmts && this.mtsref.fromdate1 && this.mtsref.todate1) {
      this.api.getDataForMtsId(this.mtsform.value).subscribe(resp => {
        this.resp = resp;
        console.log(this.resp);
        console.log(this.resp[0]);
        // need to be optimozed check condition for no data
        if (this.resp[0].length !== 0) {
          if (this.resp) {
            this.mtsIdSendData = this.resp[0];
            console.log(this.mtsIdSendData[0]);

            this.dataSource1 = new MatTableDataSource<any>(this.mtsIdSendData);
            if (this.mtsIdSendData[0].SENDER_ID) {
              this.receiver = false;
              this.sender = true;
              this.senderId = this.mtsIdSendData[0].SENDER_ID;
              this.sendtable = true;
            } else {
              this.sender = false;
              this.receiver = true;

              this.receiverId = this.mtsIdSendData[0].REC_ID;
              this.sendtable = true;
            }
            this.mtsform.reset();
          } else {
            Swal.fire('No Data For Display !');
          }
        } else {
          Swal.fire('Check Id Number', 'No Data Found !');
        }
      });

    } else {
      Swal.fire('Enter the Data !');
    }

    // console.log(idmts);
  }


  // for bank
  // for account number  actnobank
  senddataforbank() {
    console.log(this.bankform.value);
    console.log(this.bankform.get('fromdate').value);
    this.fortrn = false;
    if (this.bankform.get('fromdate').value && this.bankform.get('todate').value && this.bankform.get('actnobank').value) {
      this.api.getDataForBank(this.bankform.value).subscribe(data => {
        this.data = data;
        this.bankform.reset();
        console.log(this.bankform.value);
        this.actclass = false;
        console.log(this.data);
        if (this.data) {
          this.accountdetails = this.data[0];
          if (this.data[0]) {
            this.accountdetails.forEach(element => {
              this.dataforstr = element;

              console.log(element);
            });
          } else {
            Swal.fire('Failed to Display Data');
          }
          // this.custDetails=this.data[1];
          if (this.data[1]) {
            this.data[1].forEach(element => {
              this.custDetails = element;
              console.log(this.custDetails);
              this.checkType = this.custDetails;
              if (this.checkType.US_RES_STATUS) {
                console.log('Inside If type cust I');
                this.typec = true;

                this.custtypeIdata = this.custDetails;
                this.custtypeI = true;
                console.log(this.custtypeIdata);

              }
              // we have to implement the cust type b implementation here
              // we need one table in custtypeI
              // check the condition based on the  column value
              if (this.checkType.TRACK_LIMITS) {
                console.log('inside cust type B');
                this.btypecustdata = this.custDetails;
                this.custtypeB = true;
                console.log(this.btypecustdata);
              }

            });
          } else {
            Swal.fire('Failed to Display !');
          }
          if (this.data[2]) {
            this.trndetails = this.data[2];
            console.log(this.trndetails);
            this.dataSource = new MatTableDataSource<any>(this.trndetails);
            this.cdr.markForCheck();
            this.dataSource.paginator = this.paginator;
            if (this.dataforstr.ACCOUNT_CLASS) {
              this.actclass = true;
            }
          } else {
            Swal.fire('Failed to Display ! ');
          }
        } else {
          Swal.fire('Invalid Search !');
          this.actclass = false;
        }
      });
    } else {
      Swal.fire('Enter the Value for the Field !');
    }
  }
  // transaction bank query with trn no.
  forTrn() {
    console.log(this.bankform.value);
    this.actclass = false;
    this.api.getDataForTrn(this.bankform.value).subscribe(data => {
      this.datatrn = data;
      this.bankform.reset();
      console.log(this.datatrn);

      // 0-transaction number 1- credit 2-debit
      if (this.datatrn) {
        if (this.datatrn.length != 0) {
          this.fortrn = true;
          this.arrayfortrn = this.datatrn[0];
          if (this.arrayfortrn.length != 0) {
            console.log(this.arrayfortrn[0]);
            this.trndetails1 = true;
          } else {
            Swal.fire('Unable to dispaly Transaction Data !');
          }
          // this is for credit account
          this.arrayfordebit = this.datatrn[1];
          if (this.arrayfordebit.length != 0) {
            if (this.arrayfordebit[0].GL_CODE) {
              console.log(this.arrayfordebit[0]);
              this.debitaccount = true;
              this.creditG = true;
            } else {
              //  console.log(this.arrayfordebit);
              console.log(this.arrayfordebit[0]);
              this.creditdatfornormalaccount = this.arrayfordebit[0];
              console.log(this.creditdatfornormalaccount);
              this.debitaccount = true;
              this.creditA = true;
              console.log(this.creditA);
              console.log('inside normal account of debit' + this.creditdatfornormalaccount);
            }
          } else {
            Swal.fire('Unable to Display Credit Data !');
          }
          // this is for debit account
          this.arrayforcredit = this.datatrn[2];
          if (this.arrayforcredit.length != 0) {
            console.log(this.arrayforcredit);
            // this is for debit gl(GL_CODE) and account
            if (this.arrayforcredit[0].GL_CODE) {
              this.dataforstrforbanktrndebit = this.arrayforcredit[0];
              console.log(this.arrayforcredit[0]);
              this.fortrn1 = true;
              this.debitG = true;
            } else {
              this.bankdatawithnormaldebittype = this.arrayforcredit[0];
              console.log(this.arrayforcredit[0]);
              this.fortrn1 = true;
              this.debitA = true;
              console.log('inside normal account' + this.bankdatawithnormaldebittype);
            }
            //  console.log(this.dataforstrforbanktrn);
          } else {
            Swal.fire('Unable to display Debit data !');
          }
        } else {
          Swal.fire('Transaction Not Found ! ', 'Or It Is Already Marked !');
        }
      } else {
        Swal.fire('No Related Data Or Already Marked !');
      }
    });

  }
  getDetailsTransaction(element) {
    console.log('method call for details');
    console.log(element);
    const data3 = element.TRN_REF_NO;
    console.log(this.datasub);
    this.api.getTransactiondata(element.TRN_REF_NO).subscribe(data => {
      this.trndata = data;
      console.log(this.trndata);
      if (this.trndata.length != 0) {
        this.trndetailsData = this.trndata;

        // console.log(this.mydata);
        if (this.datasub !== undefined) {
          console.log('Inside if 1 ');
          this.datasub.forEach(element2 => {
            console.log(element2);
            if (element2 === data3) {
              console.log('Inside if ');
              Swal.fire('Already Mapped !');
            } else {
              console.log('else call');
              this.showDialog();
            }
          });
        } else {
          console.log('else call');
          this.showDialog();
        }

        // this.showDialog();
      } else {
        Swal.fire('Data Not Found', ' or Already Marked !');
      }
    });
  }
  getDetailsTransaction3(element) {
    console.log('method call for details');
    console.log(element);
    const data3 = element.TRN_REF_NO;
    console.log(this.datasub);
    this.api.getTransactiondata3(element.TRN_REF_NO).subscribe(data => {
      this.trndata = data;
      console.log(this.trndata);
      if (this.trndata.length != 0) {
        this.trndetailsData = this.trndata;

        // console.log(this.mydata);
        if (this.datasub !== undefined) {
          console.log('Inside if 1 ');
          this.datasub.forEach(element2 => {
            console.log(element2);
            if (element2 ==+ data3) {
              console.log('Inside if ');
              Swal.fire('Already Mapped !');
            } else {
              console.log('else call');
              this.showDialog();
            }
          });
        } else {
          console.log('else call');
          this.showDialog();
        }

        // this.showDialog();
      } else {
        Swal.fire('Data Not Found', ' or Already Marked !');
      }
    });
  }
  getDetailsTransaction1(element) {
    console.log('method call for details');
    console.log(element);
    console.log(this.datasub);
    const data2 = element;
    this.api.getTransactiondata(element).subscribe(data => {
      this.trndata = data;
      console.log(this.trndata);
      if (this.trndata.length != 0) {
        this.trndetailsData = this.trndata;

        if (this.datasub !== undefined) {
          console.log('Inside if 1 ');
          this.datasub.forEach(element2 => {
            console.log(element2);
            if (element2 == data2) {
              console.log('Inside if ');
              Swal.fire('Already Mapped !');
            } else {
              console.log('else call');
              this.showDialog();
            }
          });
        } else {
          console.log('else call');
          this.showDialog();
        }

        // this.showDialog();
      } else {
        Swal.fire('Data Not Found', ' or Already Marked !');
      }
    });
  }
  getMtsIdSend(element) {
    console.log('method call for details');
    console.log(element);
    const data = element.TRN_NO;
    // console.log(this.mtsIdSendData);
    this.mtsdataidsend = element;
    console.log(this.mtsdataidsend);
    // for cheked mapping
    console.log(this.datasub);
    console.log(element.TRN_NO);
    console.log(data);
    // console.log(this.mydata);
    if (this.datasub !== undefined) {
      console.log('Inside if 1 ');
      this.datasub.forEach(element1 => {
        console.log(element1);
        if (element1 == data) {
          console.log('Inside if ');
          Swal.fire('Already Mapped !');
        } else {
          console.log('else call');
          this.showDialog1();
        }
      });
    } else {
      console.log('else call');
      this.showDialog1();
    }

  }
  getRefresh() {
    // console.log("button call");
    // window.location.reload();
    this.router.navigate(['dataext']);
  }
  showDialog() {
    console.log(this.trndetailsData);
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.trndetailsData,

    });
    dialogRef.disableClose = true;

  }
  showDialog1() {
    console.log(this.mtsdataidsend);
    // console.log(this.mtsdataidsend1);
    // DialogMtsIdComponent
    const dialogRef = this.dialog.open(DialogMtsIdComponent, {
      data: this.mtsdataidsend,

    });
    dialogRef.disableClose = true;

  }
  showDialog2() {

    console.log(this.res);
    // DialogMtsIdComponent
    const dialogRef = this.dialog.open(DialogMtsIdComponent, {
      data: this.res[0],

    });
    dialogRef.disableClose = true;

  }
}

