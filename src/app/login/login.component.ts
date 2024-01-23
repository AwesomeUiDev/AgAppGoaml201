import { Component, OnInit, Output } from '@angular/core';
import { Login } from './login';
import { APIService } from '../api.service';
import { User } from '../user-management/user';
import { UserHomeComponent } from '../user-home/user-home.component';
import { Role } from '../role-management/role';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SecurityDto } from 'src/app/security-dto';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../roles1/roles.service';
import * as CryptoJS from 'crypto-js';
declare const $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userType: any;
  @Output() userDto: User;
  security: SecurityDto;
  status = true;
  response = "";
  roleId = "";
  roleActiveStatus: boolean = false;
  defaultPassword: boolean = false;
  fetchroutername: string;
  @Output() roleInfo: string[];
  invLogins: any;
  failattem: any;
  notifyPswdExpry: any;
  pswdExpiry: any;
  currentDate: any;
  changePwdDate: any;
  differnceInTime: any;
  differnceInDays: any;
  finalDiff: any;
  ipData: any;
  user: Login = new Login();



  constructor(private apiService: APIService, private http: HttpClient, private router: Router, private roleService: RoleService, private toastr: ToastrService) {


  }
  ngOnInit() {

    this.response = '';
    // console.log("Data::",Data)
    this.fetchip();
    // console.log('refreshconsolelogin', sessionStorage.getItem('logout'));
    this.apiService.routername.subscribe(message => this.fetchroutername = message);
    //this.getRoleInfo("test");
    // this.getIP();  
    // $('.js-tilt').tilt({
    // scale: 1.1
    // })
    setTimeout(() => {
      sessionStorage.removeItem('logout');
      this.redirecttocurrentroute();
    }, 100);
  }


  fetchip() {
    this.http.get<{ ip: string }>('https://jsonip.com').subscribe((data) => {
      this.ipData = data;
    });
  }

  redirecttocurrentroute() {
    console.log('timeout', this.fetchroutername);
    let retrieveobject = localStorage.getItem('mdauser');
    console.log('obj', retrieveobject, this.fetchroutername);
    if (document.getElementById('loginBlock')) {
      document.getElementById('loginBlock').style.display = 'block';
    }
    if (this.fetchroutername.length > 2 && retrieveobject) {
      let user = JSON.parse(retrieveobject);
      this.functionalityafterlogin(this.fetchroutername, user);
    }
  }


  functionalityafterlogin(routername, user) {
    console.log(user, 'user');
    this.userDto = user;
    if (user.roleId) {
      this.roleId = user.roleId;
    }
    var userId = user.userId;
    var userType = user.userType;
    localStorage.setItem("userIdForChangePassword", userId);
    localStorage.setItem("userTypeAuthGuard", userType);
    if (user != null) {
      this.userType = user.userType;
      this.status = false;
      localStorage.setItem("userType", this.userDto.userType);
    }
    if(routername== '/changePassword')
    {
       routername = '/about';
    }
    this.router.navigate([routername]);

  }


  login(login: Login) {
    if (!login.userId) {
      this.response = "Enter User Id!";
    }
    else if (!login.userPwd) {
      this.response = "Enter Password!";
    }
    else {
      this.userLogout(login);
      // this.validationLogin(login);
    }
      /*
      // code for encryption
      var encrypteduname = CryptoJS.AES.encrypt(login.userId, "@12#90!^*NPR*g&*()$34#$");
      var encryptedpwd = CryptoJS.AES.encrypt(login.userPwd, "@12#90!^*NPR*g&*()$34#$");
      var uname = encrypteduname.toString();
      var pwd = encryptedpwd.toString();
      login.userId = uname;
      console.log(login.userId);
      login.userPwd = pwd;
      console.log(login);
      // end of code for encryption

      this.apiService.loginService(login, this.ipData.ip).subscribe(user => {
        // console.log("responseData:",responseData.ip)
        console.log(user);
        this.userDto = user;
        let userData: any = user;
        localStorage.setItem('mdauser', JSON.stringify(user));

        if (this.userDto && this.userDto.activeStatus == 'N') {
          this.apiService.fetchSecurityPolicyService().subscribe(sp => {
            this.security = sp;
            this.invLogins = this.security.max_inv_logins;
            console.log(this.userDto.failLgnCounter)
            this.failattem = this.userDto.failLgnCounter;

            // this.invLogins = this.invLogins - 1;
            console.log("Counter from SP ", this.invLogins);
            // console.log("Counter in User table ",this.user.failedAttempts);
            console.log("Counter in User table ", this.failattem);

            if (this.invLogins === this.failattem) {
              setTimeout(() => {
                // this.toastr.info('Click on Change Password to reset your Password.', `Your password will expire in ${this.finalDiff} day/s!`,  {
                this.toastr.info('Contact Admin', `User Account locked after ${(this.userDto.failLgnCounter)} wrong attempts.`, {
                  timeOut: 6000,
                  progressBar: true,
                  tapToDismiss: true,
                  closeButton: true,
                  easeTime: 900,
                  extendedTimeOut: 3000
                });
              });

            }
            else {
              if (userData.responeMsg === "User Locked") {
                this.response = "User Locked";

                setTimeout(() => {
                  this.toastr.info('User Locked! ', ``, {
                    timeOut: 6000,
                    progressBar: true,
                    tapToDismiss: true,
                    closeButton: true,
                    easeTime: 900,
                    extendedTimeOut: 3000
                  });
                });
                return false;
              }
              return false;
            }
          });

          // }
          return false;
        }
        if (userData.responeMsg === "invalid Userid") {
          // this.response = "Please Enter A Valid UserId";
          this.response = "Invalid Credentials!";
          return false;
        }

        if (userData.pacakgemsg === "ALREADY_LOGGED_IN") {
          // window.alert("login failed")
          this.response = "User Already Logged In";
          return false;
        }
        if (userData.pacakgemsg === "FAILED") {
          // window.alert("login failed")
          this.response = "Login Failed,Contact System Admin";
          return false;
        }
        if (userData.responeMsg === "User Not Authorized") {
          this.response = "User Not Authorized";
          console.log("user", userData.authStatus)
          return false;
        }
        if (userData.responeMsg === "user not Open") {
          this.response = "User Is Disable";
          console.log("user1::", userData.status);
          return false;
        }
        if (userData.responeMsg === "User Locked") {
          this.response = "Please Unlock the User";
          console.log("user2", userData.activeStatus)
          return false;
        }

        if (user.roleId) {
          this.roleId = user.roleId;
        }
        var userId = user.userId;
        var userType = user.userType;
        localStorage.setItem("userIdForChangePassword", userId);
        localStorage.setItem("userTypeAuthGuard", userType);
        localStorage.setItem("userFromLogin", userId);
        this.roleService.fetchNewRolePermissions(userId);
        console.log(this.roleId);
        console.log(this.userDto);

        if (user != null) {
          this.userType = user.userType;
          this.status = false;
          localStorage.setItem("userType", this.userDto.userType);
          if (this.userDto.userId == login.userPwd) {
            this.defaultPassword = true;

            //this.route.navigateByUrl("defaultPassword");
            //alert("Please Change your default password!");
            localStorage.setItem("passwordAlert", "Please Change your default password!");
            localStorage.setItem("pass", login.userPwd);
          }
          if (this.userDto.authStatus == "I") {
            this.status = true;
            this.response = "User Not Authorized!";
            return false;
          }
          if (this.userDto.emailId == "Invalid") {
            this.status = true;
            // this.response = "User Account will be  locked after Reaching the Max  wrong attempts..!";
            this.response = "Invalid Credentials!";
            return false;
          }

          if (this.userDto.activeStatus == "Y") {
            this.apiService.fetchSecurityPolicyService().subscribe(resp => {
              this.security = resp;
              this.notifyPswdExpry = this.security.notify_password_expiry_in_days;
              this.pswdExpiry = this.security.pswd_expiry;
              if (this.pswdExpiry === 0 && this.notifyPswdExpry === 0) {
                console.log("Hitting dashboard");
                // this.router.navigate(["/about"]);
                this.router.navigateByUrl('about');
              }
              else {
                this.currentDate = new Date();
                console.log(this.userDto.pwdChangeDate);
                this.changePwdDate = new Date(this.userDto.pwdChangeDate);
                this.differnceInTime = this.currentDate - this.changePwdDate;
                this.differnceInDays = Math.floor(this.differnceInTime / (1000 * 3600 * 24));
                console.log("today's date ", this.currentDate);
                console.log("pswd created date ", this.changePwdDate);
                console.log("no of days diff ", this.differnceInDays);
                this.finalDiff = this.pswdExpiry - this.differnceInDays;
                console.log("notify user on password expiry", this.notifyPswdExpry);
                console.log("pwd expiry ", this.security.pswd_expiry);
                console.log("final diff", this.finalDiff);

                if (this.finalDiff === 0 || this.finalDiff < 0) {
                  setTimeout(() => {
                    this.toastr.info('Your password expired', `Please change your password`, {
                      timeOut: 6000,
                      progressBar: true,
                      tapToDismiss: true,
                      closeButton: true,
                      easeTime: 900,
                      extendedTimeOut: 3000
                    });
                  });
                  this.router.navigateByUrl('changePassword');
                  return false;
                  // this.router.navigate('/changePassword');
                }
                else {
                  //---------- Password Policy Implementation (END) ----------
                  console.log("Hitting dashboard");
                  this.router.navigateByUrl('about');
                }
              }
            });

          }




        }
        // this.getRoleInfo(this.userDto.roleId);

      }, error => {
        if (HttpErrorResponse) {
          this.response = "Login Failed!";
        }
      });


      //sending Data to admin and user components
      // this.userCom.getUserObject(this.userDto);

    }
    */
  }


  loginValidate(login: Login) {
    if (login.userId && login.userPwd) {
      if (login.userId === 'admin' && login.userPwd === 'admin') {
        this.status = false;
        this.userType = 'A';
      }
      else {
        this.response = "Invalid Credentials";
      }
      if (login.userId === 'user' && login.userPwd === 'user') {
        this.status = false;
        this.userType = 'N';
      }
      else {
        this.response = "Invalid Credentials";
      }
    }
    else {
      this.response = "Enter User ID and Password";
    }
  }

  getRoleInfo(roleId) {
    this.apiService.getRoleInfoService(roleId).subscribe(resp => {
      this.roleInfo = resp;
      console.log(this.roleInfo);
    }, error => {
      if (HttpErrorResponse) {

      }

    });
  }


  resetpage() {
    this.status = true;
    this.response = '';
    this.defaultPassword = false;
    this.fetchip();
    setTimeout(() => {
      document.getElementById('loginBlock').style.display = 'block';
    }, 100);

  }


  changeStatus() {
    this.status = false;
  }
  //forgotPassword(userId)
  //{
  //f(!userId)
  //{
  //this.response = "Enter User ID!";
  //}
  //e/lse
  //{
  //console.log(userId);
  //this.apiService.forgotPasswordService(userId).subscribe(res=>{
  //var result = res;
  //console.log(result);
  //if(!result)
  //{
  //this.response = "User Not Found!";
  //}
  //else{
  //this.response="Credentials has been sent to registered Mail ID!";
  //}
  //});
  //}
  forgotPassword(userId) {
    this.status = false;
    this.router.navigateByUrl('changePassword');
  }
  userLogout(loggedInUser) {
    // document.getElementById("navBarFont").click();
    let ipaddress: any = this.ipData;
    // let element:HTMLElement = this.navBarFont.nativeElement;
    this.apiService.logout(loggedInUser.userId, this.ipData.ip).subscribe(resp => {
      setTimeout(() => {
        this.validationLogin(loggedInUser);
      }, 200);
      // console.log("loggedInUser::", loggedInUser);
      // this.validationLogin(loggedInUser);
      // console.log("resp",resp)
    })
  }
    
