import { Component, OnInit, Input } from '@angular/core';
import {  APIService } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ExtsysClass } from '../extsys-class';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-extsys',
  templateUrl: './update-extsys.component.html',
  styleUrls: ['./update-extsys.component.css']
})
export class UpdateExtsysComponent implements OnInit {


  userRoles: string[];

  is_edit = true;
  is_edit1 = true;
  userRolesFromLogin: string;
  loggedInUser: string;
  validationResponse: any;
  updatedExtObject: any;
  editFunction: boolean;
  editFunction2: boolean;
  responseError: any;
  dataForm: any;
  poovar:any;
  @Input()
  modifyRoleObject = new ExtsysClass();
  constructor(private apiService: APIService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) {
    this.route.queryParams.subscribe(params => {

      // this.modifyUserObject.userRef = params["userRef"];
      this.modifyRoleObject.id = params['id'];
      this.modifyRoleObject.extSysCode = params['extSysCode'];
      this.modifyRoleObject.extSysName = params['extSysName'];
      this.modifyRoleObject.commChannel = params['commChannel'];
      this.modifyRoleObject.createdAt = params['createdAt'];
      this.modifyRoleObject.creatorDtStamp = params['creatorDtStamp'];
      this.modifyRoleObject.creatorId = params['creatorId'];
      this.modifyRoleObject.destination = params['destination'];
      this.modifyRoleObject.destinationTag = params['destinationTag'];
      this.modifyRoleObject.dtdFile = params['dtdFile'];
      this.modifyRoleObject.errDirectoryName = params['errDirectoryName'];
      this.modifyRoleObject.errQueueName = params['errQueueName'];
      this.modifyRoleObject.errSchemaName = params['errSchemaName'];
      this.modifyRoleObject.errXsltName = params['errXsltName'];
      this.modifyRoleObject.extSysCode = params['extSysCode'];
      this.modifyRoleObject.extSysName = params['extSysName'];
      this.modifyRoleObject.extSysTag = params['extSysTag'];
      this.modifyRoleObject.formatType = params['formatType'];
      this.modifyRoleObject.isDestNode = params['isDestNode'];
      this.modifyRoleObject.isExtSysNode = params['isExtSysNode'];
      this.modifyRoleObject.isModuleNode = params['isModuleNode'];
      this.modifyRoleObject.isProcessNode = params['isProcessNode'];
      this.modifyRoleObject.isServiceNode = params['isServiceNode'];
      this.modifyRoleObject.latestAmendNo = params['latestAmendNo'];
      this.modifyRoleObject.messageType = params['messageType'];
      this.modifyRoleObject.moduleCode = params['moduleCode'];
      this.modifyRoleObject.moduleTag = params['moduleTag'];
      this.modifyRoleObject.msgDuplication = params['msgDuplication'];
      this.modifyRoleObject.processCode = params['processCode'];
      this.modifyRoleObject.processTag = params['processTag'];
      this.modifyRoleObject.recordStatus = params['recordStatus'];
      this.modifyRoleObject.reqDirectoryName = params['reqDirectoryName'];
      this.modifyRoleObject.reqQueueName = params['reqQueueName'];
      this.modifyRoleObject.reqSchemaName = params['reqSchemaName'];
      this.modifyRoleObject.reqXsltName = params['reqXsltName'];
      this.modifyRoleObject.requestTag = params['requestTag'];
      this.modifyRoleObject.respDirectoryName = params['respDirectoryName'];
      this.modifyRoleObject.respQueueName = params['respQueueName'];
      this.modifyRoleObject.respSchemaName = params['respSchemaName'];
      this.modifyRoleObject.responseTag = params['responseTag'];
      this.modifyRoleObject.serviceCode = params['serviceCode'];
      this.modifyRoleObject.serviceTag = params['serviceTag'];
      this.modifyRoleObject.updatedAt = params['updatedAt'];
      this.modifyRoleObject.verifiedEver = params['verifiedEver'];
      this.modifyRoleObject.verifierDtStamp = params['verifierDtStamp'];
      this.modifyRoleObject.verifierId = params['verifierId'];
      this.modifyRoleObject.versionNo = params['versionNo'];
      this.modifyRoleObject.xsdFile = params['xsdFile'];
      this.modifyRoleObject.authStatus = params['authStatus'];
      this.modifyRoleObject.updatedBy = params['updatedBy'];
      this.modifyRoleObject.fristTimeAuth = params['fristTimeAuth'];
      console.log(' data for update role recived');
      console.log(this.modifyRoleObject);
      if (this.modifyRoleObject) {
        // this.getRolesForUser(this.modifyUserObject.userType);
      }
    });
  }

