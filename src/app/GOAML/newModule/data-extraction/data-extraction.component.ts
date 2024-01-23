import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionDto } from 'src/app/GOAML/transaction-dto';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { XmlServiceService } from 'src/app/GOAML/service/xml-service.service';
import { DataExtraction } from './dataExtract';
import { STRService } from '../str-desc/custsearch.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-data-extraction',
  templateUrl: './data-extraction.component.html',
  styleUrls: ['./data-extraction.component.css']
})
export class DataExtractionComponent implements OnInit {
  response: any;
  response1: any;
  response2: any;
  msg: any;
  two: boolean;
  one: boolean;
  transactionDto: TransactionDto;
  dateData: DataExtraction = new DataExtraction();
  report: TransactionDto[];
  reportTypeData: any;
  moduledata: any;
  userId: any;
  list = new Array<TransactionDto>();
  datafortable: boolean;
  reportName1: TransactionDto;
  reportNameForDropdown: Array<TransactionDto['reportName']>;
  displayedColumns: string[] = ['trnRefNo', 'transactionDate', 'module', 'currency', 'lcyAmount', 'reportingDate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: any;
  uploadDate: any | undefined;
  pg1: any;
  moduleEnable:boolean;
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  pipe = new DatePipe('en-US');
  // now = Date.now();
  // myFormattedDate = this.pipe.transform(this.now, 'dd-MMM-yy');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  error: boolean;
  errorMsg: string;
  loggedInUser: string;
  responseAlctr: any;
  responseIwtr: any;

  constructor(private service: XmlServiceService, private apicall: STRService) { }

  ngOnInit() {
    this.loggedInUser = localStorage.getItem('userFromLogin');
    this.userId = localStorage.getItem('userId');
    this.pg1 = false;
    this.error=false;
    this.errorMsg='';
    this.tocheckTheDropdown();

  }


  getRecordTrn() {
    console.log(this.dateData.toDate);
    console.log(this.dateData.fromDate);
    console.log(this.dateData.reportType);
    console.log(this.dateData.module);
    console.log(this.uploadDate);
    this.pg1 = true;
    if (this.uploadDate) {
      this.dateData.toDate = null;
      this.dateData.fromDate = null;

      this.apicall.getDataForMtsUpload(this.uploadDate, this.dateData.reportType, this.dateData.module).subscribe(msg => {
        this.msg = msg;
        this.pg1 = false;
        console.log(this.msg);
        this.uploadDate = null;

        if (this.msg) {
          Swal.fire('Data Extraction Status : '+ this.msg );
        } else {
          Swal.fire('Failed to Extract Data !');
        }
      },
      error => {
        this.error = true;
        this.errorMsg = error.error.error;
        console.log(error); //gives the object object
        console.log(error.error.error);
       // this.showError(error.json());
      },
      );
    } else {
      this.dateData.maker = this.userId;
      // if (this.dateData.toDate && this.dateData.fromDate && this.dateData.reportType && this.dateData.module) {
        if (this.dateData.toDate && this.dateData.fromDate && this.dateData.reportType) {
          if(this.dateData.reportType == 'LCTR'){
      this.apicall.getDataForExtraction(this.dateData,this.loggedInUser).subscribe(data => {
          this.response1 = data;
          this.pg1 = false;
          console.log(this.response1);
          console.log("userId::",this.loggedInUser)
          if (this.response1) {
            Swal.fire('Status for the process: ' + this.response1[0]);
          } else {
            Swal.fire(' Process Failed ');
          }
          
        });
      }
      if(this.dateData.reportType=='ALCTR'){
        this.apicall.getALCTRDataForExtraction(this.dateData,this.loggedInUser).subscribe(data => {
          this.responseAlctr = data;
          console.log("dateData",this.dateData)
          this.pg1 = false;
          console.log(this.responseAlctr);
          console.log("userId::",this.loggedInUser)
          if (this.responseAlctr) {
            Swal.fire('Status for the process: ' + this.responseAlctr);
          } else {
            Swal.fire(' Process Failed ');
          }
          
        });
      }
      }
      if(this.dateData.reportType=='IWTR'){
        this.apicall.getIWTRDataForExtraction(this.dateData,this.loggedInUser).subscribe(data => {
          this.responseIwtr = data;
          console.log("dateData",this.dateData)
          this.pg1 = false;
          console.log(this.responseIwtr);
          console.log("userId::",this.loggedInUser)
          if (this.responseIwtr) {
            Swal.fire('Status for the process: ' + this.responseIwtr);
          } else {
            Swal.fire(' Process Failed ');
          }
          
        });
      }else {
        this.pg1 = false;
        Swal.fire('Enter the value !');
      }
      this.dateData.toDate = null;
      this.dateData.fromDate = null;
      this.dateData.reportType = null;
      this.dateData.module = null;
    }
  }

  tocheckTheDropdown() {

    // this.moduledata = ['RT', 'FT', 'MTS','DE'];
    // this.moduledata = ['RT', 'FT', 'MTS'];
    this.reportTypeData = ['LCTR', 'ALCTR', 'IWTR'];

  }
  tableHide() {
    this.datafortable = undefined;
  }
  getDropdown(search) {
    console.log(search);
    console.log('reportType');
    if (search === 'mts') {
      this.one = true;
    } else {
      this.two = true;
    }
  }
  public onChange(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    console.log(newVal);
    // if (newVal == 'MTS') {
    //   this.one = true;
    //   this.two = true;
    // } else {
    //   this.two = false;
    //   this.one = false;
    // }
    if (newVal == 'EPAY' || newVal == 'MTS') {
      this.one = true;
      this.two = true;
    } else {
      this.two = false;
      this.one = false;
    }
   
  }
  public onChange1(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
   
    if(newVal=='LCTR'){
      this.moduledata = ['RT', 'FT', 'DE'];
      this.moduleEnable=true;
    }
    if(newVal=='ALCTR'){
      this.moduleEnable=false;
      this.moduledata = ['RT', 'FT', 'MTS'];
    }
    if(newVal=='IWTR'){
      this.moduleEnable=false;
      this.moduledata = ['FT'];
    }
  }
}
