import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { APIService } from 'src/app/api.service';

@Component({
  selector: 'app-ifrs-process',
  templateUrl: './ifrs-process.component.html',
  styleUrls: ['./ifrs-process.component.css']
})
export class IfrsProcessComponent implements OnInit {

  perc:any;
  fileUpload:File = null;
  fileUploadStatus=false;
  response:any;
  responseMsg:any;
  responseError:any;
  selectedFiles: FileList;
   currentFileUpload: File;
   statusCode:any;
   dateValidate:boolean = false;
  constructor(private apiService:APIService) { }

  ngOnInit() {
  }

  handleFileInput(file:FileList)
  {
    this.fileUpload = file.item(0);
    var reader = new FileReader();
  }

  startProcess(misDate)
  {
    // if(!misDate)
    // {
    //   this.dateValidate = false;
    // }
    this.responseError = "Processing Please Wait!";
    this.dateValidate = false;
    console.log(misDate);
    console.log("process intiated");
    this.apiService.callIfrsFunction(misDate).subscribe(resp=> {this.response=resp;
    console.log(resp);
    if(this.response == true)
   {
      //this.fileUploadStatus = false;
      this.responseMsg = "Process Completed!";
      this.responseError = null;
      this.perc = true;
   }
   if(this.response == false)
   {
    //this.fileUploadStatus = true;
    this.responseError = "Process Failed!";
    this.responseMsg = null;
     this.perc = false;
   }
    
    console.log(resp)});
   console.log("this is response "+this.response);
   
  }

  // selectFile(event) {
  //   this.selectedFiles = event.target.files;
  // }
  // upload() {
  //   this.responseMsg = "Uploading Please wait...";
  //   this.currentFileUpload = this.selectedFiles.item(0);
  //   this.apiService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
  //     if(event)
  //     {
  //       this.responseError = null;
  //    if (event instanceof HttpResponse) {
  //      console.log(event.status);
      
      
  //      if(event.status == 200)
  //      { 
  //       this.responseMsg = "File uploaded Successfully!";
  //       this.fileUploadStatus = true;
  //       this.responseError = null;
  //       this.statusCode = null;
  //       console.log('File is completely uploaded!');
  //      }
       
  //     //  if(event.ok == false)
  //     //  {
  //     //   this.responseError = "Upload Failed!";
  //     //   this.fileUploadStatus = false;
  //     //  this.responseMsg = null;
  //     //  }
  //     }
  //     if(event instanceof HttpHeaderResponse ||event instanceof HttpErrorResponse) 
  //      {
  //        console.log(event);
  //        this.responseError = "Upload Failed Invalid File Format or Data!";
  //        this.responseMsg = null;
  //        if(event.status == 0)
  //        {
  //          this.statusCode = event.status;
  //         this.responseError = "Upload Failed No Response!";
  //        }
  //      }
  //     }
  //   },error=>{
  //     if(HttpErrorResponse)
  //     {
  //       this.responseError = "Upload Failed Invalid File Format or Data!";
  //       this.responseMsg = null;
  //       if(this.statusCode == 0)
  //        {
  //         this.responseError = "Upload Failed No Response!";
  //        }

  //     }
  //   });
  //   this.selectedFiles = undefined;
  
  // }

  reset() {
    this.perc = null;
    this.responseMsg = null;
    this.responseError = null;
    this.statusCode = null;
   
  }

  enableProcess(misDate)
  {
    console.log(misDate);
    if(misDate)
    {
      console.log("1");
      this.dateValidate = true;
    }
    else
    {
      console.log("2");
      this.dateValidate = false;
    }
  }

}
