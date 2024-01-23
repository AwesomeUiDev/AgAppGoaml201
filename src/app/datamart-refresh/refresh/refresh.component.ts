import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { Observable } from 'rxjs';
import { DM_REPORTS } from '../../finance/DM_REPORTS';
import { Console } from '@angular/core/src/console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent implements OnInit {

  
  
  reports : string[];
  branches: string[];
  response:any;
  validationResponse:any;
  buttonFlag:boolean = false;
  constructor(private apiService:APIService) { }

  ngOnInit() 
  {
    this.reportList();
    this.branchList();
  }

  branchList() 
  {
    this.apiService.branchListService().subscribe(result=>{this.branches=result;
      console.log(this.branches);
    });
    
  }
  reportList()
  {
    this.apiService.reportListService().subscribe(result=>{this.reports=result;});
    console.log(this.reports);
  }

  reportRefresh(mis_date,branch,report)
  {
    if(!mis_date || !branch || !report)
      {
        this.validationResponse = "All Fields are Mandatory!";
      }
      else
      {
    console.log(mis_date,branch,report);
    this.apiService.reportRefreshService(mis_date,branch,report).subscribe(event=>{
      this.response = event;
      console.log(this.response);
      
     
      if(this.response == true)
      {
        this.response = "Refresh Success!";
        this.validationResponse = null;
        this.buttonFlag = true;
      }
      else
      {
        this.validationResponse = "Refresh Failed!";
        this.response = null;
      }
    
      
    },error=>{
      if(HttpErrorResponse)
      {
        this.validationResponse = "Refresh Failed!";
        this.response = null;  
      }
    });
  }
  }

  reset()
  {
    this.response = null;
    this.validationResponse = null;
    this.buttonFlag = false;
  }
}
