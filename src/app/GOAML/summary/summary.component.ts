import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
// import { User } from '../user/user';
// import { UserService } from '../user/user.service';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/user-management/user';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  sendUserId$: BehaviorSubject<any> = new BehaviorSubject<any>("");
  @ViewChild(MatPaginator) paginator: MatPaginator;
  button1: boolean;
  list:any;
  userdata2: any;
  currentUser: string;
  userId: string;
  displayedColumns: string[] = [ 'userId','userName', 'emailId', 'roleId', 'phoneNumber','authStatus','status'];
  dataSource: any;
 
  allUsers: Array<User>;

  // constructor(private userService: UserService,
  constructor( private  userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      // this.button1 = false;
      // this.button1 = true;
    });
  }
  // list: Array<User>;
  // user: User;
  // user1: User = new User();
  userIdData: any;
  // userdata2: User;
  create:any;
  update:any;
  ngOnInit() {
    this.onCLickOfSummary();
    // this.currentUser = localStorage.getItem("userIdForChangePassword")
    // this.userId=localStorage.getItem("mdauser");
    // console.log("this.currentUser  ::",this.currentUser+"this.userId   :",this.userId)
   
  }
  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onCLickOfSummary() {
    console.log("on click of summary");
    this.userService.onClickOfSummary().subscribe(resp1 => {
      console.log(resp1)
      // console.log(resp1);
      this.list = resp1;
      // this.dataSource=resp1;
      this.dataSource = new MatTableDataSource<User>(this.list );

      setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      }, 300);
      //this.list = resp;
      // console.log("this is list!");
    });
  }


  // getByUserId(userId: string) {
  //   console.log("user=====================" + userId);
  //   this.userIdData = userId;
  //   // console.log(resp1);
  //   for (let entry of this.list) {
  //     console.log("Looping : " + entry.userId);
  //     if (this.userIdData === entry.userId) {
  //       // this.userdata2 = entry;
  //     } else {
  //       console.log("no data foubnd !")
  //     }
  //   }

    getByUserId(userId: string) {
      console.log("user=====================" + userId);
      this.userIdData = userId;
      //console.log(resp1);
      for (let entry of this.list) {
        console.log("Looping : " + entry.userId);
        if (this.userIdData === entry.userId) {
          this.userdata2 = entry;
        } else {
          console.log("no data foubnd !")
        }
      }
      console.log(this.userdata2);
      this.getUser();
     
    }

    getUser() {

      this.userdata2.buttonupdate=true;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'userRef':this.userdata2.userRef,
          'userId': this.userdata2.userId,
          'userName': this.userdata2.userName,
          'emailId': this.userdata2.emailId,
          'password': this.userdata2.password,
          'phoneNumber': this.userdata2.phoneNumber,
          'roleId': this.userdata2.roleId,
          'logoutTime': this.userdata2.logoutTime,
          'sendNotification': this.userdata2.sendNotification,
          'status':this.userdata2.status,
          'creatorId':this.userdata2.creatorId,
          'creatorDtStamp':this.userdata2.creatorDtStamp,
          'versionNo':this.userdata2.versionNo,
          'verifierId':this.userdata2.verifierId,
          'verifierDtStamp':this.userdata2.verifierDtStamp,
          'authStatus':this.userdata2.authStatus,
          // this.userdata2.sendNotificationbuttonupdate=true;
          'buttonupdate':this.userdata2.buttonupdate,
          'activeStatus':this.userdata2.activeStatus
  
  
        }
      };
      console.log("User Id : " + this.userdata2)
      // mode: 'create'
      this.router.navigate(['/user'], navigationExtras);
    }
    
    // console.log(this.userdata2);
    // this.getUser();
    // this.userService.getUserById(userId)
    //   .subscribe((res) => {
    //     this.user = res;
    //     console.log("User id to update : " + this.user.userId);
    //     this.onCLickOfSummary();
    //     this.sendUserId$.next(userId);
    //     // this.router.navigate(['user']);
    //   }
    //   );
  }


  // getUser() {


    // this.userService.onClickOfSummary().subscribe(resp1 => {
    //   console.log(resp1)
    //   this.list = resp1;
    //   console.log(this.list);
    //   for (let entry of resp1) {
    //     console.log(entry);
    //   }
    // });
// 
    // if (i) {
    //   this.user1 = this.list[i];
    // }
    // console.log(this.list);
    // this.userdata2.buttonupdate=true;
    // const navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     'userId': this.userdata2.userId,
    //     'userName': this.userdata2.userName,
    //     'emailId': this.userdata2.emailId,
    //     'password': this.userdata2.password,
    //     'phoneNumber': this.userdata2.phoneNumber,
    //     'roles': this.userdata2.roles,
    //     'logoutTime': this.userdata2.logoutTime,
    //     'sendNotification': this.userdata2.sendNotification,
    //     // this.userdata2.sendNotificationbuttonupdate=true;
    //     'buttonupdate':this.userdata2.buttonupdate


    //   }
    // };
    // console.log("User Id : " + this.userdata2)
    // this.router.navigate(['/user'], navigationExtras);
  // }
  
// }
