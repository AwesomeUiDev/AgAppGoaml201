import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Message } from './message';
import {MatPaginator} from '@angular/material/paginator';
import { MessageService } from './message.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import Swal from 'sweetalert2';
import { RoleService } from 'src/app/roles1/roles.service';
import { permissionsLabels } from 'src/app/roles1/models/fmosNewRolePermissions';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  displayedColumns: string[] = ['msgSubject', 'msgFrom', 'msgDate'];
  dataSource: any;
  mess:Message[];
  msgs:any;
  // msg1:any;
  // msg2:any;
  countForMessage:any;
  userId:any;
  role:any;
  msgs1=new Array<Message>();
  msgs2=new Array<Message>();
  msgs3:any;
  msgId1:any;
  roleCodes = new permissionsLabels();
  constructor(private messageService:MessageService, private roleService: RoleService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator
  ngOnInit() {
    this.userId=localStorage.getItem('userId');
    this.role=localStorage.getItem('roleForUser');
      this.newRolePermissions();
      this.roleService.screenLabelList.subscribe(message => this.roleCodes = message);
      setTimeout(() => {
        this.getMessages();
        }, 2000);
    
  }


  newRolePermissions()
  {
  this.roleService.fetchScreenPermissions('Message');
  }
  
  @Output() getEvent = new EventEmitter();
  getMessages(): void {
    this.messageService.getAllMessages()
      .subscribe((msgs) => {
          this.msgs = msgs,
         
           console.log(this.msgs);
          
           for (let index = 0; index < this.msgs.length; index++) {
              if(( this.roleCodes.auth)&& this.msgs[index].msgStatus=="U" && this.msgs[index].msgType=="G" ){
                console.log("if");
               this.msgs1.push(this.msgs[index]);
              }else if(this.roleCodes.view && this.msgs[index].msgStatus=="U" && this.msgs[index].msgType=="R" ){
                // (this.role=="A" || this.role== "V" ||this.role=="U" )
                console.log("if else");
                this.msgs2.push(this.msgs[index]);
          }
          }
          console.log(this.msgs1);
          console.log(this.msgs2);
           if(this.msgs1.length!==0){
            console.log("method call2");
            this.dataSource= new MatTableDataSource<Message>(this.msgs1);
                       this.dataSource.paginator = this.paginator;
           }else if(this.msgs2.length!==0){
             console.log("method call1");
            this.dataSource= new MatTableDataSource<Message>(this.msgs2);
                       this.dataSource.paginator = this.paginator;
           }
       })
  }
  getPopUp(msgId){
    console.log(this.msgs);
    console.log(msgId);
    // this.msgId1=msgId;
    if(this.role== "V"){
    this.messageService.getMessage(msgId).subscribe(msgs3 => {
      this.msgs3=msgs3;
      console.log(this.msgs3);
      Swal.fire(
        this.msgs3.message,
        // 'success'
      )
    } )
    }else{
      Swal.fire('No Permission !','Only Authorizer Can verify.');
    }  
    }




//           //  let count=0;
//           //  for (let index = 0; index < this.msgs.length; index++) {
//           //  if(this.msgs[index].msgStatus=="U") {
//           //         count++;
//           //      }
//           //     }
// // if(this.role=="A" || "V"){
// //   for (let index = 0; index < this.msgs.length; index++) {
// //     //const element = array[index];
// //    if(this.msgs[index].msgStatus=="U") {
// //       count++;
// //    }
// //   console.log("inside if");
// //   }
// //   console.log(count);
// // }else if(this.role=="U"){

// // }



//           //  for (let index = 0; index < this.msgs.length; index++) {
//           //    //const element = array[index];
//           //   if(this.msgs[index].msgStatus=="U") {
//           //      count++;
//           //   }
//           //   //console.log(count);
//           //  }
//           //  console.log(count);
//           //  this.countForMessage=count;
//             this.dataSource= new MatTableDataSource<Message>(this.msgs);
//             this.dataSource.paginator = this.paginator;
//   //       }
//   //       // (error) => console.log(error)
//   //     );
//    }

   //     }
}