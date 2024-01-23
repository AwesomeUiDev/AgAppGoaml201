import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { ExtsysClass } from '../extsys-class';
// import { ApiService } from 'src/app/api.service';
import { NavigationExtras, Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { APIService } from 'src/app/api.service';
import { RoleService } from 'src/app/roles1/roles.service';
import { permissionsLabels } from 'src/app/roles1/models/fmosNewRolePermissions';
// import { Roles } from 'src/app/roles/roles';
// import { RolesService } from 'src/app/roles.service';

@Component({
  selector: 'app-ext-sys-list',
  templateUrl: './ext-sys-list.component.html',
  styleUrls: ['./ext-sys-list.component.css']
})
export class ExtSysListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  extdata: Array<ExtsysClass>;
  roleObject: ExtsysClass;
  userRoles: string[];
  // roleCodes = new Roles();
  // allRoles: Array<Roles>;
  userRolesFromLogin: string;
  loggedInUser: string;
  displayedColumns: string[] = ['extSysName', 'extSysCode', 'serviceCode','processCode', 'recordStatus'];
  dataSource: any;
  pageSize: any;
  pageIndex: any;
  dataIndex: any;
  roleCodes = new permissionsLabels();

  @Input() userUpdate: ExtsysClass;
  // allRoles: Array<ExtsysClass>;
  @Output()
  modifyRoleObject: ExtsysClass;
  constructor(private extService: APIService, private router: Router,private roleService: RoleService) { }

  ngOnInit() {
    this.userRolesFromLogin = localStorage.getItem('userRolesFromLogin');
   // this.userRoles = this.userRolesFromLogin.split(',');
    this.loggedInUser = localStorage.getItem('userFromLogin');
   this.getExtSysList();

   setTimeout(() => {
    this.newRolePermissions();
    }, 2000);
    this.roleService.screenLabelList.subscribe(message => this.roleCodes = message);
    

  }
  newRolePermissions()
  {
  this.roleService.fetchScreenPermissions('External System Maintenance');
  }

  getExtSysList() {
    this.extService.getAllExtSys().subscribe(data => {
      console.log('extdata', data);
      this.extdata = data;
      // this.dataSource = data;
      this.dataSource = new MatTableDataSource<ExtsysClass>(this.extdata);
      this.dataSource.paginator = this.paginator;
      console.log(this.extdata);
      // this.allUsers.paginator = this.paginator;
    });
  }
  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // getExtSys(i: number) {
  getExtSys(i: number) {
    this.dataIndex = (this.pageIndex * this.pageSize) + i;
    var userObject;
    if (this.dataIndex > 4) {
      userObject = this.extdata[this.dataIndex];
      console.log(this.dataIndex);
      console.log('from dataIndex');
      //console.log(i);
    }
    else {
      console.log(i);
      userObject = this.extdata[i];
      console.log(userObject);
      console.log('from index');
    }

    this.modifyRoleObject = userObject;
    console.log('inside modify');
    console.log(this.modifyRoleObject);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        // 'userRef': this.modifyUserObject.userRef,
        'id': this.modifyRoleObject.id,
        'extSysCode': this.modifyRoleObject.extSysCode,
        'extSysName': this.modifyRoleObject.extSysName,
        'commChannel': this.modifyRoleObject.commChannel,
        'creatorDtStamp': this.modifyRoleObject.creatorDtStamp,
        'creatorId': this.modifyRoleObject.creatorId,
        'destination': this.modifyRoleObject.destination,
        'destinationTag': this.modifyRoleObject.destinationTag,
        'dtdFile': this.modifyRoleObject.dtdFile,
        'errDirectoryName': this.modifyRoleObject.errDirectoryName,
        'errQueueName': this.modifyRoleObject.errQueueName,
        'errSchemaName': this.modifyRoleObject.errSchemaName,
        'errXsltName': this.modifyRoleObject.errXsltName,
        'extSysTag': this.modifyRoleObject.extSysTag,
        'formatType': this.modifyRoleObject.formatType,
        'isDestNode': this.modifyRoleObject.isDestNode,
        'isExtSysNode': this.modifyRoleObject.isExtSysNode,
        'isModuleNode': this.modifyRoleObject.isModuleNode,
        'isProcessNode': this.modifyRoleObject.isProcessNode,
        'isServiceNode': this.modifyRoleObject.isServiceNode,
        'latestAmendNo': this.modifyRoleObject.latestAmendNo,
        'messageType': this.modifyRoleObject.messageType,
        'moduleCode': this.modifyRoleObject.moduleCode,
        'moduleTag': this.modifyRoleObject.moduleTag,
        'msgDuplication': this.modifyRoleObject.msgDuplication,
        'processCode': this.modifyRoleObject.processCode,
        'processTag': this.modifyRoleObject.processTag,
        'recordStatus': this.modifyRoleObject.recordStatus,
        'reqDirectoryName': this.modifyRoleObject.reqDirectoryName,
        'reqQueueName': this.modifyRoleObject.reqQueueName,
        'reqSchemaName': this.modifyRoleObject.reqSchemaName,
        'reqXsltName': this.modifyRoleObject.reqXsltName,
        'requestTag': this.modifyRoleObject.requestTag,
        'respDirectoryName': this.modifyRoleObject.respDirectoryName,
        'respQueueName': this.modifyRoleObject.respQueueName,
        'respSchemaName': this.modifyRoleObject.respSchemaName,
        'respXsltName': this.modifyRoleObject.respXsltName,
        'responseTag': this.modifyRoleObject.responseTag,
        'serviceCode': this.modifyRoleObject.serviceCode,
        'serviceTag': this.modifyRoleObject.serviceTag,
        'updatedAt': this.modifyRoleObject.updatedAt,
        'verifiedEver': this.modifyRoleObject.verifiedEver,
        'verifierDtStamp': this.modifyRoleObject.verifierDtStamp,
        'verifierId': this.modifyRoleObject.verifierId,
        'versionNo': this.modifyRoleObject.versionNo,
        'xsdFile': this.modifyRoleObject.xsdFile,
        'authStatus': this.modifyRoleObject.authStatus,
        'updatedBy': this.modifyRoleObject.updatedBy,
        'fristTimeAuth': this.modifyRoleObject.fristTimeAuth,
      }
    };

    this.router.navigate(['/updatexternalsystem'], navigationExtras);
  }


  onPaginateChange(event) {
    console.log(event);
    // console.log(this.pageSize);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    console.log(event.pageSize);
    console.log(event.pageIndex);
  }

}
