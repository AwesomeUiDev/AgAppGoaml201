import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ExtsysClass } from 'src/app/GOAML/ext-system/extsys-class';
import { ExcelProcessingSummary } from './ExcelProcessingSummary';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { ExcelApiService } from './ExcelApiService';
import { ExcelProcessingService } from './excel-processing.service';
import { DateService } from './date.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-excel-upload-summary',
  templateUrl: './excel-upload-summary.component.html',
  styleUrls: ['./excel-upload-summary.component.css']
})
export class ExcelUploadSummaryComponent implements OnInit {
  processName: any;
  processNames: string[];
  extsysClass = new ExtsysClass();
  executionDate: Date;
  uploadDate: Date;
  showingtable = false;
  dateup: any;
  dateexe: any;
  responseFromBackend:any;
  currentUser: any;
  myFormattedDate: any;
  myFormattedTime:any;
  pipe = new DatePipe('en-US');
  displayedColumns: string[] = ['extSysName', 'processName', 'status',  'filename','uploadTime'];
  dataSource: any;
  deptName: string;
  extSysCodeArray: any = [];
  resp: any;
  dataSource1: any;
  showingtable1: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  constructor(private api: ExcelProcessingService,
   // private toast: ToastrService,
              private dateService: DateService,
              private cdr: ChangeDetectorRef,
              private apiExcel: ExcelApiService
    ) { }
  allExternalSystemNames: string[];

  ngOnInit() {
    this.currentUser =  localStorage.getItem('userId');
    // this.getDept(this.currentUser.roleId);
    this.gettingAllExternalSystemName();
  }

  getSummary() {
    this.showingtable = true;
  }
  gettingAllExternalSystemName() {
    console.log('on click of External System Name');
    this.apiExcel.getAllExtCodeForExcelUpload()
      .subscribe(responseFromBackend => {
        this.responseFromBackend = responseFromBackend;
        console.log(this.responseFromBackend);
        this.dataSource = this.responseFromBackend;
        this.dataSource = new MatTableDataSource<any>(this.dataSource);
        this.showingtable = true;
        this.dataSource.paginator = this.paginator;
       // setTimeout(() => this.dataSource.paginator = this.paginator);

        });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //  // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  // }
  getDataOnDate(uploadDate: Date) {
  
    console.log('uploadDate->' + uploadDate);


    if (uploadDate) {
      // this.dateup = this.dateService.convertDate(uploadDate);
      // console.log(this.dateup);

     // now = Date.now();
      this.myFormattedDate = this.pipe.transform(uploadDate, 'dd-MM-yy');
      this.apiExcel.onClickOfQueryOfExcelProcessingSummary(this.myFormattedDate)
      .subscribe(resp => {
        this.resp = resp;
        console.log(this.resp);
        this.dataSource1 = new MatTableDataSource(this.resp);
        // this.dataSource1.paginator = this.paginator;
        this.showingtable = false;
        this.showingtable1 = true;
      });
    }


  }
}
