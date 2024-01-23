import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { APIService } from '../api.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ChangePasswordDTO } from './ChangePassword';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SecurityDto } from 'src/app/security-dto';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Login } from '../login/login';
import { take } from 'rxjs/operators';
declare const $;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('navBarFont') navBarFont: ElementRef<HTMLElement>;
  security: SecurityDto;
  security1: SecurityDto;
  responseMsg: any;
  responseError: any;
  passwordDTO = new ChangePasswordDTO();
  passwordStatus: boolean;
  msg: any;
  userId: string;
  lowerCase: string;
  minPass: number;
  maxPass: number;
  errorMsg: any = "";
  password: any;
  passwordenable: boolean;
  newPassword: any;
  passwordRegex: string;
  reactiveForm: FormGroup;
  disablegenerateotp: boolean = false;
  userProfileForm: FormGroup;
  ucase: any;
  lcase: any;
  num: any;
  splc: any;
  var: any;
  var1: any;
  ipData: any;

  login1 = new ChangePasswordDTO();
  hide: boolean;
  hide2: boolean;

  constructor(private apiService: APIService, private router: Router, private http: HttpClient,
    private toastr: ToastrService, private fb: FormBuilder,) { }

  ngOnInit() {
    // this.msg = localStorage.getItem("passwordAlert");
    this.http.get<{ ip: string }>('https://jsonip.com').subscribe((data) => {
      // console.log('data', data);
      this.ipData = data;
      // console.log("ipData",this.ipData)
      // return this.ipData;
    });
    this.passwordenable = true;
    this.userId = localStorage.getItem("userFromLogin");
    this.newPassword = '';
    // var pass = localStorage.getItem("pass");
    // if(this.userId == pass)
    // {
    //   this.responseError = this.msg;
    //   console.log(this.responseError);
    // }

    let a, b;
    this.apiService.fetchSecurityPolicyService().subscribe(resp => {
      this.security = resp;
      this.minPass = this.security.min_pswd_length;
      this.maxPass = this.security.max_pswd_length;
      console.log("minPass", this.minPass);

      this.buildForm(this.minPass, this.maxPass);
      console.log(this.minPass, this.maxPass);
      console.log(this.security);
    });

    this.buildForm(this.minPass ? this.minPass : a, this.maxPass ? this.maxPass : b);


    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });

    //   $(function(){
    //     $(".showpassword").each(function(index,input) {
    //         var $input = $(input);
    //         $('<label class="showpasswordlabel"/>').append(
    //             $("<input type='checkbox' class='showpasswordcheckbox' />").click(function() {
    //                 var change = $(this).is(":checked") ? "text" : "password";
    //                 var rep = $("<input type='" + change + "' />")
    //                     .attr("id", $input.attr("id"))
    //                     .attr("name", $input.attr("name"))
    //                     .attr('class', $input.attr('class'))
    //                     .val($input.val())
    //                     .insertBefore($input);
    //                 $input.remove();
    //                 $input = rep;
    //              })
    //         ).append($("<span/>").text("Show password")).insertAfter($input);
    //     });
    // });


    // jQuery(document).ready(function($) {

    //   jQuery('#password').keyup(function(){
    //     jQuery('#result').html(checkStrength($('#password').val()))
    //   })    

    //   function checkStrength(password){

    //   var strength = 0

    //   if (password.length < this.maxPass) { 
    //     $('#result').removeClass()
    //     $('#result').addClass('short green')
    //     return 'Too short' 
    //    }

    //   if (password.length > this.minpass) strength += 1

    //   if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1

    //   if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1 

    //   if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1

    //   if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1


    // if (strength < 2 ) {
    //     $('#result').removeClass()
    //     $('#result').addClass('weak');
    //     $('#result').addClass('red');
    //     return 'Weak'           
    // } else if (strength == 2 ) {
    //     $('#result').removeClass('green');
    //     $('#result').addClass('orange');
    //     return 'Good'       
    // } else {
    //     $('#result').removeClass('red')
    //     $('#result').removeClass('orange')
    //     $('#result').addClass('strong')
    //      $('#result').addClass('green')
    //     return 'Strong'
    // }

    // }
    // });

  }

  // security policy validation
  buildForm(a, b) {
    //---------- Password Policy Implementation (BEGIN) ----------
    this.apiService.fetchSecurityPolicyService().subscribe(resp => {
      this.security1 = resp;
      console.log("this is security resp======", this.security1)
      this.ucase = this.security1.pswd_complex_ucase;
      this.lcase = this.security1.pswd_complex_lcase;
      this.num = this.security1.pswd_complex_num;
      this.splc = this.security1.pswd_complex_splc;
      this.errorMsg = '';
      this.passwordRegex = '';
      if (!this.ucase && !this.lcase && !this.num && !this.splc) {
        this.errorMsg = "Password ";
        this.passwordRegex = ".{" + this.minPass + "," + this.maxPass + "}";
      }
      else {
        if (this.security1.pswd_complex_ucase) {
          this.passwordRegex = "(?=[^A-Z]*[A-Z])";
          this.errorMsg = " UpperCase";
        }
        if (this.security1.pswd_complex_lcase) {
          this.passwordRegex = this.passwordRegex + "(?=[^a-z]*[a-z])";
          if (this.errorMsg != '')
            this.errorMsg = this.errorMsg + ", LowerCase";
          else
            this.errorMsg = this.errorMsg + " LowerCase";
        }
        if (this.security1.pswd_complex_num) {
          this.passwordRegex = this.passwordRegex + "(?=[^0-9]*[0-9])";
          if (this.errorMsg != '')
            this.errorMsg = this.errorMsg + ", Number";
          else
            this.errorMsg = this.errorMsg + " Number";
        }
        if (this.security1.pswd_complex_splc) {
          this.passwordRegex = this.passwordRegex + "(?=[^!-@]*[!-@])";
          if (this.errorMsg != '')
            this.errorMsg = this.errorMsg + ", Special Character";
          else
            this.errorMsg = this.errorMsg + " Special Character";
        }

        this.passwordRegex = this.passwordRegex + ".{" + this.minPass + "," + this.maxPass + "}";
        // this.passwordRegex = "(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^!-@]*[!-@]).{10,15}";
        this.errorMsg = "Password must contain atleast one " + this.errorMsg + ".";
      }
      console.log(this.passwordRegex);
      console.log(this.errorMsg);
      this.userProfileForm = this.fb.group({
        password1: new FormControl('', [Validators.required,
        Validators.compose([Validators.pattern(this.passwordRegex),
        Validators.maxLength(this.maxPass),
        Validators.minLength(this.minPass)])])
      });
    });
    this.passwordenable = true;
    console.log(this.minPass, this.maxPass);
    console.log('form', this.reactiveForm);
  }
  //---------- Password Policy Implementation (END) ----------

  //toastr clicked
  toasterClickedHandler() {
    console.log('toastr');
  }

  enabletoaster() {
    this.disablegenerateotp = true;
    setTimeout(() => {
      this.disablegenerateotp = false;
      console.log('time');
    }, 180000);
  } //unable fnctn endng

  getOtp(Userid) {
    console.log("user id -- ", Userid)
    if (!Userid) {
      setTimeout(() => {
        this.toastr.error('', `Enter your User ID`, {
          timeOut: 6000,
          progressBar: true,
          tapToDismiss: true,
          closeButton: true,
          easeTime: 900,
          extendedTimeOut: 3000
        });
      });
      return;
    }
    this.disablegenerateotp = true;
    setTimeout(() => {
      this.toastr.info('', `Please Wait Your Request is Processing`, {
        timeOut: 400000,
        progressBar: true,
        tapToDismiss: true,
        closeButton: true,
        easeTime: 900,
        extendedTimeOut: 3000
      });
    });
    this.apiService.getOtpForReset(Userid).subscribe(res => {

      this.var = res;
      this.toastr.clear();
      console.log("res ", this.var);
      if (this.var) {
        this.passwordenable = true;
        setTimeout(() => {
          this.toastr.success('', `OTP has sent to your registered mail Id.`, {
            timeOut: 180000,
            progressBar: true,
            tapToDismiss: true,
            closeButton: true,

            // easeTime:900,
            //  extendedTimeOut:3000
          })
        });
        this.enabletoaster();
        /*  setTimeout(() => {
            this.toastr.success('',`OTP has sent to your registered mail Id.`,  {
              timeOut: 6000,
              progressBar:true,
              tapToDismiss:true,
              closeButton:true,
              easeTime:900,
              extendedTimeOut:3000
            }).onTap
            .pipe(take(1))
            .subscribe(() => this.toasterClickedHandler());
          }); */
      } else {
        this.disablegenerateotp = false;
        setTimeout(() => {
          this.toastr.error('Verify your User ID.', `Unable to find User Details.`, {
            timeOut: 6000,
            progressBar: true,
            tapToDismiss: true,
            closeButton: true,
            easeTime: 900,
            extendedTimeOut: 3000
          });
        });
      }
    }, error => {
      setTimeout(() => {
        this.toastr.error('', `Server Error','Unable to connect to Server.`, {
          timeOut: 6000,
          progressBar: true,
          tapToDismiss: true,
          closeButton: true,
          easeTime: 900,
          extendedTimeOut: 3000
        });
      });
    });
  }

  validatepassword($event) {
    console.log(this.newPassword);
    console.log(event);
    this.passwordenable = true;
    let pwdvalue = this.newPassword;

    this.errorMsg = "";
    this.apiService.fetchSecurityPolicyService().subscribe(resp => {
      this.security1 = resp;
      this.minPass = this.security.min_pswd_length;
      this.maxPass = this.security.max_pswd_length;
      if (this.security1.pswd_complex_ucase) {
        if (/(?=[^A-Z]*[A-Z])/.test(pwdvalue))
          this.errorMsg = "";

        else
          this.errorMsg = " UpperCase";
      }
      if (this.security1.pswd_complex_lcase) {
        this.passwordRegex = this.passwordRegex + "(?=[^a-z]*[a-z])";
        let lowercaseerror = false;
        if (/(?=[^a-z]*[a-z])/.test(pwdvalue))
          lowercaseerror = false;
        else
          lowercaseerror = true;
        if (lowercaseerror) {
          if (this.errorMsg != null)
            this.errorMsg = this.errorMsg + ", LowerCase";
          else
            this.errorMsg = this.errorMsg + " LowerCase";
        } //if
      }
      if (this.security1.pswd_complex_num) {
        this.passwordRegex = this.passwordRegex + "(?=[^0-9]*[0-9])";
        let digitserror = false;
        if (/(?=[^0-9]*[0-9])/.test(pwdvalue))
          digitserror = false;
        else
          digitserror = true;
        if (digitserror) {
          if (this.errorMsg != null)
            this.errorMsg = this.errorMsg + ", Number";
          else
            this.errorMsg = this.errorMsg + " Number";
        }
      }
      if (this.security1.pswd_complex_splc) {
        this.passwordRegex = this.passwordRegex + "(?=[^!-@]*[!-@])";
        let specialcharactererror = false;
        if (/(?=[^!-@]*[!-@])/.test(pwdvalue))
          specialcharactererror = false;
        else
          specialcharactererror = true;
        if (specialcharactererror) {
          if (this.errorMsg != null)
            this.errorMsg = this.errorMsg + ", Special Character";
          else
            this.errorMsg = this.errorMsg + " Special Character";
        }
      }
      //---------- Password Policy Implementation (end) ----------

      this.passwordRegex = this.passwordRegex + ".{" + this.minPass + "," + this.maxPass + "}";
      // this.passwordRegex = "(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^!-@]*[!-@]).{10,15}";
      if (this.errorMsg)
        this.errorMsg = "Password must contain atleast one " + this.errorMsg + ".";
      if (pwdvalue.length < this.minPass) {
        this.errorMsg = "Please enter Minimum  " + this.minPass + "  character" + this.errorMsg + ".";
      }
      if (pwdvalue.length > this.maxPass) {
        this.errorMsg = "Please enter Maximum  " + this.maxPass + "  character" + this.errorMsg + ".";
      }
      if (this.errorMsg || this.errorMsg.length > 2) {
        this.passwordenable = true;
      }
      else {
        this.passwordenable = false;
      }



    });
  }

  userLogout(loggedInUser) {
    // document.getElementById("navBarFont").click();
    let ipaddress: any = this.ipData;
    // let element:HTMLElement = this.navBarFont.nativeElement;
    this.apiService.logout(loggedInUser, this.ipData.ip).subscribe(resp => {
      console.log("loggedInUser::", loggedInUser);
      // console.log("resp",resp)
    })
  }
  public changePassword(newPassword: string, confirmPassword: string, userId: string, otp: string) {
    // console.log(newPassword,confirmPassword, userId);
    // this.userId = localStorage.getItem("userIdForChangePassword");
    // var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{14,20}$/;
    //var passValidation1 = regularExpression.test(newPassword);
    // var passValidation2 = regularExpression.test(confirmPassword);
    // this.apiService.fetchSecurityPolicyService().subscribe(resp => {
    //   this.security = resp;
    //   this.minPass = this.security.min_pswd_length;
    //   this.maxPass = this.security.max_pswd_length;

    //   // this.buildForm(this.minPass, this.maxPass);
    //   console.log(this.minPass, this.maxPass);
    //   console.log(this.security);
    //   if(new)
    // });
    this.userId = userId;
    if (newPassword === confirmPassword) {
    //   console.log(this.userId);

      this.lowerCase = this.userId.toLowerCase();
      if (newPassword.indexOf(this.userId) > -1 || newPassword.indexOf(this.lowerCase) > -1) {
        this.responseError = "Password should not Contain user ID!";
        this.responseMsg = null;
      }

      //---------- Password Policy Implementation (BEGIN) ----------
      if (newPassword === confirmPassword) {
        console.log(this.userId);
        this.lowerCase = this.userId.toLowerCase();
        if (newPassword.includes(this.userId) || newPassword.includes(this.lowerCase)) {
          // this.responseError = "Password should not Contain user ID!";
          setTimeout(() => {
            this.toastr.error('Password should not Contain user ID!', ``,  {
              timeOut: 6000,
              progressBar:true,
              tapToDismiss:true,
              closeButton:true,
              easeTime:900,
              extendedTimeOut:3000
            });
          });
          this.responseMsg = null;
        }
        else {
          this.passwordDTO.userId = this.userId;
          this.passwordDTO.password = newPassword;
          // this.disableSubmit = true;
          console.log(this.passwordDTO);
          if(this.security.pswd_reuse_aft === 0) 
          {
            this.apiService.changePassword(this.passwordDTO).subscribe(resp => {
              this.responseMsg = resp;
              console.log('respose',this.responseMsg );
              if (this.responseMsg) {
                setTimeout(() => {
                  this.toastr.success('Password Updated!', ``,  {
                    timeOut: 6000,
                    progressBar:true,
                    tapToDismiss:true,
                    closeButton:true,
                    easeTime:900,
                    extendedTimeOut:3000
                  });
                });
                // Added by Shilpa Sree on 25/09/2020, IssueId: 0000714
                localStorage.clear();
                this.toastr.clear();
                this.router.navigateByUrl('/login');

                // ----------------------------------------------------
              }
            });
            this.responseError = null;
            this.passwordStatus = true;
          }
          else if(this.security.pswd_reuse_aft !== 0) 
          {
            this.apiService.changePassword(this.passwordDTO).subscribe(resp => {
              this.responseMsg = resp;
              console.log('respose',this.responseMsg );
              if (this.responseMsg) {
                // this.responseMsg = "Password Updated!";
                setTimeout(() => {
                  this.toastr.success('Password Updated!', ``,  {
                    timeOut: 6000,
                    progressBar:true,
                    tapToDismiss:true,
                    closeButton:true,
                    easeTime:900,
                    extendedTimeOut:3000
                  });
                });
                // this.disableSubmit = true;
               /* this.responseError = null;
                this.passwordStatus = true;
                // Added by Shilpa Sree on 25/09/2020, IssueId: 0000714
                localStorage.clear();
                this.router.navigateByUrl('/login');
                */
               this.userLogout(userId);
               localStorage.removeItem('mdauser');
               sessionStorage.setItem('logout', 'yes');
               document.getElementById('dummyele').click();
               this.toastr.clear();
               this.router.navigateByUrl('#');
               this.router.navigate(['/']);
                // ----------------------------------------------------
              }
              else {
                this.toastr.clear();
                setTimeout(() => {
                  this.toastr.error('You cannot use previous passwords!', ``,  {
                    timeOut: 6000,
                    progressBar:true,
                    tapToDismiss:true,
                    closeButton:true,
                    easeTime:900,
                    extendedTimeOut:3000
                  });
                });
              }
            }, (error:any) => {
              if (HttpErrorResponse) {
                // this.responseError = "Failed!";
                setTimeout(() => {
                  this.toastr.error('Failed!', ``,  {
                    timeOut: 6000,
                    progressBar:true,
                    tapToDismiss:true,
                    closeButton:true,
                    easeTime:900,
                    extendedTimeOut:3000
                  });
                });
                this.responseMsg = null;
                this.passwordStatus = false;
              }
            });
          }
        }
      }
      else {
        // this.responseError = "Password Mismatch!";
        setTimeout(() => {
          this.toastr.error('Password Mismatch!', ``,  {
            timeOut: 6000,
            progressBar:true,
            tapToDismiss:true,
            closeButton:true,
            easeTime:900,
            extendedTimeOut:3000
          });
      });
        this.responseMsg = null;
        this.passwordStatus = false;
      }
    }
    else {
      this.responseError = "Password Mismatch!";
      this.responseMsg = null;
      this.passwordStatus = false;
    }
  }
      /*
//------------------------------14-10-2020----- start ---------------------------
      else if (this.security.pswd_reuse_aft === 0) {
        this.login1.userId = userId;
        this.login1.password = newPassword;
        this.login1.otp = otp;
        // console.log("login -- ",this.login1.userId, this.login1.password, this.login1.otp);
        this.apiService.changePassword1(this.login1).subscribe(res => {
          this.var1 = res;
          if (this.var1 === null) {
            setTimeout(() => {
              this.toastr.error('You cannot use previous ' + `${this.security.pswd_reuse_aft}` + ' Passwords!', ``, {
                timeOut: 6000,
                progressBar: true,
                tapToDismiss: true,
                closeButton: true,
                easeTime: 900,
                extendedTimeOut: 3000
              });
            });
          }
          else if (this.var1.otp === this.login1.otp) {
            setTimeout(() => {
              this.toastr.success('Password changed Successfully!', ``, {
                timeOut: 6000,
                progressBar: true,
                tapToDismiss: true,
                closeButton: true,
                easeTime: 900,
                extendedTimeOut: 3000
              });
            });
            this.userLogout(userId);
            localStorage.removeItem('mdauser');
            sessionStorage.setItem('logout', 'yes');
            document.getElementById('dummyele').click();
            this.router.navigateByUrl('#');
            this.router.navigate(['/']);
          }
          else if (this.var1.otp !== this.login1.otp) {
            setTimeout(() => {
              this.toastr.error('Invalid OTP', ``, {
                timeOut: 6000,
                progressBar: true,
                tapToDismiss: true,
                closeButton: true,
                easeTime: 900,
                extendedTimeOut: 3000
              });
            });
          }
          else if (this.var1.otp !== 'FAILED') {
            setTimeout(() => {
              this.toastr.error('Server Error', ``, {
                timeOut: 6000,
                progressBar: true,
                tapToDismiss: true,
                closeButton: true,
                easeTime: 900,
                extendedTimeOut: 3000
              });
            });
          }
        });
      }
      else {
      this.responseError = "Password Mismatch!";
      this.responseMsg = null;
      this.passwordStatus = false;
    }
  }
  //------------------------------14-10-2020---- end ----------------------------
      */
      //---------- Password Policy Implementation (END) ----------
      // else
      // {
      // if( this.passwordenable == false)
      // {
      // this.passwordDTO.userId = this.userId;
      // this.passwordDTO.password = newPassword;
      // console.log(this.passwordDTO);
      // this.apiService.changePassword(this.passwordDTO).subscribe(resp=>{
      //   this.responseMsg = resp;
      //   console.log(this.responseMsg);

      //   if(this.responseMsg == "success")
      //   {
      //     this.responseMsg = "Password Updated!";
      //     setTimeout(() => {
      //       this.toastr.success('', `Password Updated Succesfully`,  {
      //         timeOut: 6000,
      //         progressBar:true,
      //         tapToDismiss:true,
      //         closeButton:true,
      //         easeTime:900,
      //         extendedTimeOut:3000
      //       });
      //     });
      //     this.responseError = null;
      //     this.passwordStatus = true;
      //     localStorage.removeItem('mdauser');
      //     sessionStorage.setItem('logout', 'yes');
      //     document.getElementById('dummyele').click();
      //     this.router.navigateByUrl('#');
      //   }else{
      //     setTimeout(() => {
      //       this.toastr.error('You cannot use previous passwords!', ``,  {
      //         timeOut: 6000,
      //         progressBar:true,
      //         tapToDismiss:true,
      //         closeButton:true,
      //         easeTime:900,
      //         extendedTimeOut:3000
      //       });
      //     });
      //   }
      // },error=>{
      //   if(HttpErrorResponse)
      //   {
      //     this.responseError = "Failed!";
      //     this.responseMsg = null;
      //     this.passwordStatus = false;
      //   }
      // });
      // }
      // else{
      //   this.responseError = "Password does not meet the requirement!";
      // }
      // }
    // }
    

  reset() {
    this.responseError = null;
    this.responseMsg = null;
    this.passwordStatus = false;
  }

  back() {
    if (this.navBarFont) {
      let element: HTMLElement = this.navBarFont.nativeElement;
      this.toastr.clear();
      element.click();
     
    }
    if (this.userId) {
      this.userLogout(this.userId);
    }
    localStorage.removeItem('mdauser');
    sessionStorage.setItem('logout', 'yes');
    document.getElementById('dummyele').click();
    //document.getElementById('wrapperelement').style.display='none';
    //window.location.reload();
    //this.route.navigate(['#']);
    this.router.navigateByUrl('#');
    //this.router.navigateByUrl('logout');
  }

  pwdMatchValidator(frm: FormGroup) {
    return !this.passwordRegex ? null : { 'mismatch': true };
  }
  myFunction() {
    this.hide = !this.hide;
  }
  myFunction1() {
    this.hide2 = !this.hide2;
  }
}
