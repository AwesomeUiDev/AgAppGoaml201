  import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { User } from '../user-management/user';
import { APIService } from '../api.service';
import { LoginComponent } from '../login/login.component';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { RoleService } from '../roles1/roles.service';
import { MessageService } from '../GOAML/messages/message.service';
import { permissionsLabels } from '../roles1/models/fmosNewRolePermissions';
import { SecurityDto } from 'src/app/security-dto';
import { ToastrService } from 'ngx-toastr';
import { UserIdleService } from 'angular-user-idle';
import { filter,pairwise} from 'rxjs/operators'

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  // @HostListener('mouseup', ['$event'])
  // @HostListener('mousemove', ['$event'])
  // onEvent(event: MouseEvent) {
     
  //     localStorage.setItem('time-limit', "clear-now");
  // }
  // @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  //     localStorage.setItem('time-limit', "clear-now");
  // }
  @ViewChild('navBarFont') navBarFont: ElementRef<HTMLElement>;
  @ViewChild('naBar')naBar:ElementRef<HTMLElement>;
  loggedInUser: string;
  ipData: any;


  constructor(private apiService:APIService,private http: HttpClient, private userIdle: UserIdleService,  private router: Router,
    private messageService:MessageService, private route:Router,  private activatedRoute:ActivatedRoute, private roleService: RoleService, private toastr: ToastrService) { }
  @Input()user:User;
  userType:any;
  username:any;
  roleId:any;
  msgs: any;

  screenpermissions:any=[];
  @Input()roleInfo=[];
  roleInfoString:string;
  param:any;
  lastLogin:string;
  enablenavbar:boolean=true;
  countForMessage: any;
  roleCodes = new permissionsLabels();
  currentDate:any;
  changePwdDate:any;
  differnceInTime:any;
  differnceInDays:any;
  notifyPswdExpry:any;
  pswdExpiry:any;
  finalDiff:any;
  security: SecurityDto;
  currentUser:any;
  getMessages(): void {
    this.messageService.getAllMessages()
      .subscribe(
        (msgs) => {
          this.msgs = msgs,
            console.log(this.msgs);
          let count = 0;
          for (let index = 0; index < this.msgs.length; index++) {
            if (((this.roleCodes.auth)) && this.msgs[index].msgStatus == "U" && this.msgs[index].msgType == "G") {
              console.log("if");
              count++;
            } else if (this.roleCodes.view && this.msgs[index].msgStatus == "U" && this.msgs[index].msgType == "R") {
              console.log("if else");
              count++;
            }
          }
          console.log(count);
          this.countForMessage = count;

        }
        
      );
  }

  getUserType()
  {
    if(this.user!=null)
    {
      this.userType = this.user.userType;
      this.username = this.user.userName;
      console.log(this.username);
      this.roleId = this.user.roleId;
      this.lastLogin = this.user.lastLgnTime;
      console.log(this.userType);
      //this.getRoleInfo(this.roleId);
      //console.log(this.roleInfo);

        //---------- Password Policy Implementation (BEGIN) ----------
this.apiService.fetchSecurityPolicyService().subscribe(resp => {
  this.security = resp;
  this.notifyPswdExpry = this.security.notify_password_expiry_in_days;
  this.pswdExpiry = this.security.pswd_expiry;
  
  this.currentDate = new Date();
  console.log(this.user.pwdChangeDate);
  this.changePwdDate = new Date(this.user.pwdChangeDate);
  this.differnceInTime = this.currentDate - this.changePwdDate;
  this.differnceInDays = Math.floor(this.differnceInTime/(1000 * 3600 * 24));
  console.log("today's date ",this.currentDate);
  console.log("pswd created date ",this.changePwdDate);
  console.log("no of days diff ",this.differnceInDays);
  this.finalDiff = this.pswdExpiry - this.differnceInDays;
  console.log("notify user on password expiry", this.notifyPswdExpry);
  console.log("pwd expiry ",this.security.pswd_expiry);
  console.log("final diff",this.finalDiff);
  
  if(this.finalDiff > 0 && this.finalDiff <= this.notifyPswdExpry) {
    setTimeout(() => {
      this.toastr.info('Click on Change Password to reset your Password.', `Your password will expire in ${this.finalDiff} day/s!`,  {
        timeOut: 6000,
        progressBar:true,
        tapToDismiss:true,
        closeButton:true,
        easeTime:900,
        extendedTimeOut:3000
      });
    });
  }
});
//---------- Password Policy Implementation (END) ----------
    }
   
  }

  getRoleInfo(roleId)
  {
      this.apiService.getRoleInfoService(roleId).subscribe(resp=>{
        this.roleInfo = resp;
        // for (let i = 0; i < this.roleInfo.length; i++) {
          this.roleInfoString = this.roleInfo.join();
          console.log(this.roleInfoString);
          
        //}
        localStorage.setItem("roleInfo",this.roleInfoString);
        console.log(this.roleInfo);
      },error=>{
          if(HttpErrorResponse)
          {

          }
          
      });
  }

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
//  openUserNav() {
//   document.getElementById("mySidenav").style.width = "190px";
//   document.getElementById("main").style.marginLeft = "50px";
// }

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
//  closeUserNav() {
//   document.getElementById("mySidenav").style.width = "0";
//   document.getElementById("main").style.marginLeft = "0";
// }


