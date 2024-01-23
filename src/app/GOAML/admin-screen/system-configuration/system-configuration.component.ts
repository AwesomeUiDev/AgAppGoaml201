import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Configuration } from './Configuration';
import { APIService } from './api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-system-configuration',
  templateUrl: './system-configuration.component.html',
  styleUrls: ['./system-configuration.component.css']
})
export class SystemConfigurationComponent implements OnInit {
  @ViewChild('resetSubmitbtn') resetSubmitbtn: ElementRef<HTMLElement>;
  myForm: NgForm;
  button3:boolean = false;
  auditlognewuser:boolean=false;
  loggedInUser: string;
  buttonEnable:boolean = false;
  enablesummarybutton: boolean;
  formresponse:any={'creatorId':null};
  is_edit: boolean=true;
  editFunction2: boolean;
  // @ViewChild('myform') myCForm;
  constructor(private ref: APIService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
     
      this.configuration.rentityId = params.rentityId;
      if(params.rentityId)
      {
         this.enablesummarybutton = true;
      }
      else
      {
        this.enablesummarybutton = false;
      }
      this.configuration.creatorDtStamp = params.creatorDtStamp;
      this.configuration.creatorId = params.creatorId;
      this.configuration.fileLocation = params.fileLocation;
      this.configuration.maximumTransaction = params.maximumTransaction;
      this.configuration.reason = params.reason;
      this.configuration.rentityBranch  = params.rentityBranch;
      this.configuration.action = params.action;
      this.configuration.reportType = params.reportType;
      this.configuration.reportingCurrrency  = params.reportingCurrrency;
      this.configuration.reportingFrequency = params.reportingFrequency;
      this.configuration.submissionCode = params.submissionCode;
      this.configuration.threshouldAmount  = params.threshouldAmount;
      this.configuration.verifierId = params.verifierId;
      this.configuration.verifierDtStamp = params.verifierDtStamp;
      this.configuration.version = params.version;
      this.configuration.buttonupdate = params.buttonupdate;
      this.buttonEnable=true;
      this.button3 =this.configuration.buttonupdate = params.buttonupdate;
  
      if(this.enablesummarybutton){
        this.is_edit=true;
      }else{
        this.is_edit=false;
      }
      console.log('^^^^^^^^^^^^^^^^^^^^^ ' + this.configuration.rentityId + this.button3);
      this.formresponse.creatorId = params.creatorId;
    this.formresponse.creatorDtStamp = params.creatorDtStamp;
    this.formresponse.verifierId = params.verifierId;
    this.formresponse.verifierDtStamp = params.verifierDtStamp;
    });
    
   }
  configuration = new Configuration();
  resp: any;
  data:any;
  responsesucess: any;
  responserror: any;
  list = new Array<string>();
  reportType: string = this.configuration.reportType;
  ngOnInit() {
    // console.log(this.myCForm);ng
    // if(this.configuration=new Configuration)
    // {
    //   this.saveEnable=true;
    // }
    // else{
    //   this.saveEnable=false
    // }
    this.loggedInUser = localStorage.getItem('userFromLogin');
    this.tocheckTheDropdown();
    if (this.button3) {
      this.button3 = true;
      console.log('Value from summary screen' + this.button3);
    } else {
      this.button3 = false;
    }
   
  }
  saveDataOFSystemConfigToDb() {
    this.buttonEnable=true;
    console.log(this.configuration)
    if(this.configuration.submissionCode && this.configuration.submissionCode.length > 1)
    {
      Swal.fire('Submission Code should contain only one character !');
      return false;
    }
    if(this.configuration.rentityId && this.configuration.rentityId.length > 2)
    {
      Swal.fire('RentityId should contain two character !');
      return false;
    }
    if(this.configuration.rentityBranch && this.configuration.rentityBranch.length > 3)
    {
      Swal.fire('RentityBranch should contain Three character !');
      return false;
    }
    
    if(!this.configuration.fileLocation || !this.configuration.maximumTransaction || !this.configuration.reason || !this.configuration.rentityBranch 
      ||!this.configuration.reportType  ||!this.configuration.rentityId ||!this.configuration.reportingCurrrency || !this.configuration.action
      ||!this.configuration.reportingFrequency ||!this.configuration.submissionCode ||!this.configuration.threshouldAmount){
        Swal.fire('Please Fill all the required Fields');
        return false;
      }
      this.buttonEnable=true;
      this.configuration.reportType=this.configuration.reportType.trim();
      this.configuration.reportingCurrrency=this.configuration.reportingCurrrency.trim();
      this.configuration.reason=this.configuration.reason.trim();
      this.configuration.action=this.configuration.action.trim();
      console.log("reportType",this.configuration.reportType.length)
    this.ref.saveDataOfSystemConfigToDb(this.configuration, this.loggedInUser).subscribe(resp => {
      this.resp = resp;
      this.formresponse=resp;
      console.log(resp)
      let element:HTMLElement = this.resetSubmitbtn.nativeElement;
      element.click();
      if (this.resp.responeMsg =="Success") {
        Swal.fire(
          'Record is Created !'
        )
      } else {
        Swal.fire(
          'Failed ! Report Type Already Taken',
        )
      }

    }
    ,error=>{
      if(HttpErrorResponse)
      {
        Swal.fire(
          'Failed ! Server Error',
        )
      }
    });

    // console.log("this is saving data to db")
    // if (this.res = this.configuration) {
    //   this.responsesucess = "Data Sucessfully saved";
    // }
    // else {
    //   this.responserror = "Data Not saved";
    // }
  }
  cancelDataOFSystemConfigToDb() {
    this.configuration = new Configuration();
    console.log(this.configuration)
    console.log("cancelling data to db")
  }
  tocheckTheDropdown() {
    this.ref.theDropDown().subscribe(resp => {
      console.log(resp)
      this.list = resp;
      console.log("this is list!");
      console.log(this.list);
    });
  }
  checkingAlltheFields() {
    if (!this.configuration.submissionCode
      && !this.configuration.rentityId
      && !this.configuration.reportType
      && !this.configuration.fileLocation
      && !this.configuration.maximumTransaction
      && !this.configuration.reportingFrequency
      && !this.configuration.reportingCurrrency
      && !this.configuration.rentityBranch
      && !this.configuration.reason
      && !this.configuration.action
      && !this.configuration.threshouldAmount
    ) {
      alert("Please Provide all the details before submiting!");
    }
    else {
      this.saveDataOFSystemConfigToDb();
    }
  }
  // toselectReportType()
  // {
  //  console.log("invoking the dropdonw in component")
  //  this.service.toselectReportType().subscribe(resp=>{console.log(resp)})
  // }

  public createUser(newUser: Configuration) {
    if (!newUser.submissionCode) {
      this.responsesucess = "Enter User Submissioncode!";
      this.responserror = null;
    }
    else if (!newUser.rentityId) {
      this.responsesucess = "Enter RentityId!";
      this.responserror = null;
    }
    else if (!newUser.reportType) {
      this.responsesucess = "Enter ReportType!";
      this.responserror = null;
    }
    else if (!newUser.fileLocation) {
      this.responsesucess = "Enter FileLocation!";
      this.responserror = null;
    }
    else if (!newUser.maximumTransaction) {
      this.responsesucess = "Enter MaximumTransaction!";
      this.responserror = null;
    }
    else if (!newUser.reportingFrequency) {
      this.responsesucess = "Enter ReportingFrequency!";
      this.responserror = null;
    }
    else if (!newUser.reportingCurrrency) {
      this.responsesucess = "Enter ReportingCurrrency!";
      this.responserror = null;
    }
    else if (!newUser.rentityBranch) {
      this.responsesucess = "Enter RentityBranch!";
      this.responserror = null;
    }
    else if (!newUser.reason) {
      this.responsesucess = "Enter Reason!";
      this.responserror = null;
    }
    else if (!newUser.action) {
      this.responsesucess = "Enter Action!";
      this.responserror = null;
    }
    else if (!newUser.threshouldAmount) {
      this.responsesucess = "Enter ThreshouldAmount!";
      this.responserror = null;
    }
  }

  onUpdate(){
    // this.buttonEnable=true;
    // this.button3 = true;
    if(this.configuration.submissionCode && this.configuration.submissionCode.length > 1)
    {
      Swal.fire('Submission Code should contain only one character !');
      return false;
    }
    if(this.configuration.rentityId && this.configuration.rentityId.length > 2)
    {
      Swal.fire('RentityId should contain two character !');
      return false;
    }
    if(this.configuration.rentityBranch && this.configuration.rentityBranch.length > 3)
    {
      Swal.fire('RentityBranch should contain Three character !');
      return false;
    }
    if(this.configuration.reportingCurrrency && this.configuration.reportingCurrrency.length > 3)
    {
      Swal.fire('ReportingCurrrency should contain Three character !');
      return false;
    }
    if(!this.configuration.fileLocation || !this.configuration.maximumTransaction || !this.configuration.reason || !this.configuration.rentityBranch 
      ||!this.configuration.reportType  ||!this.configuration.rentityId ||!this.configuration.reportingCurrrency || !this.configuration.action
      ||!this.configuration.reportingFrequency ||!this.configuration.submissionCode ||!this.configuration.threshouldAmount){
        Swal.fire('Please Fill all the required Fields');
        return false;
      }
    this.ref.updateRecords(this.configuration,this.loggedInUser).subscribe(data=>{
      console.log("data::",data);
      this.data = data;
      // this.resp=data;
      this.formresponse=data;
      console.log("formresponse::",this.formresponse)
      this.button3 = true;
      let element:HTMLElement = this.resetSubmitbtn.nativeElement;
      element.click();
      if (this.data.responeMsg =="Success") {
        this.resp = this.data;
        this.auditlognewuser = true;
        Swal.fire(
          'Record is Modified !'
        )
      } else {
        Swal.fire(
          'Failed',
        )
      }
    });
  }
  onClickOfSummary(){
    this.router.navigate(['/SystemconfigurationSummary']);
  }
  reset(){
    this.is_edit=false;
  }
  changeStatus() {
    console.log('change status call');
    this.is_edit = false;
    this.editFunction2 = false; 
  }
}