import { Component, OnInit } from '@angular/core';
import { DM_REPORTS } from '../DM_REPORTS';
import { APIService } from '../../api.service';
import { Observable } from '../../../../node_modules/rxjs';
import { HttpHeaderResponse, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Dept } from '../../user-management/Dept';
//import { AngularFileUploaderModule } from "angular-file-uploader";
declare const $;

@Component({
  selector: 'app-finance-upload',
  templateUrl: './finance-upload.component.html',
  styleUrls: ['./finance-upload.component.css']
})
export class FinanceUploadComponent implements OnInit {

  file:File;
  rList :string[];
  columnNameList: string[];
  selectedFiles: FileList;
  response:any;
  responseMsg:any;
  responseError:any;
   currentFileUpload: File;
   fileUploadStatus=false;
   rName:any;
   dName:any;
   deptList:string[];
   userId:string;
    deptObject:Dept;
    userDept:string[];
    unlock:boolean = false;
   
  constructor(private apiService :APIService) {

    
   }

  ngOnInit() 
  {
    //console.log("ng on init b!");
    //this.reportNameList();
    this.userId=localStorage.getItem("userIdForChangePassword");
   // this.deptNames();
    this.getUserDept(this.userId);
   
    //console.log("ng on init e!");
    }
  reportNameList(dept)
  {
    this.apiService.reportListByDeptService(dept).subscribe(resp=>{
      this.rList = resp;
      console.log("rlist");
      console.log(this.rList);
    }
    );
   
  }

  columnNames(reportName)
  {
    console.log(reportName);
    this.rName=reportName;
    this.apiService.columnNamesService(reportName).subscribe(event=>{
      this.columnNameList=event;
      console.log(this.columnNameList)
  
    });
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

     // var deptObject = new Dept();
      this.deptObject=res;
      if(this.deptObject)
      this.deptList = this.deptObject.dept.split(",");
     //this.userDept=this.deptObject[].this.deptObject
      // for (let i = 0; i < this.deptObject.length; i++) {
      //   this.deptList.push(this.deptObject[i].dept);
      // }
      
    // var json =  JSON.stringify(this.userDept);
     console.log(this.deptList);
     //console.log(json);
      //this.deptNames();
    

    //   if(this.userDept)
    //   {
    // for (let i = 0; i < this.deptList.length; i++) 
    // {
    //       if(this.deptList[i]==this.userDept)
    //       {
           //console.log("matched");
            //this.reportNameList(this.userDept);
            //return;
        //   }
        //   else{
        //     console.log("not matched");
        //   }
        // }
      //}  
 
  });
  }
  

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

financeUpload(Exec_Date) {
    this.responseMsg = "Uploading Please wait...";

    this.currentFileUpload = this.selectedFiles.item(0);
    if(!Exec_Date)
    {
      this.responseError = "Enter Date!";
      this.responseMsg = null;
    }
    else if(!this.currentFileUpload)
    {
      this.responseError = "Upload File!";
      this.responseMsg = null;
    }
    else if(this.rName == undefined || this.rName == "Select Report")
    {
      this.responseError = "Select Report!";
      this.responseMsg = null;
    }
    else
    {
   // this.rName='CASA_REPORT';
    this.apiService.financeUploadService(this.currentFileUpload,this.rName,Exec_Date).subscribe(event => {
      if(event)
      {
        this.responseError = null;
     if (event instanceof HttpResponse) {
       console.log(event.status);
      
      
       if(event.status == 200)
       { 
        this.responseMsg = "File uploaded Successfully!";
        this.fileUploadStatus = true;
        this.responseError = null;
        console.log('File is completely uploaded!');
       }
       
      //  if(event.ok == false)
      //  {
      //   this.responseError = "Upload Failed!";
      //   this.fileUploadStatus = false;
      //  this.responseMsg = null;
      //  }
      }
      if(event instanceof HttpHeaderResponse ||event instanceof HttpErrorResponse) 
       {
         console.log(event);
         this.responseError = "Upload Failed Please Contact Admin!";
         this.responseMsg = null;
       }
      }
    },error=>{
      if(HttpErrorResponse)
      {
        console.log(event);
         this.responseError = "Upload Failed Please Contact Admin!";
         this.responseMsg = null;
      }
    });
    this.selectedFiles = undefined;
  }
  
  }

  tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        var blob = new Blob([format(template, ctx)]);
        var blobURL = window.URL.createObjectURL(blob);
            this.responseMsg = "Template Downloaded!";
        if (this.ifIE()) {
           var csvData = table.innerHTML;
            if (window.navigator.msSaveBlob) {
                var blob = new Blob([format(template, ctx)], {
                    type: "text/html"
                });
                navigator.msSaveBlob(blob, '' + name + '.xls');
            }
        }
        else
        window.location.href = uri + base64(format(template, ctx))
    }
})()

 ifIE():boolean
 {
    var isIE11 = navigator.userAgent.indexOf(".NET CLR") > -1;
    var isIE11orLess = isIE11 || navigator.appVersion.indexOf("MSIE") != -1;
    return isIE11orLess;
}

reset()
{
  this.responseError = null;
  this.responseMsg = null;
  this.rName = null;
}


// dowloadExcelTest()
// {
//   var fileName = this.rName;
//   var opts = {
//     headers:false, 
//     column: {
//         style:{
//             Font:{
//                 Bold:"1",
//                 Color:"#3C3741",
//             },
//             Alignment:{
//                 Horizontal:"Center"
//             },
//             Interior:{
//                 Color:"#7CEECE",
//                 Pattern:"Solid"
//             }
//         },
//     },
//   };
//   alasql('SELECT * INTO XLSXML("'+fileName+'.xls",?) FROM ?',[opts,this.columnNameList]);
// }
}
