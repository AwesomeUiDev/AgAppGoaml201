import { Component, OnInit, Input, EventEmitter, Output, ComponentRef } from '@angular/core';
import { APIService } from 'src/app/api.service';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewUserComponent } from '../view-user/view-user.component';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Dept } from '../Dept';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {


  response:any;
  validationResponse:any;
  users:User[];
  @Input()
  modifyUserObject = new User();
  userRoles:string[];
  disabledButtonFlag:boolean;
  userId:string;
  roleInfo=[];
  deptList=[];
  deptObject : Dept;
  userDept: string;
  dropdown: boolean=true;
  mergedArray=[];

  columnId=[];
  selected=[];
  dropdownList = [];
  selectedItems:string[];
  dropdownSettings = {};

  constructor(private apiService:APIService,private route:ActivatedRoute,private router:Router) {

    this.route.queryParams.subscribe(params => {

      this.modifyUserObject.userRef = params["userRef"];
      this.modifyUserObject.userId = params["userId"];
      this.modifyUserObject.userName = params["userName"];
      this.modifyUserObject.roleId = params["roleId"];
      this.modifyUserObject.brnCode = params["brnCode"];
      this.modifyUserObject.emailId = params["emailId"];
      this.modifyUserObject.mobileNo = params["mobileNo"];
      this.modifyUserObject.activeStatus = params["activeStatus"];
      this.modifyUserObject.userType = params["userType"];
      this.modifyUserObject.userPwd = params["userPwd"];
      this.modifyUserObject.authStatus = params["authStatus"];
      this.modifyUserObject.modifyBy = params["modifyBy"];
      this.modifyUserObject.authBy = params["authBy"];
      this.modifyUserObject.authDate = params["authDate"];
      this.modifyUserObject.versionNo = params["versionNo"];
      this.modifyUserObject.lastLgnTime = params["lastLgnTime"];
      console.log("recived");
      console.log(this.modifyUserObject);
      if(this.modifyUserObject)
      {
        this.getRolesForUser(this.modifyUserObject.userType);
      }
    
  });
  
   }


  //  fireMyEvent(event)
  //  {
  //   console.log(event);
  //   this.userObject = event;
  //  }

  ngOnInit()
  {
    this.fetchDepartment();
   
     
     
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: true,
        enableCheckAll:false
      };
    

    this.userId = localStorage.getItem("userIdForChangePassword");
    this.apiService.getRoleInfoService(this.modifyUserObject.roleId).subscribe(resp=>{
      this.roleInfo = resp;
      // for (let i = 0; i < this.roleInfo.length; i++) {
       // this.roleInfoString = this.roleInfo.join();
        console.log(this.roleInfo);
      if(this.roleInfo.indexOf("FUM") > -1 || this.roleInfo.indexOf("FDM") > -1)
      {
        this.apiService.getUserDeptService(this.modifyUserObject.userId).subscribe(res=>{
          this.deptObject=res;
          
          
          console.log(this.deptObject);
          if(this.deptObject)
          {
          this.userDept=this.deptObject.dept;
          console.log(this.userDept);
          
          this.selectedItems=this.userDept.split(",");
          console.log(this.selectedItems.length);
          }
          
        });
      }
    });
  }
  onItemSelect (item:any) {
    console.log("before adding "+this.selected);
     //this.selected.push(item.item_text);
     //this.columnId.push(item.item_id);
     //console.log(this.columnId);
    //  this.selectedId.push(item.item_id);
     //console.log(this.selected);
    
     
     console.log("after adding "+this.selected);
    // this.getFields(new FormModel(item.item_text));
  }
  onSelectAll (items: any) {
    // for (let index = 0; index < items.length; index++) {
    //   const element = items[index];
    //   this.selected.push(element.item_text);
    // }
    // console.log(this.selected);
  }
  onItemDeSelect (items: any) {
   
  //    console.log("before removing "+this.selected);
  //   //  this.selected.filter(remove => remove.items.item_text !== items.item_id);
  //  var index = this.selected.indexOf(items.item_text);
  //  console.log(index);
  //    this.selected.splice(index,1);
  //    this.columnId.splice(index,1);
  //    console.log(this.columnId);
    //  this.selected.pop();
    //console.log(this.selected);
     console.log("after removing "+this.selected);
  }

  getRoleInfoForMisUpload(roleId:string)
 {
   console.log(roleId);
  this.apiService.getRoleInfoService(roleId).subscribe(resp=>{
    this.roleInfo = resp;
    // for (let i = 0; i < this.roleInfo.length; i++) {
     // this.roleInfoString = this.roleInfo.join();
      console.log(this.roleInfo);
    if(this.roleInfo.indexOf("FUM") > -1 || this.roleInfo.indexOf("FDM") > -1)
    {
      this.fetchDepartment();
    }
    else{
      this.userDept=null;
      //this.apiService.deleteDeptService(this.modifyUserObject.userId);
    }
      
  });
 }
  
 
  fetchDepartment()
   {
    //this.userDept=null;
     this.apiService.getdeptListService().subscribe(event=>{
       this.deptList=event;
       console.log(this.deptList);

       


      //this.dropdownList.push(this.selectedItems);
      //console.log(this.dropdownList);
      //  this.dropdownList = [
        
      //   { item_id: 1, item_text: this.deptList[0] },
      //   { item_id: 2, item_text: this.deptList[1] },
      //   { item_id: 3, item_text: this.deptList[2] },
      //   { item_id: 4, item_text: this.deptList[3] },
      //   { item_id: 5, item_text: this.deptList[4] },
      //   { item_id: 6, item_text: this.deptList[5] },
      //   { item_id: 7, item_text: this.deptList[6] },
      //   { item_id: 8, item_text: this.deptList[7] },
      //   { item_id: 9, item_text: this.deptList[8] },
      //   { item_id: 10, item_text: this.deptList[9] },
      //   { item_id: 11, item_text: this.deptList[10] },
      //   { item_id: 12, item_text: this.deptList[11] },
      //   { item_id: 13, item_text: this.deptList[12] },
      //   { item_id: 14, item_text: this.deptList[13] },
      //   { item_id: 15, item_text: this.deptList[14] },
      //   { item_id: 16, item_text: this.deptList[15] },
      //   { item_id: 17, item_text: this.deptList[16] },
      //   { item_id: 18, item_text: this.deptList[17] },
      //   { item_id: 19, item_text: this.deptList[18] },
      //   { item_id: 20, item_text: this.deptList[19] },
     
      // ];

      this.selected.push(this.deptList);
      console.log(this.selected);
   
     });
     console.log(this.dropdownList);
   }
 
   getDept(dept)
   {
     this.dropdown=false;
     console.log(dept);
     this.userDept = dept;
 
   }
 
   assignDepartment(userId,roleId,join)
   {
     var deptObject=new Dept();
    //var join = this.selected.join(",");
    //console.log(join);
     deptObject.userId=userId;
     deptObject.roleId=roleId;
     deptObject.dept=join;
     console.log("deptObject");
     console.log(deptObject);
     this.apiService.assignDepartmentService(deptObject).subscribe(res=>{
       console.log(res);
     });
     
   }

  public modifyUser(modifyUser:User)
  {
    //console.log(this.userObj);
    // if(!newUser.userId)
    // {
    //   this.validationResponse = "Enter User Id!";
    //   this.response = null;
    // }
    modifyUser.modifyBy = this.userId;
    if(!modifyUser.userName)
    {
      this.validationResponse = "Enter Username!";
      this.response = null;
    }
    else if(!modifyUser.roleId || modifyUser.roleId == 'Select')
    {
      this.validationResponse = "Select Role Id";
      this.response = null;
    }
    else if(!modifyUser.brnCode)
    {
      this.validationResponse = "Enter Branch Code!";
      this.response = null;
    }
    else if(!modifyUser.emailId)
    {
      this.validationResponse = "Enter Email Id!";
      this.response = null;
    }
    else if(!modifyUser.mobileNo)
    {
      this.validationResponse = "Enter Mobile No!";
      this.response = null;
    }
    else
    {
      if(this.selectedItems!=undefined)
      {
        var join = this.selectedItems.join(",");
      }
      console.log(this.userDept);
      console.log(join);
      if(join || this.roleInfo.indexOf("FUM") == -1 &&  this.roleInfo.indexOf("FDM") == -1)
      {
      this.assignDepartment(this.modifyUserObject.userId,this.modifyUserObject.roleId,join);
      //else
      //this.apiService.deleteDeptService(this.modifyUserObject.userId).subscribe();
    console.log(modifyUser);
    //this.apiService.createUserService(newUser);
   
    console.log(modifyUser);
    this.apiService.modifyUserService(modifyUser).subscribe( data => {

      this.validationResponse = data;
      if(this.validationResponse == true)
      {
        this.response = "User Updated Successfully!";
        this.disabledButtonFlag = true;
        this.validationResponse = null;
      }
      if(this.validationResponse == false)
      {
        this.response = null;
        this.disabledButtonFlag = false;
        this.validationResponse = "Update Failed!";
      }
      console.log(this.response);
      //alert("User created successfully.");
      console.log(modifyUser);
    },error=>{
      if(HttpErrorResponse)
      {
        this.response = null;
        this.validationResponse = "Update Failed!";
      }
    });
  }
  else
  {
    this.validationResponse = "Select Department!";
    this.response = null;
  }
}
  }

  public getRolesForUser(roleType)
  {
    this.apiService.getRolesForUserService(roleType).subscribe(response=>{
      this.userRoles = response;
      console.log(this.userRoles);
    });
  }

  reset()
  {
    this.disabledButtonFlag = false;
    this.response = null;
    this.validationResponse = null;
   this. modifyUserObject = new User();

   this.selectedItems=null;
    var index;
    this.selected.splice(index);
    this.columnId.splice(index);
  
  this.router.navigate(['/viewUser']);
  }

  ngOnDestroy()
  {
    this.disabledButtonFlag = false;
    this. modifyUserObject = null;
    this.response = null;
    this.validationResponse = null; 
  }

}
