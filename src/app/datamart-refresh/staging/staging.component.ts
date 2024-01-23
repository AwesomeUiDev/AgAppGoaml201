import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { Observable } from 'rxjs';
import { PackageDTO } from './PackageDTO';
import { TvDatamart } from '../TvDatamart';
import { TmModExtractionDetails } from '../TmModExtractionDetails';

@Component({
  selector: 'app-staging',
  templateUrl: './staging.component.html',
  styleUrls: ['./staging.component.css']
})
export class StagingComponent implements OnInit {


  tmModExtractionDetails:Observable<TmModExtractionDetails[]>;
  tvDatamart:TvDatamart[];
  modules: string;
  validationResponse:any;
  response:any;
  lastExecDate:Date;
  dateMsg:any;
  result:any;
  public timerInterval:any;
  globalExeDate:Date;
  refreshStatus:boolean = false;
  checkLastMaster: boolean=true;
  constructor(private apiService: APIService)
   {
      

   }

  ngOnInit()
  {
    this.stgLastExecDate(); 
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
   this.timerInterval = setInterval(() => this.stagingRefreshButton(exe_date), 10000);
    //setTimeout(()=> this.stagingRefreshButton(exe_date), 100000);
  //  for (let i = 0; i < this.tvDatamart.length; i++) {
    
    
  //   if (this.tvDatamart[i].status=='C') {
  //     clearInterval(exe_date);
  //  }
  //  }
   
  }

  stgLastExecDate()
  {
   this.apiService.stgLastExecDateService().subscribe(event=>{
    this.lastExecDate=event;
    console.log(this.lastExecDate);
    });
  }
  staging(exe_date,branch)
  {
    if(this.refreshStatus == false)
    {
      console.log("Refresh for Current Day");
      this.refreshEvent(exe_date);
    }
 
    this.response = "Processing...";
   
    this.modules ="ALL";
    if(!exe_date)
    {
     
      this.validationResponse = "Please Enter Date!";
      this.response = null;
    }
    else if(!branch)
     {
     
        this.validationResponse = "Please Select Branch!"; 
        this.response = null;
    }
    else
    {

      
      this.validationResponse = null;
      this.validationResponse = null;
      this.apiService.dateValidate(exe_date).subscribe(event=>{
      this.result=event;
      console.log(this.result);
      if(this.result)
      {
      }
      else
      {
      if(this.checkLastMaster==true)
        this.dateMsg=" Montly Modules Cannot be Executed!";
        else
        this.dateMsg=null;
      }
      });
      this.apiService.checkLastMasterDetailsService().subscribe(res=>{
        this.checkLastMaster=res;
        console.log("lastMaster");
        console.log(res);
     
if(res==true)
{
    this.apiService.stagingService(exe_date,branch,this.modules).subscribe(resp =>{this.tvDatamart=resp;
      if(this.tvDatamart)
      {
        this.response = null;
        console.log(this.tvDatamart);

        if(this.tvDatamart[0].exec_date!=exe_date)
        {
          this.validationResponse = "Execute Previous Day Failed Modules Before Proceeding!";
          this.refreshStatus = true;
          this.response = null;
          this.dateMsg = null;
  
        }

      }
     
     
      //this.tvDatamart[1].status='F';
    });
  }
  else{
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      console.log("Refresh stopped!");
    }
    //this.refreshStatus = true;
    this.response = null;
    this.dateMsg = null;
    this.validationResponse = "Execute Previous Day Failed Master Modules Before Proceeding!";
         
  }
});
  }
  }
  stagingRetry(exe_date,modules)
  {

    this.modules =modules;
    var branch="ALL";
    console.log("staging retry");
    console.log(exe_date);
    console.log(modules);
    this.apiService.stagingService(exe_date,branch,this.modules).subscribe(resp =>{this.tvDatamart=resp;
      if(this.tvDatamart)
      {
        this.response = null;
      }
    });
  }   
  stagingRefreshButton(exe_date)
  {

    if(this.refreshStatus == true)
    {
      console.log("Refresh for Previous Day");
      this.stagingRefreshPrevDay(this.lastExecDate);
      this.dateMsg = null;
    }
   if(this.refreshStatus == false)
   {
    console.log(exe_date);
      this.apiService.stagingRefreshButtonService(exe_date).subscribe(resp =>{this.tvDatamart=resp;
        if(this.tvDatamart)
        {
          this.response = null;
        }
      });
    }
  }

  stagingRefreshPrevDay(exe_date)
  {
   
      this.apiService.stagingRefreshButtonService(exe_date).subscribe(resp =>{this.tvDatamart=resp;
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
