import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../role';
import { HttpErrorResponse } from '@angular/common/http';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-modify-role',
  templateUrl: './modify-role.component.html',
  styleUrls: ['./modify-role.component.css']
})
export class ModifyRoleComponent implements OnInit {

  status:boolean;
  funcId=[];
  roleObject=new Role();
  response:any;
  validationResponse:any;
  selected = [];
  disabledButtonFlag:boolean;
  userId:string;
 // roles = [];
  // @Input()

  ngOnInit() {
    this.userId = localStorage.getItem("userIdForChangePassword");
  }

  constructor(private route: ActivatedRoute,private apiService: APIService,private router: Router) {
    this.route.queryParams.subscribe(params => {
       // this.roleObject. = params["firstname"];
        this.roleObject.roleRef = params["roleRef"];
        this.roleObject.roleId= params["roleId"];
        this.roleObject.roleDesc= params["roleDesc"];
        this.roleObject.roleType= params["roleType"];
        this.roleObject.authStatus= params["authStatus"];
        this.roleObject.versionNo= params["versionNo"];
        this.roleObject.roleInfo= params["roleInfo"];
        this.roleObject.activeStatus=params["activeStatus"];
        this.roleObject.modifyBy=params["modifyBy"];
        this.roleObject.authBy=params["authBy"];
        this.roleObject.authDate=params["authDate"];

        console.log("recived");
        this.selected.push(this.roleObject.roleType);
      console.log(this.roleObject);
      this.funcId=this.roleObject.roleInfo.split(",");
      //this.roles = this.funcId;
      console.log(this.funcId);
    }); 
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
          if(this.funcId.indexOf("UMMU") > -1)
          this.funcId.splice(localIndex,1);
        }
        if(fid == 'RMVR')
        {
          var localIndex =this.funcId.indexOf("RMMR");
          if(this.funcId.indexOf("RMMR") > -1)
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

  modifyRole(newRole: Role)
  {
    console.log("modify");
    console.log(newRole);
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

    this.apiService.moldifyRoleService(newRole).subscribe(response=>{
      this.status = response;
      console.log(this.status);
      if(this.status==true)
      {
        this.response = "Update Successful!";
        this.validationResponse = null;
        this.disabledButtonFlag = true;
      }
      if(this.status == false)
      {
        this.validationResponse = "Update Failed!";
        this.response = null;
        this.disabledButtonFlag = false;
      }
    },error=>{
      if(HttpErrorResponse)
      {
        this.validationResponse = "Update Failed!";
        this.response = null;
      }
    });
    console.log(newRole);
  }
  }

  // public storeValue(value:any)
  // {
  //   this.selected=value;
  //   var index = 0;
  //   this.funcId.splice(index);
  //   console.log(this.selected);
  // }
  reset()
  {
    this.disabledButtonFlag = false;
    this.validationResponse = null;
    this.response = null;
    this.status = null;
    var index = 0;
    this.funcId.splice(index);
    this.router.navigate(["viewRole"]);
    
  }
 
}
