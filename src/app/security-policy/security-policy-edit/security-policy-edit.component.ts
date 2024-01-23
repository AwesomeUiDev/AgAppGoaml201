import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
// import { permissionsLabels } from 'src/app/shared/dtos/newRolePermissions';
// import { RoleService } from 'src/app/shared/services/role.service';
import { APIService } from 'src/app/api.service';
import { SecurityDto } from 'src/app/security-dto';

@Component({
  selector: 'app-security-policy-edit',
  templateUrl: './security-policy-edit.component.html',
  styleUrls: ['./security-policy-edit.component.css']
})
export class SecurityPolicyEditComponent implements OnInit {

  enablebuttons = ['cancel'];
  editFalg: boolean = false;
  loggedInUser: string;
  // roleCodes = new permissionsLabels();

  constructor(private route: ActivatedRoute, private router: Router,
    private securityServ: APIService) { }
  
    security = new SecurityDto();
  disableSubmit = false;
  checkedlist: any = [];
  storevalue: any;
  
  //this is for button
  textBtnConfig = {
    styles: {
      borderRadius: '20px',
    },
    text: 'New'
  };
  
  ngOnInit() {
    this.loggedInUser = localStorage.getItem("userFromLogin");
    this.gettingSecurityPolicySummary();
    this.commonAuditlog();

    if (this.security.pswd_complex_ucase == "true") {
      this.security.pswd_complex_ucase = true;
    }
    if (this.security.pswd_complex_ucase == "false") {
      this.security.pswd_complex_ucase = false;
    }
    if (this.security.pswd_complex_lcase == "true") {
      this.security.pswd_complex_lcase = true;
    }
    if (this.security.pswd_complex_lcase == "false") {
      this.security.pswd_complex_lcase = false;
    }
    if(this.security.pswd_complex_num=="true")
    {
      this.security.pswd_complex_num=true;
    }
    if(this.security.pswd_complex_num=="false")
    {
      this.security.pswd_complex_num=false;
    }
    if(this.security.pswd_complex_splc=="true")
    {
      this.security.pswd_complex_splc=true;
    }
    if(this.security.pswd_complex_splc=="false")
    {
      this.security.pswd_complex_splc=false;
    }
    console.log("vidya", this.security.max_inv_logins);
    console.log(this.security.pswd_complex_splc);
    console.log(this.security);

    // New Role Implementation
    // setTimeout(() => {
    //   this.newRolePermissions();
    // }, 2000);
    // this.roleService.screenLabelList.subscribe(message => this.roleCodes = message);
  }

  // newRolePermissions()
  // {
  //   this.roleService.fetchScreenPermissions('Security Policy');
  //   if(this.roleCodes.edit){
  //     this.enablebuttons.push(this.roleCodes.edit.labelDescription.toLowerCase());
  //   }
  //   if(this.roleCodes.auth){
  //     this.enablebuttons.push('viewUnauth');
  //   }
  //   let saveindex = this.enablebuttons.indexOf("save");
  //     if(saveindex !== -1) {
  //       this.enablebuttons.splice(saveindex,1);
  //       console.log(this.enablebuttons);
  //     }
  // }

  gettingSecurityPolicySummary()
  {
    console.log("security policy summary");
    this.securityServ.gettingSecurityPolicySummary().subscribe(securityPolicySummResp=>{
      console.log(securityPolicySummResp);
      this.security=securityPolicySummResp;
      console.log(this.security);
      this.commonAuditlog();
    });
  }

  onsaveEditOfSecurityPolicy() {
    console.log(this.security);//this is front end request
    this.security.modified_by=this.loggedInUser;
    this.securityServ.onSaveOfSecurityPolicy(this.security).subscribe(editSecurityPolicyResp => {
      console.log("editSecurityPolicyResp", editSecurityPolicyResp);

      if(this.security.min_pswd_length > this.security.max_pswd_length) {
        console.log(this.security.min_pswd_length);
        console.log(this.security.max_pswd_length);
        Swal.fire({
          title: "Min Password Length should not be greater than Max Password Length"
        });
      }
      else if(this.security.pswd_expiry < this.security.notify_password_expiry_in_days) {
        Swal.fire({
          title: "Notify Password Expiry should be less than Password Expiry field"
        });
      }
      else if(this.security.min_pswd_length < 4 || this.security.max_pswd_length < 4) {
        Swal.fire({
          title: "Min Password Length and Max Password Length should not be less than 4"
        });
      }
      else if (editSecurityPolicyResp) {
        Swal.fire({
          title: "Record is Modified"
        });
        // this.newRolePermissions();
        this.editFalg=false;
      }
      else {
        Swal.fire({
          title: "Failed to Modify the Record."
        })
      }
    })
  }
  
  onCancelSecurityPlocyEdit() {
    this.router.navigateByUrl('/dashboard')
  }
  
  authOfSecurityPolicy() {
    console.log("this is auth");
    if (this.security.modified_by == this.loggedInUser) {
      Swal.fire(
        {
          title: "Maker cannot Authorize the Record."
        }
      )
    }
    else {
      this.securityServ.onAuthOfSecurityPolicy(this.security).subscribe(authResp => {
        console.log(authResp);
        this.security = authResp;
        Swal.fire(
          {
            title: "Record is Authorized."
          }
        )
      })
    }
  }
  
  editOfSecurityPolicy() {
    console.log(this.editFalg);
    this.enablebuttons=['save','cancel'];
    this.editFalg = true;
  }
  
  //max invalid Login
  checkvalue(event) {
    this.storevalue = JSON.parse(localStorage.getItem('passwordval'));
    let target = this.security;
    let nullexist = false;
    for (var member in target) {
      if (target[member] == null)
        nullexist = true;
    }
    if (!nullexist) {
      if (JSON.stringify(this.storevalue) === JSON.stringify(this.security)) {
        this.disableSubmit = true;
      }
      else {
        this.disableSubmit = false;
      }
    }
  }
  
  buttonState(event) {
    this.disableSubmit = false;
    if (event.checked)
      this.checkedlist.push('checked');
    else
      this.checkedlist.splice(0, 1);
  }

  // for two_factor_auth field
  // onValChange(ValueOfRecordstatus) {
  //   console.log("ValueOfRecordstatus", ValueOfRecordstatus);
  //   this.security.two_factor_auth = ValueOfRecordstatus;
  // }

  commonAuditlog() {
    if (this.security.auth_status == 'A') {
      this.security.auth_status = 'AUTHORIZED';
    }
    if (this.security.auth_status == 'U') {
      this.security.auth_status = 'UNAUTHORIZED';
    }
  }
 
  ViewUnAuthReocrds()
  {
    console.log("click to view unauth");
    this.router.navigateByUrl('/security/securityPolicySummary')
  }
}
