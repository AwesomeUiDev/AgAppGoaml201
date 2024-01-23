import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { User } from '../user';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Dept } from '../Dept';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  title = "Create User";
  roleInfo=[];
  roleInfoString:string;
  response:any;
  validationResponse:any;
  userRoles:string[];
  deptList=[];
  dept:string;
  roleType:string;
  dropdownList=[];
  dropdownSettings={};
  selected=[];
  join:string;

 // headers: { 'Content-Type': 'application/x-www-form-urlencoded' };
  disabledButtonFlag:boolean;
  constructor(private apiService : APIService) { }

  ngOnInit() {

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

   
  }

  public getRoleType(roleType)
  {
    this.roleType = roleType;
    this.apiService.getRolesForUserService(roleType).subscribe(response=>{
      this.userRoles = response;
      console.log(this.userRoles);
    });
  }

  // getRoleType(roleType)
  // {
  //   this.getRolesForUser(roleType);
  // }

  //service
  getRoleInfoForMisUpload(roleId:string)
 {
   console.log(roleId);
  this.apiService.getRoleInfoService(roleId).subscribe(resp=>{
    this.roleInfo = resp;
    // for (let i = 0; i < this.roleInfo.length; i++) {
     // this.roleInfoString = this.roleInfo.join();
      console.log(this.roleInfo);
    if(this.roleInfo.indexOf("FUM") > -1 ||this.roleInfo.indexOf("FDM") > -1)
      this.fetchDepartment();
  });
 }

 fetchDepartment()
  {
  
    this.apiService.getdeptListService().subscribe(event=>{
      this.deptList=event;
      console.log(this.deptList);

     


     // for (let i = 0; i < this.deptList.length; i++) {
        // const element = array[i];
         
       
      this.dropdownList = [
         { item_id: 1, item_text: this.deptList[0] },
         { item_id: 2, item_text: this.deptList[1] },
         { item_id: 3, item_text: this.deptList[2] },
         { item_id: 4, item_text: this.deptList[3] },
         { item_id: 5, item_text: this.deptList[4] },
         { item_id: 6, item_text: this.deptList[5] },
         { item_id: 7, item_text: this.deptList[6] },
         { item_id: 8, item_text: this.deptList[7] },
         { item_id: 9, item_text: this.deptList[8] },
         { item_id: 10, item_text: this.deptList[9] },
         { item_id: 11, item_text: this.deptList[10] },
         { item_id: 12, item_text: this.deptList[11] },
         { item_id: 13, item_text: this.deptList[12] },
         { item_id: 14, item_text: this.deptList[13] },
         { item_id: 15, item_text: this.deptList[14] },
         { item_id: 16, item_text: this.deptList[15] },
         { item_id: 17, item_text: this.deptList[16] },
         { item_id: 18, item_text: this.deptList[17] },
         { item_id: 19, item_text: this.deptList[18] },
         { item_id: 20, item_text: this.deptList[19] },
         { item_id: 21, item_text: this.deptList[20] },
         { item_id: 22, item_text: this.deptList[21] },
         { item_id: 23, item_text: this.deptList[22] },
         { item_id: 24, item_text: this.deptList[23] },
         { item_id: 25, item_text: this.deptList[24] },
         { item_id: 26, item_text: this.deptList[25] },
         { item_id: 27, item_text: this.deptList[26] },
         { item_id: 28, item_text: this.deptList[27] },
         { item_id: 29, item_text: this.deptList[28] },
         { item_id: 30, item_text: this.deptList[29] }
         
       
       ]; //}
      // console.log(this.dropdownList);
    // }
     console.log(this.dropdownList);
  
    });
  }

  onItemSelect (item:any) {
    console.log("before adding "+this.selected);
     this.selected.push(item.item_text);
     //this.columnId.push(item.item_id);
     //console.log(this.columnId);
    //  this.selectedId.push(item.item_id);
     //console.log(this.selected);
     console.log("after adding "+this.selected);
    // this.getFields(new FormModel(item.item_text));
  }
  onSelectAll (items: any) {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      this.selected.push(element.item_text);
    }
    console.log(this.selected);
  }
  onItemDeSelect (items: any) {
   
     console.log("before removing "+this.selected);
    //  this.selected.filter(remove => remove.items.item_text !== items.item_id);
   var index = this.selected.indexOf(items.item_text);
   console.log(index);
     this.selected.splice(index,1);
     //this.columnId.splice(index,1);
     //console.log(this.columnId);
    //  this.selected.pop();
    //console.log(this.selected);
     console.log("after removing "+this.selected);
  }

  getDept(dept)
  {
    console.log(dept);
    this.dept = dept;

  }

  assignDepartment(userId,roleId,dept)
  {
    //this.join = this.selected.join(",");
    //console.log(this.join);
    var deptObject=new Dept();
    deptObject.userId=userId;
    deptObject.roleId=roleId;
    deptObject.dept=dept;
    console.log("deptObject");
    console.log(deptObject);
    if(!this.join || this.join == "")
    {
      this.validationResponse = "Select Department!";
      this.response = null;
  }
  else
  {
      this.apiService.assignDepartmentService(deptObject).subscribe(res=>{
        console.log(res);
        });
  }
  }




  public createUser(newUser:User)
  {
    if(!newUser.userId)
    {
      this.validationResponse = "Enter User Id!";
      this.response = null;
    }
    else if(!newUser.userName)
    {
      this.validationResponse = "Enter Username!";
      this.response = null;
    }
    else if(!newUser.userType)
    {
      this.validationResponse = "Select User Type!";
      this.response = null;
    }
    else if(!newUser.roleId)
    {
      this.validationResponse = "Select Role Id";
      this.response = null;
    }
    else if(!newUser.brnCode)
    {
      this.validationResponse = "Enter Branch Code!";
      this.response = null;
    }
    else if(!newUser.emailId)
    {
      this.validationResponse = "Enter Email Id!";
      this.response = null;
    }
    else if(!newUser.mobileNo)
    {
      this.validationResponse = "Enter Mobile No!";
      this.response = null;
    }
    // else if(newUser.mobileNo.length>14 || 6>=newUser.mobileNo.length)
    // {
    //   this.validationResponse = "Enter Valid Mobile No!";
    //   this.response = null;
    // }
    else
    {
      console.log("TESTTINGSSADNKLAJDL");
      
      this.join = this.selected.join(",");
      console.log(this.join);

      if(this.join || this.roleInfo.indexOf("FUM") == -1 && this.roleInfo.indexOf("FDM") == -1)
      {
      this.assignDepartment(newUser.userId,newUser.roleId,this.join);
    console.log(newUser);
    var userId = localStorage.getItem("userIdForChangePassword");
    newUser.modifyBy = userId;
    //this.apiService.createUserService(newUser);
    this.apiService.createUserService(newUser).subscribe( data => {

      this.validationResponse = data;
      if(this.validationResponse == true)
      {
        this.response = "User Created Successfully!";
        this.validationResponse = null;
        this.disabledButtonFlag = true;
      }
      if(this.validationResponse == false)
      {
        this.response = null;
        this.validationResponse = "UserId Already Exists!";
        this.disabledButtonFlag = false;
      }
      console.log(this.response);
      //alert("User created successfully.");
      console.log(newUser);
    },error=>{
      if(HttpErrorResponse)
      {
        this.response = null;
        this.validationResponse = "Save Failed!";
        this.disabledButtonFlag = false;
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

  reset()
  {
    this.response = null;
    this.validationResponse = null;
    this.disabledButtonFlag = false;
    var index;
    this.selected.splice(index);
  }

}
