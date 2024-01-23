import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { reports } from './reports';
import { APIService } from './api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reporting-maintenance',
  templateUrl: './reporting-maintenance.component.html',
  styleUrls: ['./reporting-maintenance.component.css']
})
export class ReportingMaintenanceComponent implements OnInit {
  myForm: NgForm;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  @ViewChild('myform') myCForm;
  @ViewChild('resetSubmitbtn') resetSubmitbtn: ElementRef<HTMLElement>;
  loggedInUser: string;
  button3: boolean;
  enablesummarybutton:boolean;
  report = new reports();
  resp: any;
  formresponse:any={'creatorId':null};
  reportdata:reports;
  responsesucess: any;
  responserror: any;
  emailresponse: any;
  emailerror: any;
  emailstatus: boolean = false;
  saveStatus: boolean = true;
  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  is_edit: boolean=true;
  editFunction2: boolean;

  constructor(private service: APIService, private router: Router,
    private route: ActivatedRoute,) {
    
  this.route.queryParams.subscribe(params => {
    this.report.userNo = params.userNo;
    if(params.userNo)
    {
       this.enablesummarybutton = true;
    }
    else
    {
      this.enablesummarybutton = false;
    }
    this.report.address = params.address;
    this.report.birthDate = params.birthDate;
    this.report.city = params.city;
    this.report.communicationType = params.communicationType;
    this.report.contactType = params.contactType;
    this.report.countryCode = params.countryCode;
    this.report.countryprefix = params.countryprefix;
    this.report.occupation = params.occupation;
    this.report.email = params.email;
    this.report.firstName = params.firstName;
    this.report.lastName = params.lastName;
    this.report.middlename = params.middlename;
    this.report.gender = params.gender;
    this.report.idNumber =  params.idNumber;
    this.report.nationality = params.nationality;
    this.report.passport  = params.passport;
    this.report.passportCountry = params.passportCountry;
    this.report.phoneNumber = params.phoneNumber;
    this.report.creatorId = params.creatorId;
    this.report.creatorDtStamp = params.creatorDtStamp;
    this.report.verifierId = params.verifierId;
    this.report.verifierDtStamp = params.verifierDtStamp;
    this.report.version = params.version;
    this.report.ssn = params.ssn;
    this.report.town = params.town;
    this.report.communicationType = params.communiactionType;
    this.report.addressType= params.addressType;
    this.button3 = this.report.buttonupdate = params.buttonupdate;
    console.log('^^^^^^^^^^^^^^^^^^^^^ ' + this.report.userNo + this.button3);
    console.log("params----",params);
    console.log("communication type:",params.communiactionType)
    console.log("address type::",params.address)
    this.formresponse.creatorId = params.creatorId;
    this.formresponse.creatorDtStamp = params.creatorDtStamp;
    this.formresponse.verifierId = params.verifierId;
    this.formresponse.verifierDtStamp = params.verifierDtStamp;
    if(this.enablesummarybutton){
      this.is_edit=true;
    }else{
      this.is_edit=false;
    }
  });
   }
  

  ngOnInit() {
    console.log(this.myCForm);
    this.loggedInUser = localStorage.getItem('userFromLogin');
  }
  saveDataOfReports() {
    console.log(this.report);
    console.log("data is saving");
    if(!this.report.userNo || !this.report.firstName || !this.report.lastName ||
      !this.report.gender || !this.report.birthDate || !this.report.ssn || !this.report.idNumber ||
      !this.report.nationality || !this.report.passport || !this.report.email || !this.report.passportCountry ||
      !this.report.occupation || !this.report.contactType || !this.report.countryprefix ||
      !this.report.phoneNumber || !this.report.address || !this.report.city || !this.report.town || !this.report.countryCode)
    {
      Swal.fire('Please Fill all the required Fields');
      return false;
    }
    if(this.report.contactType.length > 4)
    {
      Swal.fire('Maximum 4 characters are allowed for Contact Type');
      return false;
    }
    if(this.report.countryCode.length > 2)
    {
      Swal.fire('Maximum 2 digits are allowed for Country Code');
      return false;
    }
    if(this.mailformat.test(this.report.email) == false){
      Swal.fire('You have entered an invalid email address!');
     return false;
   } 
   this.report.userNo = this.report.userNo.trim();
   this.report.firstName = this.report.firstName.trim();
   this.report.lastName = this.report.lastName.trim();
   this.report.nationality = this.report.nationality.trim();
   this.report.gender=this.report.gender.trim();
   this.report.ssn=this.report.ssn.trim();
   this.report.passport = this.report.passport.trim();
   this.report.email=this.report.email.trim();
   this.report.passportCountry = this.report.passportCountry.trim();
   this.report.occupation = this.report.occupation.trim();
   this.report.contactType = this.report.contactType.trim();
   this.report.address = this.report.address.trim();
   this.report.town= this.report.town.trim();
   this.report.city=this.report.city.trim();
   console.log("useno",this.report.userNo,this.report.userNo.length)
    this.service.savetoDbOfReportMaintance(this.report, this.loggedInUser).subscribe(resp => {
      this.resp = resp;
      this.formresponse=resp
      console.log('form', this.formresponse);
      //this.reportdata=resp;
      let element:HTMLElement = this.resetSubmitbtn.nativeElement;
      if (this.resp !== null) {
        element.click();
        Swal.fire(
          'Record is Created !'
        )
      } else {
        Swal.fire(
          'Failed ! Please give correct details',
        )
      }
    })

    //   if(this.resp=this.report)
    // {
    //   this.responsesucess="Data Sucessfully saved";
    //   this.emailresponse = null;
    // }
    // else{
    //   this.responsesucess="Data Not saved";
    //   this.emailresponse = null;
    // }
  }
  cancelDataOfReports() {
    this.report = new reports();
    console.log(this.report);
  }
  Checking() {
    console.log(this.report, this.saveStatus);
    if (!this.report.userNo
      && !this.report.firstName

      && !this.report.lastName
      && !this.report.gender
      && !this.report.birthDate
      && !this.report.ssn
      && !this.report.idNumber
      && !this.report.nationality
      && !this.report.passport
      && !this.report.email
      && !this.report.passportCountry
      && !this.report.occupation
      && !this.report.contactType
      && !this.report.countryprefix
      && !this.report.phoneNumber
      && !this.report.address
      && !this.report.town
      && !this.report.city
      && !this.report.countryCode

    ) {
      alert("Please Provide all the details before submiting!");
    }
    else {
      //if(this.emailstatus==false)
       console.log('else');

      if (this.saveStatus == false) {
        this.saveDataOfReports();
      }

      // this.checkUser(this.report.userNo);
    }
  }

