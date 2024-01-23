import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { STRService } from '../str-desc/custsearch.service';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-errorlog',
  templateUrl: './errorlog.component.html',
  styleUrls: ['./errorlog.component.css']
})
export class ErrorlogComponent implements OnInit {
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  displayedColumns1: string[] = ['LOG_TIMESTAMP', 'TYPE', 'PACKAGE_NAME', 'PROCEDURE_NAME','MESSAGE','ERR_CODE','LINE_NUM'];
  // exampleDatabase: ExampleHttpDatabase | null;

  response:any;
  data1:any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  dataSource:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _httpClient: HttpClient,private api: STRService) {}

  ngOnInit() {
    this.getErrorStackdata();
  }
  getErrorStackdata(){
    this.api.getErrorStack().subscribe(response=>{
      this.response=response;
      console.log(this.response);
      this.data1=this.response;
      this.dataSource = new MatTableDataSource(this.data1);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
