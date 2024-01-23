import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { APIService } from 'src/app/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SecurityDto } from 'src/app/security-dto';

@Component({
  selector: 'app-securitysummary',
  templateUrl: './securitysummary.component.html',
  styleUrls: ['./securitysummary.component.css']
})
export class SecuritysummaryComponent implements OnInit {

  enablebuttons = ['auth'];
  loggedInuser: string;
  enableTable=false;
  currentUser: string;
  loggedInUser: string;
  loggedInUser2: string;

  constructor(private securityPolicyService: APIService, private router: Router, 
    private ref: ChangeDetectorRef) { }
  
  securityDto = new SecurityDto();
  // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  ngOnInit() {
    this.gettingDataForUnAuthRecords();
    this.loggedInUser = localStorage.getItem("userFromLogin");
    this.currentUser = localStorage.getItem("userIdForChangePassword");
    
    console.log(this.loggedInUser);
    console.log(this.loggedInUser2);
  }
  
  //getting unauth records
  gettingDataForUnAuthRecords() {
    console.log("this is unauth records");
    this.securityPolicyService.gettingUnAuthRecords().subscribe(unAuthRecords => {
      // let rec = unAuthRecords;
      this.securityDto = unAuthRecords;
      console.log(this.securityDto);
      if(this.securityDto!=null)
      {
        // this.securityDto = rec;
        console.log(this.securityDto);
        console.log(this.securityDto.max_pswd_length);
        this.enableTable=true;
      }

      else{
        Swal.fire({
          title:"No Unauthorized Records to Display!"
        })
      }
      
    });
  }

  onClickOfAuth() {
    console.log(this.loggedInUser);
    console.log(this.currentUser);
    console.log(this.securityDto.modified_by);
    if (this.currentUser == this.securityDto.modified_by) {
      Swal.fire(
        {
          title: "Maker cannot Authorize the Record."
        }
      )
    }
    else {
      console.log("this is for auth");
      this.securityDto.authorized_by=this.loggedInUser;
      this.securityDto.auth_status='A';
      console.log(this.loggedInuser, this.securityDto.authorized_by);
      this.securityPolicyService.onclickOfAuthOfSecurityPolicyRecord(this.securityDto).subscribe(authResp => {
        console.log("authResp", authResp);   
        this.ref.markForCheck();
        Swal.fire(
          {
            title: "Record is Authorized "
          }
        );
        this.router.navigateByUrl("/securityPolicy");
        this.ref.markForCheck();
      })
    }
  }

  onCancelingTheRecord()
  {
    this.router.navigateByUrl('/securityPolicy');
  }
}