  checkphoneNo() {
    console.log("on change");
    console.log(this.report.phoneNumber);
  }
  // toselectReportType()
  // {
  //  console.log("invoking the dropdonw in component")
  //  this.service.toselectReportType().subscribe(resp=>{console.log(resp)})
  // }
  checkUserNo() {
    console.log("on change userno");
    console.log(this.report.userNo);
  }
  checkIdnumber() {
    console.log("on change idnumber");
    console.log(this.report.idNumber);
  }
  CheckComm() {
    console.log("on change ogf comm");
    console.log(this.report.communicationType);
  }
  checkcountrycode() {
    console.log("on change of countrycode");
    console.log(this.report.countryCode);
  }
  checkUser(userno) {
    console.log(userno);
    userno = this.report.userNo;
    this.emailresponse ='';
    this.service.checkUserNo(userno).subscribe(resp => {
      console.log(resp)

      if (resp == true) {
        console.log("IF BLOCK");
        this.emailresponse = "user Already  registerd!";
        this.emailstatus = true;
        this.responserror = null;
        this.saveStatus = true;
      }
      else {
        // this.emailresponse="USer Not registred";
        console.log("ELSE BLOCK");
        this.emailstatus = false;
        this.responserror = null;
        this.saveStatus = false;
        //this.saveDataOfReports();
      }


    })
    console.log(this.report.userNo)


  }
  // onCLickOfSummary() {
  //   // mode: 'create'
  //    this.router.navigate(['/ReportmainteinanceSummary']);
  //  }
   onClickOfUpdate(){
    if(!this.report.userNo || !this.report.firstName || !this.report.lastName ||
      !this.report.gender || !this.report.birthDate || !this.report.ssn || !this.report.idNumber ||
      !this.report.nationality || !this.report.passport || !this.report.email || !this.report.passportCountry ||
      !this.report.occupation || !this.report.contactType || !this.report.countryprefix ||
      !this.report.phoneNumber || !this.report.address || !this.report.city || !this.report.town || !this.report.countryCode)
    {
      Swal.fire('Please Fill all the required Fields');
      return false;
    }
    if(this.report.contactType.length > 4)
    {
      Swal.fire('Maximum 4 characters are allowed for Contact Type');
      return false;
    }
    if(this.report.countryCode.length > 2)
    {
      Swal.fire('Maximum 2 digits are allowed for Country Code');
      return false;
    }
     this.service.updateReportMaintanance(this.report,this.loggedInUser,).subscribe(res=>{
       console.log("res::",res)
      //  this.button3=true;
       let element:HTMLElement = this.resetSubmitbtn.nativeElement;
       this.formresponse=res;
      if (this.resp !== null) {
        element.click();
        Swal.fire(
          'Record is Modified !'
        )
      } else {
        Swal.fire(
          'Failed ! Please give correct details',
        )
      }

     });
   }
   keyPress(event: any) {
    const pattern = /[0-9]/;
    //or  const pattern = /[0-9]/;
    console.log("event",event)
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
  
      event.preventDefault();
      
    }
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

