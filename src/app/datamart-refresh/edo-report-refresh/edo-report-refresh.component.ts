import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edo-report-refresh',
  templateUrl: './edo-report-refresh.component.html',
  styleUrls: ['./edo-report-refresh.component.css']
})
export class EdoReportRefreshComponent implements OnInit {


  reports : string[];
  branches: string[];
  response:any;
  validationResponse:any;
  buttonFlag:boolean = false;

  constructor(private apiService:APIService) { }

  ngOnInit() {
    this.branchList();
  }

  branchList() 
  {
    this.apiService.branchListService().subscribe(result=>{this.branches=result;
      console.log(this.branches);
    });
  }

  eodReportRefresh(mis_date,branch,report)
  {
    if(!mis_date || !branch || !report)
      {
        this.validationResponse = "All Fields are Mandatory!";
      }
      else
      {
    console.log(mis_date,branch,report);
    this.apiService.eodReportRefreshService(mis_date,branch,report).subscribe(event=>{
      this.response = event;
      console.log(this.response);
      
     
      if(this.response == true)
      {
        this.response = "Eod Refresh Success!";
        this.validationResponse = null;
        this.buttonFlag = true;
      }
      // else
      // {
      //   this.validationResponse = "Eod Refresh Failed!";
      //   this.response = null;
      // }
    
      
    },error=>{if(HttpErrorResponse)
      {
        this.validationResponse = "Eod Refresh Failed!";
        this.response = null;
      }});
  }
  }

  reset()
  {
    this.validationResponse = null;
    this.response = null;
    this.buttonFlag = false;
  }

}
