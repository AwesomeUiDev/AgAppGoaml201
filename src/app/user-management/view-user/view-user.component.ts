import { Component, OnInit, Output, Input, EventEmitter, Injectable, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { APIService } from '../../api.service';
import { Observable } from 'rxjs';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { UserHomeComponent } from 'src/app/user-home/user-home.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  users :User[];
  @Output()userRoles:string[];
  response:any;
  validationResponse:any;
  userObject:User;
  @Output()
  modifyUserObject:User;
  status = false;
  roleInfo=[];
  userId:string;
 
  // @Output()
  // public myEvent:EventEmitter<any> = new EventEmitter();

  // @Output()
  // change: EventEmitter<User> = new EventEmitter<User>();

  // @ViewChildren(UserHomeComponent) childrenComponent: QueryList<UserHomeComponent>;
  
  constructor(private apiService: APIService, private router:Router) {

    
   }

  // fireMyEvent(event)
  // {
  //   this.myEvent.next(this.modifyUserObject);
  // }

  // usersList: Array<Object> = [{
  //   userID: "u1",
  //   userName: "user1",
  //   emailId: "u1@abc.com",
  //   status: "active",
  //   version: 1,
  //   edit: "Edit",
  //   delete: "Delete"
  // },

  // {
  //   userID: "u2",
  //   userName: "user2",
  //   emailId: "u2@abc.com",
  //   status: "active",
  //   version: 2,
  //   edit: "Edit",
  //   delete: "Delete"
  // },

  // {
  //   userID: "u3",
  //   userName: "user3",
  //   emailId: "u3@abc.com",
  //   status: "active",
  //   version: 1,
  //   edit: "Edit",
  //   delete: "Delete"
  // }];

  ngOnInit() {
   var value= localStorage.getItem("roleInfo");
   this.userId = localStorage.getItem("userIdForChangePassword");

   console.log(value);
    this.getRolesForUser();

    this.roleInfo = value.split(",");
    console.log(this.roleInfo);
   
    // this.getUsers();
  }
  // ngAfterViewInit()
  // {
  //   this.childrenComponent.changes.subscribe((comps: QueryList<UserHomeComponent>) =>
  //   {
  //     // Now you can access to the child component
  //     console.log(this.childrenComponent.toString);
  //   });
  // }

  fetchBy(fetchUser:User)
  {
    console.log(fetchUser);
    this.userObject = fetchUser;
    this.apiService.getUsers(fetchUser).subscribe(response=>{
      this.users=response;
      console.log("Users");
      console.log(this.users);

    });//.subscribe(data=> {console.log(data)});
  }

  public getRolesForUser()
  {
    this.apiService.getRolesForViewPageService().subscribe(response=>{
      this.userRoles = response;
      console.log(this.userRoles);
    });
  }

  deleteUser(i)
  {
    var userObject = this.users[i];
    var userRef = userObject.userRef;
    var userId = userObject.userId;
    var authStatus = userObject.authStatus;
    console.log(userRef);
    if(confirm("Are you sure to delete "+userId+"?")) {
     
      if(authStatus == 'I')
      {
      this.apiService.deleteUserService(userRef).subscribe(response=>{
        this.response = response;
        if(this.response == true)
        {
          this.response = "Deleted Record!";
          this.validationResponse = null;
        }
        this.fetchBy(this.userObject);
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

  getUser(i)
  {
    var userObject = this.users[i];
    console.log(userObject.userPwd);
    this.modifyUserObject = userObject;
    console.log("modifyUser");
    console.log(this.modifyUserObject);
    //this.myEvent.emit(this.modifyUserObject);
    // this.change.emit(this.modifyUserObject);

    let navigationExtras: NavigationExtras = {
      queryParams: {
          //"modifyUserObject": this.modifyUserObject
          'userRef':this.modifyUserObject.userRef,
          'userId': this.modifyUserObject.userId,
          'userName': this.modifyUserObject.userName,
          'roleId': this.modifyUserObject.roleId,
          'brnCode': this.modifyUserObject.brnCode,
          'emailId': this.modifyUserObject.emailId,
          'mobileNo': this.modifyUserObject.mobileNo,
          'activeStatus':this.modifyUserObject.activeStatus,
          'userType':this.modifyUserObject.userType,
          'userPwd':this.modifyUserObject.userPwd,
          'authStatus':this.modifyUserObject.authStatus,
          'modifyBy':this.modifyUserObject.modifyBy,
          'authBy':this.modifyUserObject.authBy,
          'versionNo':this.modifyUserObject.versionNo,
          'lastLgnTime':this.modifyUserObject.lastLgnTime,
          'authDate':this.modifyUserObject.authDate
          
          // userName: string;
          // userType: string;
          // roleId: string;
          // emailId: string;
          // brnCode: string;
          // mobileNo:string;
          // authStatus:string;
      
      }
    };
    this.router.navigate(['/modifyUser'], navigationExtras);
  }

  //service
  // public getUsers() {
  //    this.users=this.apiService.getUsers();
  //   console.log(this.users);
  //   return this.users;
  // }

  authorizeUser(i)
  {
    var userObject = this.users[i];
    userObject.userId = this.userObject.userId;
    userObject.emailId = this.userObject.emailId;
    userObject.mobileNo = this.userObject.mobileNo;
    userObject.userName = this.userObject.userName;
    userObject.roleId = this.userObject.roleId;
    userObject.brnCode = this.userObject.brnCode;
    userObject.authStatus = this.userObject.authStatus;
    userObject.authBy = this.userId;
    console.log(userObject.modifyBy);
    console.log(userObject);
    this.apiService.authorizeUserService(userObject).subscribe(resp=>{
      this.users=resp;
    });
  }

}
