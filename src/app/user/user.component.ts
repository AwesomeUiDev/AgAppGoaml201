import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './user';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { SecurityDto } from '../security-dto';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { APIService } from '../api.service';
declare let ClientIP: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('resetSubmitbtn') resetSubmitbtn: ElementRef<HTMLElement>;
  @ViewChild('passwordmat') pass: ElementRef<HTMLElement>;
  users: User;
  user = new User;
  responseSuccess: any;
  responseError: any;
  res: any;
  button1: boolean;
  create: any;
  update: any;
  button3: boolean;
  checked: boolean;
  checked1: boolean;
  rolesList:any=[];
  loggedInUser: string;

  reactiveForm: FormGroup;
  passwordRegex: any;
  errorMsg:any = "";
  lowerCase: string;
  security: SecurityDto;
  security1: SecurityDto;
  userProfileForm: FormGroup;
  minPass: any;
  maxPass: any;
  ucase: any;
  lcase: any;
  num: any;
  splc: any;
  emailerror:boolean=false;
  ipAddress:string;
  privateIP ;
    publicIP; 
  auditlognewuser:boolean=false;
  userId: any;
  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  hide: boolean = true;
  is_edit = true;
  editFunction2: boolean;
  // {id:'U', name:'User'},{id:'V', name:'Authorizer'},{id:'I', name:'ICT'}];
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient, private fb: FormBuilder,
              private apiService: APIService,) {
                

                

            //  this.http.get("https://api.ipify.org/?format=json")
            //  .subscribe((ipv4) => {
            //   console.log("ipv4 only",ipv4);
            //  });
                // this.privateIP = ClientIP;
                // this.http.get('https://api.ipify.org?format=json').subscribe(data => {
                //       this.publicIP=data['ip'];
                //     });
                
    this.route.queryParams.subscribe(params => {
      // this.modifyUserObject.id = params['id'];
      this.user.userRef = params.userRef;
      this.user.userId = params.userId;
      this.user.userName = params.userName;
      this.user.emailId = params.emailId;
      this.user.phoneNumber = params.phoneNumber;
      this.user.password = params.password;
      this.user.roleId = params.roleId;
      this.user.logoutTime = params.logoutTime;
      this.user.sendNotification = params.sendNotification;
      // this.user.status = params['status'];
      this.user.status = params.status;
      this.user.creatorId = params.creatorId,
      this.user.creatorDtStamp = params.creatorDtStamp,
      this.user.versionNo = params.versionNo,
      this.user.verifierId = params.verifierId,
      this.user.authStatus = params.authStatus,
      this.user.verifierDtStamp=params.verifierDtStamp,
      this.user.activeStatus=params.activeStatus;
     // this.button1 = false;
      this.user.buttonupdate = params.buttonupdate;
      this.button3 = this.user.buttonupdate = params.buttonupdate;
      if(this.button3){
        this.is_edit=true;
      }else{
        this.is_edit=false;
      }
      console.log('^^^^^^^^^^^^^^^^^^^^^ ' + this.user.userId + this.button3);
      console.log(params);
      console.log(this.user);
    }); 
//     if(this.user.sendNotification==!1){
// this.checked1=true;
//     }else{
//       this.checked=true;
    // }
    // if(this.user.emailId.length>0){
    //   this.button3=false;
    // }
  }
  ngOnInit() {
    this.onCLickOfSummary();
    this.loggedInUser = localStorage.getItem('userFromLogin');
    this.fetchRole();
    console.log("logged",this.loggedInUser)
    console.log("userName",this.user.creatorId)
    this.user.userName = null;
    this.user.password = null;
    
    if (this.button3) {
      this.button3 = true;
      console.log('Value from summary screen' + this.button3);
    } else {
      this.button3 = false;
    }

    const mode = this.route.snapshot.paramMap.get('mode');
    mode === 'create' ? this.create = true : this.update = true;
    this.reactiveForm = this.fb.group({
      pass: new FormControl('', [Validators.required, 
        Validators.compose([Validators.pattern(this.passwordRegex), 
          Validators.maxLength(this.maxPass), 
          Validators.minLength(this.minPass)])]),
    });

    let a,b;
    this.apiService.fetchSecurityPolicyService().subscribe(resp => {
      this.security = resp;
      this.minPass = this.security.min_pswd_length;
      this.maxPass = this.security.max_pswd_length;
      console.log("minPass",this.minPass);
       
      this.buildForm(this.minPass, this.maxPass);
      console.log(this.minPass, this.maxPass);
      console.log(this.security);
    });
    
    this.buildForm(this.minPass ? this.minPass : a, this.maxPass ? this.maxPass :b);
    // $(".toggle-password").click(function() {

    //   $(this).toggleClass("fa-eye fa-eye-slash");
    //   var input = $($(this).attr("toggle"));
    //   if (input.attr("type") == "password") {
    //     input.attr("type", "text");
    //   } else {
    //     input.attr("type", "password");
    //   }
    // });
  }

  // security policy validation
  buildForm(a,b) {
    //---------- Password Policy Implementation (BEGIN) ----------
    this.apiService.fetchSecurityPolicyService().subscribe(resp => {
      this.security1 = resp;
      console.log("this is security resp======",this.security1)
      this.ucase = this.security1.pswd_complex_ucase;
      this.lcase = this.security1.pswd_complex_lcase;
      this.num = this.security1.pswd_complex_num;
      this.splc = this.security1.pswd_complex_splc;
      this.errorMsg = '';
      this.passwordRegex='';
      if(!this.ucase && !this.lcase && !this.num && !this.splc) {
        this.errorMsg = "Password ";
        this.passwordRegex=".{"+ this.minPass + "," + this.maxPass + "}";
      }
      else {
        if(this.security1.pswd_complex_ucase) {
          this.passwordRegex = "(?=[^A-Z]*[A-Z])";
          this.errorMsg = " UpperCase";
        }
        if (this.security1.pswd_complex_lcase) {
          this.passwordRegex = this.passwordRegex  + "(?=[^a-z]*[a-z])";
          if(this.errorMsg != '') 
            this.errorMsg = this.errorMsg + ", LowerCase";  
          else
            this.errorMsg = this.errorMsg + " LowerCase";
        }
        if(this.security1.pswd_complex_num) {
          this.passwordRegex = this.passwordRegex  + "(?=[^0-9]*[0-9])";
          if(this.errorMsg != '') 
            this.errorMsg = this.errorMsg + ", Number";  
          else
            this.errorMsg = this.errorMsg + " Number";
        }
        if(this.security1.pswd_complex_splc) {
          this.passwordRegex = this.passwordRegex  + "(?=[^!-@]*[!-@])";
          if(this.errorMsg != '') 
            this.errorMsg = this.errorMsg + ", Special Character";  
          else
            this.errorMsg = this.errorMsg + " Special Character";
        }
        
        this.passwordRegex = this.passwordRegex + ".{"+ this.minPass + "," + this.maxPass + "}";
        // this.passwordRegex = "(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^!-@]*[!-@]).{10,15}";
        this.errorMsg = "Password must contain atleast one " + this.errorMsg + "."; 
      }
      console.log(this.passwordRegex);
      console.log(this.errorMsg);
      this.userProfileForm = this.fb.group({
        pass: new FormControl('', [Validators.required, 
          Validators.compose([Validators.pattern(this.passwordRegex), 
            Validators.maxLength(this.maxPass), 
            Validators.minLength(this.minPass)])]),
      });
    });
    console.log(this.minPass, this.maxPass);
    console.log('form', this.reactiveForm);
  }
  //---------- Password Policy Implementation (END) ----------


  updateRecord(): any {
    console.log(this.user);
   
    if(this.user.emailId == null || this.user.phoneNumber == null || this.user.roleId == null || this.user.status ==null || this.user.sendNotification == null){
      Swal.fire('Please Enter All The Fields !');
      return false;   
    }
    this.userService.updateRecord(this.user, this.loggedInUser)
    .subscribe((res) => {
      this.res = res;
      console.log(res);
      if (this.res.responeMsg == "Update Success") {
        Swal.fire('User is Modified');
      } else {
        Swal.fire('Failed !');
      }
      this.router.navigate(['/summary']);
    });  
  }

  fetchRole(){

    this.userService.fetchRoleService()
    .subscribe((res) => {
      this.rolesList= res;
      console.log("res",res);
      // if (this.res) {
      //   Swal.fire('Success !');
      // } else {
      //   Swal.fire('Failed !');
      // }
    });
  }

  validatemail()
{
  var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (!expr.test(this.user.emailId)) {
      this.emailerror = true;;
  }
  else
  {
      this.emailerror = false;
  }
}


  registerUser(): any{
    console.log(this.user);
    console.log(this.user.userId);
    
   
    console.log("pass",this.pass);

   // console.log(this.pass.errors);
    this.auditlognewuser = false;
    
    if(this.user.userId)
    {
      this.user.userId = this.user.userId.toUpperCase();
    }
    if(!this.user.userId)
    {
      Swal.fire(
        'Create new user, Please Fill the Fields',
      );
      return false;
    }
   
    if(this.mailformat.test(this.user.emailId) == false){
       Swal.fire('You have entered an invalid email address!');
      return false;
    } 
    if(this.pass)
    {
      Swal.fire('Please match the password with the requirement');
      return false;
    }
   this.user.userId=this.user.userId.trim();
   this.user.userName= this.user.userName.trim();
   this.user.emailId = this.user.emailId.trim();
   this.user.password = this.user.password.trim();
    console.log("user id------",this.user.userId,this.user.userId.length)
   // this.user.sendNotification;
    this.userService.registerUserService(this.user, this.loggedInUser)
      .subscribe((res) => {
        this.res = res;
        this.res.userId = null;
        let element:HTMLElement = this.resetSubmitbtn.nativeElement;
        element.click();
        console.log(res);
        if (this.res.responeMsg == "Data Exists") {
          Swal.fire(
            'User Id ,Already Exists !',
          );

        }
        
        else if(this.res.responeMsg == "Success")
        {
          this.user = this.res;
          this.auditlognewuser = true;
          Swal.fire(
            'User is Created!'
          );
        }
         else {
          this.user = this.res;
          this.auditlognewuser = true;
          Swal.fire(
            'Success !'
          );
        }
        this.user.userId = null;
        this.user.password = null;
        this.user.sendNotification = null;
      });
  }
  // userReset(){
  //   this.user=undefined;
  // }

  reset()
  {
    this.is_edit=false;
  }

  /* onCLickOfSummary() {
    this.router.navigate(['/summary']);
  } */

  onAuth(){
    if(this.user.authStatus ==='A'){
      console.log("auth",this.user.authStatus)
      Swal.fire(
            'Already Record Authorized'
          );
          return false;
    }
    if( this.loggedInUser == this.user.creatorId){
      Swal.fire(
        'Maker Cannot Authorize !'
      );
    }else{
    console.log("logged",this.loggedInUser)
    console.log("username",this.user)
    console.log("authstatus",this.user.authStatus)
    this.userService.authService(this.user, this.loggedInUser)
      .subscribe((response) => {
        this.res = response;
        console.log("authstatus1",this.user.authStatus)
        console.log("authstatus2",this.res.authStatus)
        console.log("res::",this.res)
        console.log("params---"+this.route.params)
        this.user.creatorId=this.res.creatorId;
        this.user.creatorDtStamp=this.res.creatorDtStamp;
        this.user.authStatus=this.res.authStatus;
        this.user.verifierId=this.res.verifierId;
        this.user.verifierDtStamp=this.res.verifierDtStamp;
        this.user.versionNo=this.res.versionNo;
        this.onCLickOfSummary();
        Swal.fire(
          'User is Authorized'
        );
    });
    
  }
}
keyPress(event: any) {
    // const pattern = /[0-9]/;
    // const pattern =/[A-Za-z0-9]/;
    //or  const pattern = /[0-9]/; // only for numbers
    var regexp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    console.log("event",event)
    this.userId = event.target.value.length;
    var letterNumber = /^[0-9a-zA-Z]+$/; 
   
    // let inputChar = String.fromCharCode(event.Character);
   /* if (&& event.keyCode ==32 || event.keyCode ==64 ||event.keyCode == 46 || event.keyCode == 44 || event.keyCode == 35 || 
      event.keyCode == 36 || event.keyCode == 37 || event.keyCode ==38 || event.keyCode ==33 || event.keyCode == 94||
      event.keyCode == 45 || event.keyCode == 47 || event.keyCode == 42 || event.keyCode == 58 ||event.keyCode == 59)  */
      // if(!this.userId.match(pattern)) 
    /*  if(regexp.test(this.userId))
      {
          console.log('if');
      }
      else
      {
        console.log('if else');
        event.preventDefault();
      }    */
      var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (regexp.test(str)) {
          return true;
      }
  
      event.preventDefault();
      return false;
    }
  
 /* keyUp(event: any){
    this.userId = event.target.value.length;
  } */
  keyPress1(event: any) {
    const pattern = /[0-9]/;
    //or  const pattern = /[0-9]/;
    console.log("event",event)

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
  
      event.preventDefault();
      
    }
  }
  
  myFunction() {
    this.hide = !this.hide;
  }
  changeStatus() {
    console.log('change status call');
    this.is_edit = false;
    this.editFunction2 = false; 
  }
  onCLickOfSummary() {
    console.log("on click of summary");
    this.userService.onClickOfSummary().subscribe(resp1 => {
      console.log(resp1);
     
    });
  }


}



