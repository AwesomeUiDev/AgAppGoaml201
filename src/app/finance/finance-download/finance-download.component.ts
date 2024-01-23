import { Component, OnInit } from '@angular/core';
import { HttpHeaderResponse, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { APIService } from 'src/app/api.service';
import { DM_REPORTS } from '../DM_REPORTS';
import { Observable } from 'rxjs';
import { DynamicDTO } from './DynamicDTO';
import { Dept } from '../../user-management/Dept';

@Component({
  selector: 'app-finance-download',
  templateUrl: './finance-download.component.html',
  styleUrls: ['./finance-download.component.css']
})
export class FinanceDownloadComponent implements OnInit {

  file:File;
  listFromDb:any[];
  columnNameList: string[];
  selectedFiles: FileList;
  response:any;
  responseMsg:any;
  responseError:any;
   currentFileUpload: File;
   fileUploadStatus=false;
   rName:any;
   map:Map<number,Object> = new Map();
   //dy = new DynamicDTO();
   objectArr:Object[];
   deptList=[];
   rList :string[];
   userId: string;
   deptObject: Dept;
   userDept: string[];
   //downloadStatus:boolean;
  constructor(private apiService :APIService) { }

  ngOnInit() 
  {
    
    this.userId=localStorage.getItem("userIdForChangePassword");
    this.getUserDept(this.userId);
   // this.deptNames();
    //this.financeDownload(null,null);
  }
  
  reportNameList(dept)
  {
    this.apiService.reportListByDeptService(dept).subscribe(resp=>{
      this.rList = resp;
      console.log("deptList");
      console.log(this.rList);
    }
    );
   
  }

  deptNames()
  {
  
    this.apiService.getdeptListService().subscribe(event=>{
      this.deptList=event;
      console.log(this.deptList);
  
    });
  }
  getUserDept(userId)
  {    
   // var userDept;
    this.apiService.getUserDeptService(userId).subscribe(res=>{
      this.deptObject=res;

      if(this.deptObject)
      this.deptList = this.deptObject.dept.split(",");
      //this.userDept=this.dept.dept;
      // for (let i = 0; i < this.deptObject.length; i++) {
      //   this.userDept.push(this.deptObject[i].dept);
      // }
    // var json =  JSON.stringify(this.userDept);
     console.log(this.deptList);
     //console.log(json);
    //  if(this.deptList)
    //  for (let i = 0; i < this.deptList.length; i++) 
    //  {
    //        if(this.deptList[i]==this.userDept)
    //        {
    //          console.log("matched");
            // this.reportNameList(this.userDept);
             //return;
        //    }
        //    else{
        //      console.log("not matched");
        //    }
        //  }  
  });
  }

  columnNames(reportName)
  {
    console.log(reportName);
    this.rName=reportName;
    // this.apiService.columnNamesService(reportName).subscribe(event=>{
    //   this.columnNameList=event;
    //   console.log(this.columnNameList)
  
    // });
  }
  // selectFile(event) {
  //   this.selectedFiles = event.target.files;
  // }

financeDownload(Exec_Date,reportName) {
    this.responseMsg = "Downloading Please wait...";
   
    if(!Exec_Date)
    {
      this.responseError = "Enter Date!";
      this.responseMsg = null;
    }
    else if(reportName == "Select Report" || reportName == undefined)
    {
      this.responseError = "Select Report!";
      this.responseMsg = null;
    }
    else
    {

    this.apiService.financeDownloadService(reportName,Exec_Date).subscribe(resp=>{
      // this.listFromDb = this.columnNameList;
      // for(var i=0;i<resp.length;i++)
      // {
      //   this.listFromDb.push(resp[i]);
      // }
      this.listFromDb = resp;
      // this.objectArr = this.listFromDb;
      // console.log(this.objectArr);
      
      // var temp = JSON.stringify(this.listFromDb); 
      // console.log(temp);
      // var arr =temp.split(',');
      // console.log(arr);
      // var values;
      // for (let i = 1; i < arr.length; i++) {
        
      //     values = arr[i].split(":");
      //     this.dy.column1 = values[1];
      //     console.log(this.dy);
      //     console.log(values);
      // }

      console.log( this.listFromDb);
      //console.log( this.listFromDb.keys);
      this.responseMsg = null;
      this.responseError = null;

      //DATE PLUS ONE
      // this.listFromDb.forEach(function(entry) {
      //   var d = new Date(entry["EXEC_DATE"]);
      //   // Add one day
      //   d.setDate(d.getDate() + 1);
      //     // Replace existing date in array with the new one
      //   entry["EXEC_DATE"] = d.toISOString()
      // })

      if(reportName != "Select Report")
      {
      var fileName= reportName;//prompt("Enter Filename");
      var opts = {
        headers:true, 
        column: {
            style:{
                Font:{
                    Bold:"1",
                    Color:"#3C3741",
                },
                Alignment:{
                    Horizontal:"Center"
                },
                Interior:{
                    Color:"#7CEECE",
                    Pattern:"Solid"
                }
            },
        },
      };
      alasql('SELECT * INTO XLSXML("'+fileName+'.xls",?) FROM ?',[opts,this.listFromDb]);
    }
      this.responseMsg ="Download Successful!";
      this.responseError = null;
    },error=>{
      if(HttpErrorResponse)
      {
        this.responseMsg =null;
        this.responseError = "Download Failed!";
      }
    });
  
  }
      }

  reset()
  {
    var index;
    this.listFromDb.splice(index);
    this.responseMsg = null;
    this.responseError = null;
  }

}
