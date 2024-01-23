import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { ExcelProcessingService } from 'src/app/GOAML/service/xmlservice.service';
import { ExternalSystem } from '../excel-mapping/externalSystem';
// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
//dummy url for file
const URL = 'http://localhost:3000/api/upload';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { APIService } from 'src/app/api.service';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css']
})
export class ExcelUploadComponent implements OnInit {

  @ViewChild('excelUpload') excelUploadForm:NgForm;
  selectExt:any;
  fileData:any;
  pCode:any;
  
  extSysData: ExternalSystem[];
  extSysData1: string[];
  processData: ExternalSystem[];
  extSystem: any;
  message1: any;
  perc: any;
  res2: any;
  pooja: any;
  fileUpload: File = null;
  fileUploadStatus = false;
  response: any;
  responseMsg: any;
  responseError: any;
  selectedFiles: FileList;
  currentFileUpload: File;
  statusCode: any;
  processdata1: any;
  processName: any = [];
  poojaprocessdata: any[];
  poojaext2: any;
  poojaprocess2: any;
  extSystem2: any;
  processName2: any;
  userId: any;
  responseMsgUpload: string;
  // dataforupload: ExtData=new ExtData();
  constructor(private excelUpload: ExcelProcessingService, private api: APIService) { }
  // public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  ngOnInit() {
    this.userId =  localStorage.getItem('userFromLogin');
    
    // this.getAllExternalSystem();
    this.getAllExternalSystem();
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   console.log('ImageUpload:uploaded:', item, status, response);
    //   alert('File uploaded successfully');
    // };
   }
  getAllExternalSystem() {
    console.log('mathos call');
    this.api.getAllExtSysName().subscribe(response => {
      this.extSysData1 = response;
      console.log(this.extSysData1); //ext names 
      //   this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
    // console.log( this.extSysData);
  }

  getExternalSystem(ext) {
    console.log(ext.extSys);
    this.excelUpload.getProcessNameWithExtSys(ext.extSys).subscribe(response => {
      this.processData = response;
      console.log(this.processData);
      console.log('process method end');
    });
  }

  getProcess(event) {
    let extSysName = event.target.value;
    this.poojaext2 =extSysName;
    console.log("ext name: ",extSysName);

    this.api.getProcessNameWithExtSys(extSysName).subscribe(response => {
      this.pooja = response;

      this.processName = this.pooja;
      console.log("usha ",this.processName);
      // // console.log(this.poojaprocessdata);
      // console.log('process method end');
    });
  }
  //used in upload
  getProcessName1(event) {
    let  processCode = event.target.value;
    // console.log(processCode);
    // console.log(extSysName);
    // this.poojaext2 = extSysName;
    this.poojaprocess2 = processCode;
    console.log("process code",processCode)

  }
  // getProcessName(extSys1){
  //   console.log(extSys1);

  //   this.excelUpload.getProcessNameWithExtSys(extSys1).subscribe(response=>{
  //   this.processData=response;
  //   console.log(this.processData);
  //   console.log('process method end');
  //   });
  //     }
  finalSubmit(process, fieldArray, isChecked) {


  }
  handleFileInput(file: FileList) {
    this.fileUpload = file.item(0);
    var reader = new FileReader();
  }



  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    console.log(this.poojaext2);
    console.log(this.poojaprocess2);
    this.extSystem2 = this.poojaext2;
    this.processName2 = this.poojaprocess2;
    console.log(this.extSystem2);
    console.log(this.processName2);
    this.responseMsgUpload = "Uploading Please wait...";
    console.log(this.responseMsgUpload)
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(this.currentFileUpload);
    console.log("console",this.extSystem2, this.processName2,this.userId, this.currentFileUpload)
    this.excelUpload.pushFileToStorage(this.extSystem2, this.processName2,this.userId, this.currentFileUpload).subscribe(event => {
      this.res2 = event;
      console.log(this.res2)





      if (event) {
        this.responseError = null;
        if (event instanceof HttpResponse) {
          console.log(event.status);
          console.log(event.body);


          if (event.status == 200) {
            if (event.body == "true") {
              this.responseMsg = "File uploaded Successfully!";
              this.fileUploadStatus = true;
              this.responseError = null;
              this.statusCode = null;
              this.responseMsgUpload = " ";
              console.log('File is completely uploaded!');
              Swal.fire('File Uploaded Successfully');
              this.reset();
            } else {
              this.responseMsgUpload = " ";
              Swal.fire('Upload Failed');
              this.reset();
            }

          }


        }
        // if (event instanceof HttpHeaderResponse || event instanceof HttpErrorResponse) {
        //   console.log(event);
        //   this.responseError = "Upload Failed Invalid File Format or Data!";
        //   this.responseMsg = null;
        //   if (event.status == 0) {
        //     this.statusCode = event.status;
        //     this.responseError = "Upload Failed No Response!";
        //     this.message1="Failed !"
        //   }
        // }
      }
    }, error => {
      if (HttpErrorResponse) {
        this.responseError = "Upload Failed Invalid File Format or Data!";
        this.responseMsg = null;
        if (this.statusCode == 0) {
          this.message1 = "failed !"
          this.responseError = "Upload Failed No Response!";
        }

      }
    });
    // this.selectedFiles = undefined;

  }

  reset(){
    this.processName = [];
    this.excelUploadForm.reset();
  }
}