newRolePermissions()
{
  this.roleService.fetchScreenPermissions('Message');
}

ngAfterViewInit()
{
  setTimeout(() => {
    if(this.route.url == '/changePassword' || window.location.href.indexOf("changePassword") > -1)
    {
      this.enablenavbar = false;
    }
  }, 500);
  
}

  ngOnInit() {
    // this.userIdle.startWatching();
  //   setTimeout((router: Router) => {
  //     window.alert("time out");
  //     this.router.navigate(['']);
  // }, 20000); 

  // this.userIdle.onTimerStart().subscribe(count => {
    // window.alert("idletime");
    // console.log(count)});
      // Start watch when time is up.
     

      this.userIdle.startWatching();
   /* this.userIdle.onTimerStart().subscribe(count => {
      console.log(count)});
        // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      let element:HTMLElement = this.navBarFont.nativeElement;
      element.click();
      console.log('Time is up!');
    }); */
      // Start watching when user idle is starting and reset if user action is there.
      this.userIdle.onTimerStart().subscribe(count=> {
        console.log(count);
        var eventList= ['click', 'mouseover', 'keydown', 'DOMMouseScroll', 'mousewheel',
        'mousedown','touchstart','touchmove','scroll','keyup'];
        for(let event of eventList) {
        document.body.addEventListener(event, () =>this.userIdle.resetTimer());
        }
        });
        // Start watch when time is up.
      this.userIdle.onTimeout().subscribe(() => {
        //alert('Your session has expired click on OK to resume the application.');
        let element:HTMLElement = this.navBarFont.nativeElement;
        element.click();
      })
  
  


  // this.userIdle.onTimeout().subscribe(() => {
  //   window.alert("timeout");
  //   console.log('Time is up!');
  // this.router.navigate(['#'])
  // });
    


    this.http.get<{ip:string}>('https://jsonip.com').subscribe((data) => {
      // console.log('data', data);
      this.ipData = data;
      // console.log("ipData",this.ipData)
      // return this.ipData;
 });
 
    // this.currentUser  = JSON.parse(localStorage.getItem('currentUser'));
     console.log(this.username)
     this.loggedInUser = localStorage.getItem('userFromLogin');
  
    this.roleService.EnablescreenPermissions();
    localStorage.setItem("key","ABC");
    this.getUserType();
    setTimeout(() => {
      this.newRolePermissions();
      this.getMessages();
      }, 2000);
    this.roleService.screenLabelList.subscribe(message => this.roleCodes = message);
    this.roleService.screenwisePermissions.subscribe(message => this.screenpermissions = message);
    if(this.route.url == '/changePassword' || window.location.href.indexOf("changePassword") > -1)
    {
      this.enablenavbar = false;
    }
    //router code 
    //end of router code
    // var dropdown = document.getElementsByClassName("dropdown-btn");
    // var i;
    
    // for (i = 0; i < dropdown.length; i++) {
    //   dropdown[i].addEventListener("click", function() {
    //     this.classList.toggle("active");
    //     var dropdownContent = this.nextElementSibling;
    //     if (dropdownContent.style.display === "block") {
    //       dropdownContent.style.display = "none";
    //     } else {
    //       dropdownContent.style.display = "block";
    //     }
    //   });
   // }
    
    // this.openUserNav();

    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          $(this).toggleClass('active');
      });
  });



  }
  showToast() {
    throw new Error("Method not implemented.");
  }

  notifyMe() {
    console.log('Event Fired');
  }

logout(url)
{
 localStorage.removeItem('mdauser');
 sessionStorage.setItem('logout', 'yes');
 document.getElementById('dummyele').click();
 //document.getElementById('wrapperelement').style.display='none';
 //window.location.reload();
 //this.route.navigate(['#']);
  this.route.navigateByUrl(url);
   // reset and set based on new parameter this time
   console.log("username::",this.loggedInUser)
   this.userLogout(this.loggedInUser);
  //  console.log("logout console",this.userLogout(this.loggedInUser))

}


userLogout(loggedInUser){
  // document.getElementById("navBarFont").click();
  let ipaddress:any=this.ipData;
  // let element:HTMLElement = this.navBarFont.nativeElement;
  this.apiService.logout(loggedInUser,this.ipData.ip).subscribe(resp=>{
    console.log("loggedInUser::",loggedInUser);
    // console.log("resp",resp)
  }) 
}
// userAccessLog(loggedInUser){
  //   this.apiService.logoutDetail(loggedInUser).subscribe(resp=>{
  //     console.log("loggedInUser::",loggedInUser);
  //     console.log("resp",resp)
  //   })
  // }
  // restart() {
  //   this.userIdle.resetTimer();
  // }
  // stop() {
  //   this.userIdle.stopTimer();
  // }
 
  // stopWatching() {
  //   this.userIdle.stopWatching();
  // }
 
  // startWatching() {
  //   this.userIdle.startWatching();
  // }
 
  
}