validationLogin(login){
  {
    // code for encryption
    var encrypteduname = CryptoJS.AES.encrypt(login.userId, "@12#90!^*NPR*g&*()$34#$");
    var encryptedpwd = CryptoJS.AES.encrypt(login.userPwd, "@12#90!^*NPR*g&*()$34#$");
    var uname = encrypteduname.toString();
    var pwd = encryptedpwd.toString();
    login.userId = uname;
    // console.log(login.userId);
    login.userPwd = pwd;
    // console.log(login);
    // end of code for encryption
    
    this.apiService.loginService(login, this.ipData.ip).subscribe(user => {
      // console.log("responseData:",responseData.ip)
      // console.log(user);
      this.userDto = user;
      let userData: any = user;
      localStorage.setItem('mdauser', JSON.stringify(user));

      if (this.userDto && this.userDto.activeStatus == 'N') {
        this.apiService.fetchSecurityPolicyService().subscribe(sp => {
          this.security = sp;
          this.invLogins = this.security.max_inv_logins;
          console.log(this.userDto.failLgnCounter)
          this.failattem = this.userDto.failLgnCounter;

          // this.invLogins = this.invLogins - 1;
          console.log("Counter from SP ", this.invLogins);
          // console.log("Counter in User table ",this.user.failedAttempts);
          console.log("Counter in User table ", this.failattem);

          if (this.invLogins === this.failattem) {
            setTimeout(() => {
              // this.toastr.info('Click on Change Password to reset your Password.', `Your password will expire in ${this.finalDiff} day/s!`,  {
              this.toastr.info('Contact Admin', `User Account locked after ${(this.userDto.failLgnCounter)} wrong attempts.`, {
                timeOut: 6000,
                progressBar: true,
                tapToDismiss: true,
                closeButton: true,
                easeTime: 900,
                extendedTimeOut: 3000
              });
            });

          }
          else {
            if (userData.responeMsg === "User Locked") {
              this.response = "User Locked";

              setTimeout(() => {
                this.toastr.info('User Locked! ', ``, {
                  timeOut: 6000,
                  progressBar: true,
                  tapToDismiss: true,
                  closeButton: true,
                  easeTime: 900,
                  extendedTimeOut: 3000
                });
              });
              return false;
            }
            return false;
          }
        });

        // }
        return false;
      }
      if (userData.responeMsg === "invalid Userid") {
        // this.response = "Please Enter A Valid UserId";
        this.response = "Invalid Credentials!";
        return false;
      }

      if (userData.pacakgemsg === "ALREADY_LOGGED_IN") {
        // window.alert("login failed")
        this.response = "User Already Logged In";
        return false;
      }
      if (userData.pacakgemsg === "FAILED") {
        // window.alert("login failed")
        this.response = "Login Failed,Contact System Admin";
        return false;
      }
      if (userData.responeMsg === "User Not Authorized") {
        this.response = "User Not Authorized";
        console.log("user", userData.authStatus)
        return false;
      }
      if (userData.responeMsg === "user not Open") {
        this.response = "User Is Disable";
        console.log("user1::", userData.status);
        return false;
      }
      if (userData.responeMsg === "User Locked") {
        this.response = "Please Unlock the User";
        console.log("user2", userData.activeStatus)
        return false;
      }

      if (user.roleId) {
        this.roleId = user.roleId;
      }
      var userId = user.userId;
      var userType = user.userType;
      localStorage.setItem("userIdForChangePassword", userId);
      localStorage.setItem("userTypeAuthGuard", userType);
      localStorage.setItem("userFromLogin", userId);
      this.roleService.fetchNewRolePermissions(userId);
      console.log(this.roleId);
      // console.log(this.userDto);

      if (user != null) {
        this.userType = user.userType;
        this.status = false;
        localStorage.setItem("userType", this.userDto.userType);
        if (this.userDto.userId == login.userPwd) {
          this.defaultPassword = true;

          //this.route.navigateByUrl("defaultPassword");
          //alert("Please Change your default password!");
          localStorage.setItem("passwordAlert", "Please Change your default password!");
          localStorage.setItem("pass", login.userPwd);
        }
        if (this.userDto.authStatus == "I") {
          this.status = true;
          this.response = "User Not Authorized!";
          return false;
        }
        if (this.userDto.emailId == "Invalid") {
          this.status = true;
          // this.response = "User Account will be  locked after Reaching the Max  wrong attempts..!";
          this.response = "Invalid Credentials!";
          return false;
        }

        if (this.userDto.activeStatus == "Y") {
          this.apiService.fetchSecurityPolicyService().subscribe(resp => {
            this.security = resp;
            this.notifyPswdExpry = this.security.notify_password_expiry_in_days;
            this.pswdExpiry = this.security.pswd_expiry;
            if (this.pswdExpiry === 0 && this.notifyPswdExpry === 0) {
              console.log("Hitting dashboard");
              // this.router.navigate(["/about"]);
              this.router.navigateByUrl('about');
            }
            else {
              this.currentDate = new Date();
              console.log(this.userDto.pwdChangeDate);
              this.changePwdDate = new Date(this.userDto.pwdChangeDate);
              this.differnceInTime = this.currentDate - this.changePwdDate;
              this.differnceInDays = Math.floor(this.differnceInTime / (1000 * 3600 * 24));
              console.log("today's date ", this.currentDate);
              console.log("pswd created date ", this.changePwdDate);
              console.log("no of days diff ", this.differnceInDays);
              this.finalDiff = this.pswdExpiry - this.differnceInDays;
              console.log("notify user on password expiry", this.notifyPswdExpry);
              console.log("pwd expiry ", this.security.pswd_expiry);
              console.log("final diff", this.finalDiff);

              if (this.finalDiff === 0 || this.finalDiff < 0) {
                setTimeout(() => {
                  this.toastr.info('Your password expired', `Please change your password`, {
                    timeOut: 6000,
                    progressBar: true,
                    tapToDismiss: true,
                    closeButton: true,
                    easeTime: 900,
                    extendedTimeOut: 3000
                  });
                });
                this.router.navigateByUrl('changePassword');
                return false;
                // this.router.navigate('/changePassword');
              }
              else {
                //---------- Password Policy Implementation (END) ----------
                console.log("Hitting dashboard");
                this.router.navigateByUrl('about');
              }
            }
          });

        }




      }
      // this.getRoleInfo(this.userDto.roleId);

    }, error => {
      if (HttpErrorResponse) {
        this.response = "Login Failed!";
      }
    });


    //sending Data to admin and user components
    // this.userCom.getUserObject(this.userDto);

  }
}

}

/*==================================================================
[ Validate ]*/
// var input = $('.validate-input .input100');



// validate (input) {
// if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
// if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
// return false;
// }
// }
// else {
// if($(input).val().trim() == ''){
// return false;
// }
// }
// }

// showValidate(input) {
// var thisAlert = $(input).parent();

// $(thisAlert).addClass('alert-validate');
// }

// hideValidate(input) {
// var thisAlert = $(input).parent();

// $(thisAlert).removeClass('alert-validate');
// }





