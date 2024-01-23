import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SecurityDto } from 'src/app/security-dto';
import { APIService } from '../api.service';
declare const $;

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {


  sessionOptions: any;
  sessions: any;
  sessionsData: any;
  currentUser:any;
  pendingRec:number;
  authLevel: any;
  
  // chartDetails = new ChartDetails();
  
  currentDate:any;
  changePwdDate:any;
  differnceInTime:any;
  differnceInDays:any;
  notifyPswdExpry:any;
  pswdExpiry:any;
  finalDiff:any;
  security: SecurityDto;




  constructor(private apiService: APIService, private toastr: ToastrService) { }

 /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
//  openNav() {
//   document.getElementById("mySidenav").style.width = "190px";
//   document.getElementById("main").style.marginLeft = "50px";
// }

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
//  closeNav() {
//   document.getElementById("mySidenav").style.width = "0";
//   document.getElementById("main").style.marginLeft = "0";
// }

ngOnInit()
{


  $(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});
  
  //  var dropdown = document.getElementsByClassName("dropdown-btn");
  //  var i;
   
  //  for (i = 0; i < dropdown.length; i++) {
  //    dropdown[i].addEventListener("click", function() {
  //      this.classList.toggle("active");
  //      var dropdownContent = this.nextElementSibling;
  //      if (dropdownContent.style.display === "block") {
  //        dropdownContent.style.display = "none";
  //      } else {
  //        dropdownContent.style.display = "block";
  //      }
  //    }); 
    
  //  }
  //  this.openNav();

//---------- Password Policy Implementation (BEGIN) ----------
this.apiService.fetchSecurityPolicyService().subscribe(resp => {
  this.security = resp;
  this.notifyPswdExpry = this.security.notify_password_expiry_in_days;
  this.pswdExpiry = this.security.pswd_expiry;
  
  this.currentDate = new Date();
  this.changePwdDate = new Date(this.currentUser.pwdChangeDate);
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
