import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { DatamartRefreshLog } from '../DatamartRefreshLog';
import { Observable } from 'rxjs';
import { TwMartRefresh } from '../TwMartRefresh';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  response:any;
  validationResponse:any;
  log:DatamartRefreshLog[];
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
    'dd/MM/yyyy hh:mm:ss',
    'dd-MM-yyyy',
    'dd-MM-yyyy HH:mm:ss',
    'MM/dd/yyyy',
    'MM/dd/yyyy hh:mm:ss',
    'yyyy/MM/dd',
    'yyyy/MM/dd HH:mm:ss',
    'dd/MM/yy',
    'dd/MM/yy hh:mm:ss',
    ];
  formatDate =  'dd/MM/yyyy_hh:mm:ss';
  dateNow : Date = new Date();
  dateNowISO = this.dateNow.toISOString();
  dateNowMilliseconds = this.dateNow.getTime();

  constructor(private apiService:APIService) { }

  ngOnInit() {
  }

  fetchDatamartRefreshLog(exec_date:Date, area:string)
  {
    console.log(exec_date);
    console.log(area);
     this.apiService.fetchDatamartRefreshLog(exec_date,area).subscribe(resp=>{this.log=resp;
      if(this.log[0] == null)
      {
          this.validationResponse = "No Data Found with that Date!";
          this.response = null;
      }
      else
      {
          this.validationResponse = null;
      }
    });
  }
  
  reset()
  {
    this.response = null;
    this.validationResponse = null;
    this.log = null;
  }

}
