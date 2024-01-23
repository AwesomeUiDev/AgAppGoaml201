import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../role';
import { APIService } from '../../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { UserHomeComponent } from '../../user-home/user-home.component';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit {
  roles: Role[];
  constructor(private apiService: APIService,private router:Router) { }
  userRoles:string[];
  response:any;
  validationResponse:any;
  roleObject:Role;
  status:any;
  roleInfo=[];
  userId:string;
  

  ngOnInit() {
    var value= localStorage.getItem("roleInfo");
    this.userId = localStorage.getItem("userIdForChangePassword");
    this.getRoleId();
    this.roleInfo = value.split(",");
    console.log(this.roleInfo);
    
  }

  //SERVICE
  public getRoles(fetchRole : Role) {
    console.log(fetchRole);
    this.roleObject = fetchRole;
    this.apiService.getRoles(fetchRole).subscribe(resp=>{
      this.roles = resp;
      console.log("fetching roles");
      console.log(this.roles);
      

    });

  }

  getRoleId() {
    this.apiService.getRolesForViewPageService().subscribe(response=>
      {
        this.userRoles = response;
        console.log(this.userRoles);
      });

  }

  deleteRole(i)
  {
    var roleObject = this.roles[i];
    var roleRef = roleObject.roleRef;
    var roleId = roleObject.roleId;
    var authStatus = roleObject.authStatus;
    console.log(roleRef);
    if(confirm("Are you sure to delete "+roleId+"?")) {
     
      if(authStatus == 'I')
      {
      this.apiService.deleteRoleService(roleRef).subscribe(response=>{
        this.status = response;
        if(this.status == true)
        {
          this.response = "Deleted Record!";
          this.validationResponse = null;
        }
        this.getRoles(this.roleObject);
      },error=>{
        if(HttpErrorResponse)
        {
          this.validationResponse = "Delete Failed!";
          this.response = null;
        }
      });
    }
    else
    {
      alert("Authorized Records cannot be Deleted!");
    }
  }
  }

  getModifyRole(i)
  {
    var roleObject = this.roles[i];
   // var roleRef = roleObject.roleRef;
    //var roleId = roleObject.roleId;
    console.log(roleObject);
   
    let navigationExtras: NavigationExtras = {
        queryParams: {
              //"firstname": "Nic"
              "roleRef":roleObject.roleRef,
              "roleId": roleObject.roleId,
              "roleDesc": roleObject.roleDesc,
              "roleType": roleObject.roleType,
              "authStatus":roleObject.authStatus,
              "activeStatus":roleObject.activeStatus,
              "versionNo":roleObject.versionNo,
              "roleInfo":roleObject.roleInfo,
              "modifyBy":roleObject.modifyBy,
              "authBy":roleObject.authBy,
              "authDate":roleObject.authDate
          }
      };
      this.router.navigate(["modifyRole"], navigationExtras);
    }

    authorizeRole(i)
  {
    var roleObject = this.roles[i];
    roleObject.roleId = this.roleObject.roleId;
    roleObject.roleDesc = this.roleObject.roleDesc;
    roleObject.authStatus = this.roleObject.authStatus;
    roleObject.authBy = this.userId;
    console.log(roleObject);
    console.log(this.roleObject);
    this.apiService.authorizeRoleService(roleObject).subscribe(resp=>{
      this.roles=resp;
    });
  }
  
}