  ngOnInit() {
    this.userRolesFromLogin = localStorage.getItem('userRolesFromLogin');
    // this.userRoles = this.userRolesFromLogin.split(',');
    // this.loggedInUser = localStorage.getItem('userId');
    this.loggedInUser = localStorage.getItem('userFromLogin');
    console.log(this.userRoles);
    this.editFunction = false;
    this.editFunction2 = true;
    this.poovar=true;
  }

  changeStatus() {
    console.log('change status call');
    this.is_edit = false;
    console.log('done');
    this.editFunction = true;
    this.editFunction2 = false;
    this.poovar=false;
  }
  modifyExt(modifyExt: ExtsysClass) {
    console.log('inside modify user');
    modifyExt.updatedBy = this.loggedInUser;
    //console.log(modifyExt);
    modifyExt.extSysCode = this.modifyRoleObject.extSysCode;
    modifyExt.extSysName = this.modifyRoleObject.extSysName;
    modifyExt.id=this.modifyRoleObject.id;
    console.log(modifyExt);
    this.apiService.modifyExtSysService(modifyExt,this.loggedInUser)
      .subscribe(data => {
        console.log(data);
        this.dataForm = data;
        if (this.dataForm) {
          Swal.fire('Updated Successfully');
        } else {
          Swal.fire('Update Failed');
        }
      });
  }
  // verify/authorize a user
  verifyExtSys(extSysName) {
    const userIdLoggedIn = localStorage.getItem('userId');
    if (this.modifyRoleObject.creatorId === userIdLoggedIn) {
      alert('Maker cannot authorize the record!');
    } else {
      if (confirm('are you sure you want to verify the external system !')) {

        this.apiService.verifyExtSys(extSysName, userIdLoggedIn).subscribe(data => {
          this.updatedExtObject = data;
          this.modifyRoleObject = this.updatedExtObject;
          console.log('ext sys is authorized');
        });
      }
    }
  }
  // delete a user
  deleteExtSys(extSysName) {
    const userIdLoggedIn = localStorage.getItem('userId');
    confirm('are you sure you want to delete !');
    this.apiService.deleteExtSys(extSysName, userIdLoggedIn).subscribe(data => {
      console.log('ext is deleted');
    });
  }
  // close a user
  closelockRecordExtSys(extSysName) {
    const userIdLoggedIn = localStorage.getItem('userId');
    // if ( this.modifyRoleObject.creatorId === userIdLoggedIn) {
    //   alert('Maker cannot close the record!');
    // } else {
    if (confirm('are you sure you want to close the external system !')) {
      this.apiService.closelockRecordExtSys(extSysName, userIdLoggedIn).subscribe(data => {
        this.updatedExtObject = data;
        this.modifyRoleObject = this.updatedExtObject;
        console.log('ext is closed');
      });
    }
  }
  // reopen a user
  reopenRecordExtSys(extSysName) {
    const userIdLoggedIn = localStorage.getItem('userId');
    if (confirm('are you sure you want to reopen the external system !')) {
      this.apiService.reopenRecordExtSys(extSysName, userIdLoggedIn).subscribe(data => {
        this.updatedExtObject = data;
        this.modifyRoleObject = this.updatedExtObject;
        console.log('ext is reopened');
      });
    }
  }
}
