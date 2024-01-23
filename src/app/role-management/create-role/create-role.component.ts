import { Component, OnInit } from '@angular/core';
import { User } from '../../user-management/user';
import { Role } from '../role';
import { APIService } from '../../api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  selected:string;
  funcId=[];
  funcIdUser:any=[];
  response:any;
  validationResponse:any;
  status:boolean;
  disabledButtonFlag:boolean;
  userId:string;
  

  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userIdForChangePassword");
  }

  //service
  createRole(newRole: Role)
  {
   var roleId = newRole.roleId;
    var roleDesc = newRole.roleDesc;
    newRole.modifyBy = this.userId;
    if(!roleId)
    {
      this.validationResponse = "Enter Role Id!";
      this.response = null;
    }
    else if(!roleDesc)
    {
      this.validationResponse = "Enter Role Desc!";
      this.response = null;
    }
    else
    {

      newRole.roleInfo = "";
      for (let i = 0; i < this.funcId.length; i++) {
  
        if(i==0)
        {
          newRole.roleInfo = newRole.roleInfo+this.funcId[i];
        }
        else
        {
          newRole.roleInfo = newRole.roleInfo+","+this.funcId[i];
        }
        
          
      }

    this.apiService.createRole(newRole).subscribe(response=>{
      this.status = response;
      console.log(this.status);
      if(this.status==true)
      {
        this.response = "Role Created Successfully!";
        this.validationResponse = null;
        this.disabledButtonFlag = true;
      }
      if(this.status == false)
      {
        this.validationResponse = "RoleId Already Exists!";
        this.response = null;
        this.disabledButtonFlag = false;
      }
    },error=>{
      if(HttpErrorResponse)
      {
        this.validationResponse = "Save Failed!";
        this.response = null;
      }
    });
    console.log(newRole);
  }
  }

  public storeValue(value:any)
  {
    this.selected=value;
    var index = 0;
    this.funcId.splice(index);
    console.log(this.selected);
  }

  getFid(fid)
  {
    var status = false;
    var index;
    console.log(fid);

    for (let i = 0; i < this.funcId.length; i++) {
      if(this.funcId[i]==fid)
      {
      status = true;
      index = i;
      }
    }
  
      if(status == true)
      {
        if(fid == 'UMVU')
        {
          var localIndex =this.funcId.indexOf("UMMU");
          this.funcId.splice(localIndex,1);
        }
        if(fid == 'RMVR')
        {
          var localIndex =this.funcId.indexOf("RMMR");
          this.funcId.splice(localIndex,1);
        }
        this.funcId.splice(index,1);
        console.log("removed");
        console.log(this.funcId);
      }
      if(status == false)
      {
        this.funcId.push(fid);
        
        console.log("added");
        console.log(this.funcId);
      }
    
  }


  reset()
  {
    this.disabledButtonFlag = false;
    this.validationResponse = null;
    this.response = null;
    this.status = null;
    console.log(this.selected);


    
    this.selected = undefined;
    console.log(this.selected);

  }

}
