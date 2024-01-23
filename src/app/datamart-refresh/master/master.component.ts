import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { Observable } from 'rxjs';
import { TvDatamart } from '../TvDatamart';
import { TmModExtractionDetails } from '../TmModExtractionDetails';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  
  tmModExtractionDetails:Observable<TmModExtractionDetails[]>;
  tvDatamart:TvDatamart[];
  modules: string;
  response:any;
  validationResponse:any;
  lastExecDate:Date;
  dateMsg:any;
  tempResponse:any;
  result:any;
  public timerInterval:any;
  refreshStatus:boolean = false;
  constructor(private apiService:APIService) { }

  ngOnInit() 
  {
    this.masterLastExecDate();
    this.modulesList();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      console.log("Refresh stopped!");
    }
  }
  refreshEvent(exe_date:Date) {
    console.log("Refreshing every 10secs");
    this.timerInterval=setInterval(() => this.masterRefreshButton(exe_date), 10000);
  }

  masterLastExecDate()
  {
    this.apiService.masterLastExecDateService().subscribe(result=>{
      this.lastExecDate=result;
      console.log(this.lastExecDate);
    });
  }
  master(exe_date,branch)
  {
    if(this.refreshStatus == false)
    {
      console.log("Refresh for Current Day");
      this.refreshEvent(exe_date);
    }
    //this.tempResponse = "Processing...";
    this.response = "Processing...";
    this.modules ="ALL";
    if(!exe_date)
    {
      this.validationResponse = "Please Enter Date!";
      this.response = null;
    }
    else if (!branch)
     {
        this.validationResponse = "Please Select Branch!"; 
        this.response = null;
    }
    else
    {

      this.apiService.dateValidate(exe_date).subscribe(event=>{
        this.result=event;
        console.log(this.result);
        if(this.result)
        {
        }
        else
          this.dateMsg="Montly Modules Are not Executed!";
  
        });
  
      this.validationResponse = null;
     this.apiService.masterService(exe_date,branch,this.modules).subscribe(resp=>{this.tvDatamart=resp;
      console.log(this.tvDatamart);
      if(this.tvDatamart)
      {
        // this.tvDatamart[1].status = 'F';
        // this.tvDatamart[3].status = 'F';
        this.response = null;
        if(this.tvDatamart[0].exec_date!=exe_date)
        {
          this.validationResponse = "Execute Previous Day Failed Modules Before Proceeding!";
          this.refreshStatus = true;
          this.response = null;
          this.dateMsg = null;
        }
      }
     
      // if(this.tvDatamart[0] ==  null)
      // {
      //   this.response = "No Data Found with that Date";
       });

      }
     
  }
  masterRetry(exe_date,modules)
  {
    this.modules =modules;
    var branch="ALL";
    console.log("master retry");
    console.log(exe_date);
    console.log(modules);
    this.apiService.masterService(exe_date,branch,this.modules).subscribe(resp =>{this.tvDatamart=resp;
      if(this.tvDatamart)
      {
        this.response = null;
      }
    });
  }   
  masterRefreshButton(exe_date)
  {

    if(this.refreshStatus == true)
    {
      console.log("Refresh for Previous Day");
      this.masterRefreshPrevDay(this.lastExecDate);
      this.dateMsg = null;
    }
    if(this.refreshStatus == false)
    {
    this.apiService.masterRefreshButtonService(exe_date).subscribe(resp =>{this.tvDatamart=resp;
      if(this.tvDatamart)
      {
        this.response = null;
      }
    });
  }
  }

  masterRefreshPrevDay(exe_date)
  {
    this.apiService.masterRefreshButtonService(exe_date).subscribe(resp =>{this.tvDatamart=resp;
      if(this.tvDatamart)
      {
        this.response = null;
      }
    });
  }

  modulesList()
  {
    this.tmModExtractionDetails=this.apiService.modulesListService();
    console.log(this.tmModExtractionDetails);
  }

  reset()
  {
    this.response = null;
    this.validationResponse = null;
    this.dateMsg = null;
  }
}
