import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Roles } from '../models/roles';
//import { RoleService } from 'app/shared/services/role.service';
import { RoleService } from '../roles.service';
import swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {fmosrolesdata} from '../models/fmosroledata';
import {permissionsLabels} from '../models/fmosNewRolePermissions';



@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})

export class RoleDetailsComponent  implements OnInit {

  role: Roles;
  allRoles: Array<Roles>;
  userRoles: string[];
  roleCodes = new permissionsLabels();
  //roleCodes = new Roles();
  is_edit = true;
  userRole: Roles[];
  disabledButtonFlag: boolean;
  response: any;
  validationResponse: any;
  userRolesFromLogin: string;
  username: string;
  editFunction: boolean;
  rowPermission: boolean;
  fms: boolean;
  fmsMonitor: boolean;
  adminbutton: any;
  responseError: any;
  ras: any;
  submit: any;
  next: any;
  fmsbutton: any;
  fmsmonitoring: any;
  medianPermission: any;
  check = 0;
  checked: any;
  displayedcolumns:any=[];
  checkedlist:any=[];
  selection = new SelectionModel(true, []);
  storechecklist:any=[];
  dummydata:any = {roles:{name:'fms', description:'role desc'},
    tabslist:[
        {tabname:'Admin', 
        screens:['database', 'application', 'customer', 'employee'],
        screenlist:[{screenname:'database', permission:111111, newpermission:111111},
                    {screenname:'application', permission:111110, newpermission:111110},
                    {screenname:'customer', permission:111100, newpermission:111100},
                    {screenname:'employee', permission:111000, newpermission:111000}],
        labels:['new', 'edit', 'view', 'delete', 'print', 'auth'],
        },
        {tabname:'FMS', 
        screens:['fms', 'application', 'customer', 'report'],
        labels:['new', 'edit', 'view', 'delete', 'print', 'auth'],
        screenlist:[{screenname:'fms', permission:101100, newpermission:101100},
        {screenname:'application', permission:101100, newpermission:101100},
        {screenname:'customer', permission:101100, newpermission:101100},
        {screenname:'report', permission:101100, newpermission:101100}],
        },
        {tabname:'FMS Monitoring', 
        screens:['FMS Monitoring', 'application', 'customer', 'employee'],
        labels:['new', 'edit', 'view', 'delete', 'print', 'auth'],
        screenlist:[{screenname:'FMS Monitoring', permission:101100, newpermission:101100},
        {screenname:'application', permission:101100, newpermission:101100},
        {screenname:'customer', permission:101100, newpermission:101100},
        {screenname:'employee', permission:101100, newpermission:101100}],
        }
      ]
  };
  rolessorteddata:any;
  newRolestabsdata:any={tabslist:[]};
  //datasource:any={headers:[], list:[]};
  datasource:any={list:[], checkedlist:[]};
  previouschecklist:any=[];
  newRolesData:fmosrolesdata = new fmosrolesdata();
  enabledefaulttrigger:boolean=true;
  enablesave:boolean=true;

  @Input()
  modifyRoleObject = new Roles();
  updatedRoleObject: any;
  editFunction2: boolean;
  button:boolean=false;
  enableclose:boolean=false;
  enableopen:boolean=false;
  public selectedtab: string;
  loggedInUser: string;
  constructor(private roleService: RoleService, private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router) { }

    getNewPermissions()
    {
      this.roleService.fetchScreenPermissions('Role');
      this.cdr.markForCheck();
    }

  ngOnInit() {
    this.loggedInUser = localStorage.getItem('userFromLogin');
    this.getNewPermissions();
    this.roleService.screenLabelList.subscribe(message => this.roleCodes = message);
    this.route.queryParams.subscribe(params => {

      this.modifyRoleObject.id = params['id'];
      this.modifyRoleObject.roleName = params['roleName'];
      this.modifyRoleObject.roleDesc = params['roleDesc'];
      this.modifyRoleObject.new1 = params['new1'];
      this.modifyRoleObject.copy1 = params['copy1'];
      this.modifyRoleObject.delete1 = params['delete1'];
      this.modifyRoleObject.close1 = params['close1'];
      this.modifyRoleObject.unlock1 = params['unlock1'];
      this.modifyRoleObject.reopen1 = params['reopen1'];
      this.modifyRoleObject.print1 = params['print1'];
      this.modifyRoleObject.auth1 = params['auth1'];
      this.modifyRoleObject.view1 = params['view1'];
      this.modifyRoleObject.new2 = params['new2'];
      this.modifyRoleObject.copy2 = params['copy2'];
      this.modifyRoleObject.delete2 = params['delete2'];
      this.modifyRoleObject.close2 = params['close2'];
      this.modifyRoleObject.unlock2 = params['unlock2'];
      this.modifyRoleObject.reopen2 = params['reopen2'];
      this.modifyRoleObject.print2 = params['print2'];
      this.modifyRoleObject.auth2 = params['auth2'];
      this.modifyRoleObject.view2 = params['view2'];
      this.modifyRoleObject.new3 = params['new3'];
      this.modifyRoleObject.copy3 = params['copy3'];
      this.modifyRoleObject.delete3 = params['delete3'];
      this.modifyRoleObject.close3 = params['close3'];
      this.modifyRoleObject.unlock3 = params['unlock3'];
      this.modifyRoleObject.reopen3 = params['reopen3'];
      this.modifyRoleObject.print3 = params['print3'];
      this.modifyRoleObject.auth3 = params['auth3'];
      this.modifyRoleObject.view3 = params['view3'];
      this.modifyRoleObject.new4 = params['new4'];
      this.modifyRoleObject.copy4 = params['copy4'];
      this.modifyRoleObject.delete4 = params['delete4'];
      this.modifyRoleObject.close4 = params['close4'];
      this.modifyRoleObject.unlock4 = params['unlock4'];
      this.modifyRoleObject.reopen4 = params['reopen4'];
      this.modifyRoleObject.print4 = params['print4'];
      this.modifyRoleObject.auth4 = params['auth4'];
      this.modifyRoleObject.view4 = params['view4'];
      this.modifyRoleObject.new5 = params['new5'];
      this.modifyRoleObject.copy5 = params['copy5'];
      this.modifyRoleObject.delete5 = params['delete5'];
      this.modifyRoleObject.close5 = params['close5'];
      this.modifyRoleObject.unlock5 = params['unlock5'];
      this.modifyRoleObject.reopen5 = params['reopen5'];
      this.modifyRoleObject.print5 = params['print5'];
      this.modifyRoleObject.auth5 = params['auth5'];
      this.modifyRoleObject.view5 = params['view5'];
      this.modifyRoleObject.new6 = params['new6'];
      this.modifyRoleObject.copy6 = params['copy6'];
      this.modifyRoleObject.delete6 = params['delete6'];
      this.modifyRoleObject.close6 = params['close6'];
      this.modifyRoleObject.unlock6 = params['unlock6'];
      this.modifyRoleObject.reopen6 = params['reopen6'];
      this.modifyRoleObject.print6 = params['print6'];
      this.modifyRoleObject.auth6 = params['auth6'];
      this.modifyRoleObject.view6 = params['view6'];
      this.modifyRoleObject.new7 = params['new7'];
      this.modifyRoleObject.copy7 = params['copy7'];
      this.modifyRoleObject.delete7 = params['delete7'];
      this.modifyRoleObject.close7 = params['close7'];
      this.modifyRoleObject.unlock7 = params['unlock7'];
      this.modifyRoleObject.reopen7 = params['reopen7'];
      this.modifyRoleObject.print7 = params['print7'];
      this.modifyRoleObject.auth7 = params['auth7'];
      this.modifyRoleObject.view7 = params['view7'];
      this.modifyRoleObject.new8 = params['new8'];
      this.modifyRoleObject.copy8 = params['copy8'];
      this.modifyRoleObject.delete8 = params['delete8'];
      this.modifyRoleObject.close8 = params['close8'];
      this.modifyRoleObject.unlock8 = params['unlock8'];
      this.modifyRoleObject.reopen8 = params['reopen8'];
      this.modifyRoleObject.print8 = params['print8'];
      this.modifyRoleObject.auth8 = params['auth8'];
      this.modifyRoleObject.view8 = params['view8'];
      this.modifyRoleObject.new9 = params['new9'];
      this.modifyRoleObject.copy9 = params['copy9'];
      this.modifyRoleObject.delete9 = params['delete9'];
      this.modifyRoleObject.close9 = params['close9'];
      this.modifyRoleObject.unlock9 = params['unlock9'];
      this.modifyRoleObject.reopen9 = params['reopen9'];
      this.modifyRoleObject.print9 = params['print9'];
      this.modifyRoleObject.auth9 = params['auth9'];
      this.modifyRoleObject.view9 = params['view9'];
      this.modifyRoleObject.view10 = params['view10'];
      this.modifyRoleObject.view11 = params['view11'];
      this.modifyRoleObject.view12 = params['view12'];
      this.modifyRoleObject.view13 = params['view13'];
      this.modifyRoleObject.view14 = params['view14'];
      this.modifyRoleObject.new15 = params['new15'];
      this.modifyRoleObject.copy15 = params['copy15'];
      this.modifyRoleObject.delete15 = params['delete15'];
      this.modifyRoleObject.close15 = params['close15'];
      this.modifyRoleObject.unlock15 = params['unlock15'];
      this.modifyRoleObject.reopen15 = params['reopen15'];
      this.modifyRoleObject.print15 = params['print15'];
      this.modifyRoleObject.auth15 = params['auth15'];
      this.modifyRoleObject.view15 = params['view15'];
      this.modifyRoleObject.new16 = params['new16'];
      this.modifyRoleObject.copy16 = params['copy16'];
      this.modifyRoleObject.delete16 = params['delete16'];
      this.modifyRoleObject.close16 = params['close16'];
      this.modifyRoleObject.unlock16 = params['unlock16'];
      this.modifyRoleObject.reopen16 = params['reopen16'];
      this.modifyRoleObject.print16 = params['print16'];
      this.modifyRoleObject.auth16 = params['auth16'];
      this.modifyRoleObject.view16 = params['view16'];
      this.modifyRoleObject.new17 = params['new17'];
      this.modifyRoleObject.copy17 = params['copy17'];
      this.modifyRoleObject.delete17 = params['delete17'];
      this.modifyRoleObject.close17 = params['close17'];
      this.modifyRoleObject.unlock17 = params['unlock17'];
      this.modifyRoleObject.reopen17 = params['reopen17'];
      this.modifyRoleObject.print17 = params['print17'];
      this.modifyRoleObject.auth17 = params['auth17'];
      this.modifyRoleObject.view17 = params['view17'];
      this.modifyRoleObject.new18 = params['new18'];
      this.modifyRoleObject.copy18 = params['copy18'];
      this.modifyRoleObject.delete18 = params['delete18'];
      this.modifyRoleObject.close18 = params['close18'];
      this.modifyRoleObject.unlock18 = params['unlock18'];
      this.modifyRoleObject.reopen18 = params['reopen18'];
      this.modifyRoleObject.print18 = params['print18'];
      this.modifyRoleObject.auth18 = params['auth18'];
      this.modifyRoleObject.view18 = params['view18'];
      this.modifyRoleObject.new19 = params['new19'];
      this.modifyRoleObject.copy19 = params['copy19'];
      this.modifyRoleObject.delete19 = params['delete19'];
      this.modifyRoleObject.close19 = params['close19'];
      this.modifyRoleObject.unlock19 = params['unlock19'];
      this.modifyRoleObject.reopen19 = params['reopen19'];
      this.modifyRoleObject.print19 = params['print19'];
      this.modifyRoleObject.auth19 = params['auth19'];
      this.modifyRoleObject.view19 = params['view19'];
      this.modifyRoleObject.new20 = params['new20'];
      this.modifyRoleObject.copy20 = params['copy20'];
      this.modifyRoleObject.delete20 = params['delete20'];
      this.modifyRoleObject.close20 = params['close20'];
      this.modifyRoleObject.unlock20 = params['unlock20'];
      this.modifyRoleObject.reopen20 = params['reopen20'];
      this.modifyRoleObject.print20 = params['print20'];
      this.modifyRoleObject.auth20 = params['auth20'];
      this.modifyRoleObject.view20 = params['view20'];
      this.modifyRoleObject.new24 = params['new24'];
      this.modifyRoleObject.copy24 = params['copy24'];
      this.modifyRoleObject.delete24 = params['delete24'];
      this.modifyRoleObject.close24 = params['close24'];
      this.modifyRoleObject.unlock24 = params['unlock24'];
      this.modifyRoleObject.reopen24 = params['reopen24'];
      this.modifyRoleObject.print24 = params['print24'];
      this.modifyRoleObject.auth24 = params['auth24'];
      this.modifyRoleObject.view24 = params['view24'];
      // this.modifyRoleObject.view16 = params['view16'];
      // this.modifyRoleObject.view17 = params['view17'];
      // this.modifyRoleObject.view18 = params['view18'];
      // this.modifyRoleObject.view19 = params['view19'];
      // this.modifyRoleObject.view20 = params['view20'];
      // this.modifyRoleObject.view21 = params['view21'];
      // this.modifyRoleObject.view22 = params['view22'];
      this.modifyRoleObject.view23 = params['view23'];
      this.modifyRoleObject.maker = params['maker'];
      this.modifyRoleObject.makerDtStamp = params['makerDtStamp'];
      this.modifyRoleObject.verifierId = params['verifierId'];
      console.log("verifierId",params.verifierId)
      this.modifyRoleObject.checkerId=params.checkerId;
      console.log("checkerId",params.checkerId)
      this.modifyRoleObject.checkerDtStamp = params['checkerDtStamp'];
      this.modifyRoleObject.recordStatus = params['recordStatus'];
      if(this.modifyRoleObject.recordStatus == 'O'){
        this.modifyRoleObject.recordStatus = "OPEN";
      }else if(this.modifyRoleObject.recordStatus == 'C'){
        this.modifyRoleObject.recordStatus = "CLOSE"
      }else{
        this.modifyRoleObject.recordStatus = params['recordStatus'];
      }
      this.modifyRoleObject.authStatus = params['authStatus'];
      if(this.modifyRoleObject.authStatus  == 'A'){
        this.modifyRoleObject.authStatus  = "AUTHORISED";
      }else if(this.modifyRoleObject.authStatus  == 'U'){
        this.modifyRoleObject.authStatus  = "UNAUTHORISED"
      }else{
        this.modifyRoleObject.authStatus  = params['authStatus'];
      }
      this.modifyRoleObject.firstTimeAuth = params['firstTimeAuth'];
      if(this.modifyRoleObject.firstTimeAuth == 'Y')
      {
        this.modifyRoleObject.firstTimeAuth = "YES";
      }else if(this.modifyRoleObject.firstTimeAuth == 'N'){
        this.modifyRoleObject.firstTimeAuth = "NO";
      }
      else
      {
        this.modifyRoleObject.firstTimeAuth = params['firstTimeAuth'];
      }
      this.button=false;
      if(this.modifyRoleObject.recordStatus == "C" && this.modifyRoleObject.authStatus == "A"){
        this.button=true;
      }
      console.log("auth status",this.modifyRoleObject.authStatus);
      console.log("record status",this.modifyRoleObject.recordStatus)
     // console.log(' data for update role recived');
     // console.log(this.modifyRoleObject);
      if (this.modifyRoleObject) {
        // this.getRolesForUser(this.modifyUserObject.userType);
      }
      if(this.modifyRoleObject.recordStatus=='C'|| this.modifyRoleObject.recordStatus=='CLOSE' && this.modifyRoleObject.authStatus =='A'|| this.modifyRoleObject.authStatus=='AUTHORISED'){
        this.enableopen=true;
      }else{
        this.enableopen=false;
      }
      console.log(this.enableopen, 'open');
      
    });
    this.userRolesFromLogin = localStorage.getItem('userRolesFromLogin');
    if(this.userRolesFromLogin)
       this.userRoles = this.userRolesFromLogin.split(',');
    this.username = localStorage.getItem('userFromLogin');
    this.editFunction = false;
    this.editFunction2 = true;
    this.fetchdynamicroles();
    localStorage.setItem('modifyRoleObject',JSON.stringify(this.modifyRoleObject))
    console.log(this.modifyRoleObject);
    //  this.roleBasedButton();

    this.changeAdmin();
  }
  reset() {
    this.disabledButtonFlag = false;
    this.response = null;
    this.validationResponse = null;
    this.modifyRoleObject = new Roles();
    this.router.navigate(['/dashboard']);
  }
  changeAdmin() {
    // console.log('change status call');
    this.rowPermission = true;
    this.fms = false;
    this.fmsMonitor = false;
    this.medianPermission = false;
  }
  changeFms() {

    this.rowPermission = false;
    this.fms = true;
    this.fmsMonitor = false;
    this.adminbutton = false;
    this.medianPermission = false;
    this.ras = false;
  }
  changeFmsMonitoring() {
    this.rowPermission = false;
    this.fms = false;
    this.fmsMonitor = true;
    this.fmsbutton = false;
    this.medianPermission = false;
    this.ras = false;
  }
  changeMedian() {
    this.ras = false;
    this.rowPermission = false;
    this.fms = false;
    this.fmsMonitor = false;
    this.fmsbutton = false;
    this.medianPermission = true;

  }
  changeRas() {
    this.rowPermission = false;
    this.fms = false;
    this.fmsMonitor = false;
    this.fmsbutton = false;
    this.medianPermission = false;
    this.ras = true;
  }

  modifyRoles() {
      let permissionslist = [];
      for(let i=0;i<this.rolessorteddata.length;i++)
      {
          let screenoccurence = this.rolessorteddata[i].screenlist;
          for(let ind=0;ind<screenoccurence.length;ind++)
          {
              if(screenoccurence[ind].permission.toString() != screenoccurence[ind].newpermission.toString())
              {
                let gettabindex = this.newRolesData.permissionDto.findIndex(function(item){ return item.permissionId.screenId == screenoccurence[ind].screenid});
                if(gettabindex >= 0)
                {
                   let obj = {'permissionId' : this.newRolesData.permissionDto[gettabindex].permissionId};
                   obj["permissions"] = screenoccurence[ind].newpermission;
                   permissionslist.push(obj);
                }
              } //if
          } //for loop endng
      } //for loop endng
      let modifiedRole:any = {roleDto:this.newRolesData.roleDto};
     console.log("modifiedRole",modifiedRole);
     console.log("modifiedRole Obj",this.modifyRoleObject)
         modifiedRole.permissionDto = permissionslist;
      this.roleService.newmodifyRoleService(modifiedRole,this.loggedInUser).subscribe(data => {
        this.validationResponse = data;
        this.cdr.markForCheck();
        
        this.enablesave=true;
        let userId =  localStorage.getItem('userFromLogin');
        this.roleService.fetchNewRolePermissions(userId);
        //console.log(this.validationResponse);
        if (this.validationResponse) {
          // this.responseError = 'success';
          swal.fire("Role is Modified !");
          console.log("IF IF IF IF IF");
        } else {
          // this.responseError = 'Server Error';
          swal.fire("Server Error!");
          console.log("ELSE ELSE ELSE ELSE");
        }
      });
  }
 /* modifyRoles() {

    var modifyRole = this.modifyRoleObject;
    // console.log(modifyRole);
    const userIdLoggedIn = localStorage.getItem('userFromLogin');
    modifyRole.updatedBy = userIdLoggedIn;
    //console.log('inside modify role');
    //console.log(modifyRole);
    this.roleService.modifyRoleService(modifyRole).subscribe(data => {
      this.validationResponse = data;
      this.cdr.markForCheck();
      //console.log(this.validationResponse);
      if (this.validationResponse) {
        // this.responseError = 'success';
        swal.fire("Role is Modified !");
        console.log("IF IF IF IF IF");
      } else {
        // this.responseError = 'Server Error';
        swal.fire("Server Error!");
        console.log("ELSE ELSE ELSE ELSE");
      }
    });
  } */

  /* getRoles() {
    this.roleService.getAllRoles().subscribe(data => {
      this.allRoles = data;
      // console.log(this.allRoles);
      // this.roleCodes.auth1 = 'true';
      for (let i = 0; i < this.allRoles.length; i++) {
        // const e//lement = a//rray[i];
        // let roles = new Roles();
        // const userRoles = new Array();
        // console.log('user role length' + this.userRoles.length);
        for (let j = 0; j < this.userRoles.length; j++) {
          // let k = 0;
          if (this.userRoles[j] === this.allRoles[i].roleName) {

           // console.log('COMPARING');
            // userRoles[k++] = this.allRoles[j];
            // console.log('roles ' + userRoles);
            if (this.allRoles[i].delete1 === 'true') {
              //console.log('delete1');
              this.roleCodes.delete1 = 'true';
            }
            if (this.allRoles[i].close1 === 'true') {
              // console.log('close1');
              this.roleCodes.close1 = 'true';
            }
            if (this.allRoles[i].unlock1 === 'true') {
              // console.log('COMP');
              this.roleCodes.unlock1 = 'true';
            }
            if (this.allRoles[i].auth1 === 'true') {
              //  console.log('COMP');
              this.roleCodes.auth1 = 'true';
            }
            if (this.allRoles[i].new1 === 'true') {
              //  console.log('COMP');
              this.roleCodes.new1 = 'true';
            }
            if (this.allRoles[i].copy1 === 'true') {
              //  console.log('COMP');
              this.roleCodes.copy1 = 'true';
            }
            if (this.allRoles[i].new2 === 'true') {
              //console.log('new2');
              this.roleCodes.new2 = 'true';
            }
            if (this.allRoles[i].delete2 === 'true') {
              // console.log('COMP');
              this.roleCodes.delete2 = 'true';
            }
            if (this.allRoles[i].close2 === 'true') {
              // console.log('COMP');
              this.roleCodes.close2 = 'true';
            }
            if (this.allRoles[i].unlock2 === 'true') {
              //  console.log('COMP');
              this.roleCodes.unlock2 = 'true';
            }
            if (this.allRoles[i].auth2 === 'true') {
              //  console.log('COMP');
              this.roleCodes.auth2 = 'true';
            }
            if (this.allRoles[i].copy2 === 'true') {
              //  console.log('COMP');
              this.roleCodes.copy2 = 'true';
            }
            if (this.allRoles[i].new3 === 'true') {
              //console.log('new3');
              this.roleCodes.new3 = 'true';
            }
            if (this.allRoles[i].delete3 === 'true') {
              // console.log('delete3');
              this.roleCodes.delete3 = 'true';
            }
            if (this.allRoles[i].close3 === 'true') {
              // console.log('close3');
              this.roleCodes.close3 = 'true';
            }
            if (this.allRoles[i].unlock3 === 'true') {
              // console.log('unlock3');
              this.roleCodes.unlock3 = 'true';
            }
            if (this.allRoles[i].auth3 === 'true') {
              //  console.log('auth3');
              this.roleCodes.auth3 = 'true';
            }
            if (this.allRoles[i].copy3 === 'true') {
              //  console.log('COMP');
              this.roleCodes.copy3 = 'true';
            }
            if (this.allRoles[i].new4 === 'true') {
              //console.log('new4');
              this.roleCodes.new4 = 'true';
            }
            if (this.allRoles[i].delete4 === 'true') {
              //  console.log('delete4');
              this.roleCodes.delete4 = 'true';
            }
            if (this.allRoles[i].close4 === 'true') {
              //  console.log('close4');
              this.roleCodes.close4 = 'true';
            }
            if (this.allRoles[i].unlock4 === 'true') {
              //  console.log('unlock4');
              this.roleCodes.unlock4 = 'true';
            }
            if (this.allRoles[i].auth4 === 'true') {
              //  console.log('auth4');
              this.roleCodes.auth4 = 'true';
            }
            if (this.allRoles[i].copy4 === 'true') {
              //  console.log('COMP');
              this.roleCodes.copy4 = 'true';
            }
          }
        }
        // this.roleCodes.auth1 = 'test';
       // console.log(this.roleCodes);

        // roles = userRoles[i];

        this.cdr.markForCheck();
      }
    });
  } */
  // verify/authorize a user
  verifyRole(roleName) {
    const userIdLoggedIn = localStorage.getItem('userFromLogin');
    if (this.modifyRoleObject.maker === userIdLoggedIn) {
      swal.fire('Maker cannot Authorize the Record!');
    } else {
      this.roleService.verifyRole(roleName, userIdLoggedIn).subscribe(data => {
        this.updatedRoleObject = data;
        this.cdr.markForCheck();
        this.modifyRoleObject = this.updatedRoleObject;
        if(this.modifyRoleObject.recordStatus=='C'|| this.modifyRoleObject.recordStatus=='CLOSE' && this.modifyRoleObject.authStatus =='A'|| this.modifyRoleObject.authStatus=='AUTHORISED'){
          this.enableopen=true;
        }else{
          this.enableopen=false;
        }
        console.log(this.enableopen, 'open');
        localStorage.setItem('modifyRoleObject',JSON.stringify(this.modifyRoleObject))
        this.fetchdynamicroles();
        console.log("obj---",this.modifyRoleObject.recordStatus)
        // this.button=true;
        console.log('user is authorized');
        swal.fire("Role is Authorized !");
      });
    }
  }
  // delete a user
  deleteRole(roleName) {
    const userIdLoggedIn = localStorage.getItem('userFromLogin');
    this.roleService.deleteRole(roleName, userIdLoggedIn).subscribe(data => {
      console.log('user is deleted');
      if(this.modifyRoleObject.recordStatus=='C'|| this.modifyRoleObject.recordStatus=='CLOSE' && this.modifyRoleObject.authStatus =='A'|| this.modifyRoleObject.authStatus=='AUTHORISED'){
        this.enableopen=true;
      }else{
        this.enableopen=false;
      }
      console.log(this.enableopen, 'open');
      swal.fire("Role is Deleted!");
      this.router.navigate(['/roles/summary']);
    });
  }
  // close a user
  closelockRecord(roleName) {
    const userIdLoggedIn = localStorage.getItem('userFromLogin');
    this.roleService.closelockRecord(roleName, userIdLoggedIn).subscribe(data => {
      this.updatedRoleObject = data;
      this.cdr.markForCheck();
      this.modifyRoleObject = this.updatedRoleObject;
      console.log("update-------",this.updatedRoleObject)
      if(this.updatedRoleObject.recordStatus=='C'|| this.updatedRoleObject.recordStatus=='CLOSE' && this.updatedRoleObject.authStatus =='A'|| this.updatedRoleObject.authStatus=='AUTHORISED'){
        this.enableopen=false;
      }else{
        this.enableopen=true;
      }
      console.log(this.enableopen, 'open');
      localStorage.setItem('modifyRoleObject',JSON.stringify(this.modifyRoleObject))
      // this.fetchdynamicroles();
      swal.fire("Role is Closed !");
      console.log('role is closed');
    });
  }
  // reopen a user
  reopenRecord(userId) {
    const userIdLoggedIn = localStorage.getItem('userFromLogin');
    this.roleService.reopenRecord(userId, userIdLoggedIn).subscribe(data => {
      this.updatedRoleObject = data;
      // this.cdr.markForCheck();
      this.modifyRoleObject = this.updatedRoleObject;
      if(this.modifyRoleObject.recordStatus=='C'|| this.modifyRoleObject.recordStatus=='CLOSE' && this.modifyRoleObject.authStatus =='A'|| this.modifyRoleObject.authStatus=='AUTHORISED'){
        this.enableopen=true;
      }else{
        this.enableopen=false;
      }
      console.log(this.enableopen, 'open');
      localStorage.setItem('modifyRoleObject',JSON.stringify(this.modifyRoleObject))
      this.fetchdynamicroles();
      console.log('user is reopened');
      swal.fire("Role is Reopened !");
    });
  }
  changeStatus() {
    console.log('change status call');
    this.is_edit = false;
    this.editFunction = true;
    this.editFunction2 = false; 
  }

  /* sneha code */
  rolestype(index:number)
  {
     this.selectedtab = this.newRolestabsdata.tabslist[index].tabname;
     let indexdata = this.newRolestabsdata.tabslist[index];
     let tabheaders = indexdata.labels;
     let indexval = tabheaders.indexOf('Screens');
     this.previouschecklist.splice(index, 0, this.checkedlist);
     let checklistclass=[];
    if(indexval == -1)
    {
      tabheaders.splice(0, 0,'Screens');
      tabheaders.splice(1, 0,'checkbox');
    }
     let screenslist:any = [];
     let checklist:any=[];
     let strchklist:any=[];
     let data = indexdata.screenlist;
     for( let i=0;i<data.length;i++)
     {
        let array:any =[];
        var obj={};
        var checkval={};
        var testchecklist:any=[{value:''},{value:''}];
        var strinchklst:any=[{value:''},{value:''}];
        array.push(data[i].screenname);
        obj[indexdata.labels[0]] = data[i].screenname;
        obj[indexdata.labels[1]] = 'checkbox';
        checkval[indexdata.labels[0]] = true;
        checkval[indexdata.labels[1]] = true;
        let permissiondata = data[i].newpermission.toString();
        let stringlength = permissiondata.length;
         //check if all occurences is checked
         var temp = permissiondata;
         var count = (temp.match(/1/g) || []).length;
         if(stringlength == count)
         {
            checklistclass.push(i);
         }
        /* if(stringlength == count)
         {
            testchecklist[0].value = true;
            strinchklst[0].value = true;
            testchecklist[1].value = true;
            strinchklst[1].value = true;
         } //if */
         //end of checking all occurences
        for(let j=0;j<stringlength;j++)
        {
            obj[indexdata.labels[2+j]] = permissiondata.charAt(j);
           if(permissiondata.charAt(j) == 1)
           {
              checkval[indexdata.labels[2+j]] = true;
              testchecklist.push({value:true});
              strinchklst.push({value:true});
           }
           else
           {
              checkval[indexdata.labels[2+j]] = false;
              testchecklist.push({value:false});
              strinchklst.push({value:false});
           }
        } //for loop endng
        screenslist.push(obj);
        checklist.push(testchecklist);
        strchklist.push(strinchklst);
     } //for loop endng
     this.displayedcolumns = tabheaders;
     this.checkedlist = checklist;
     this.storechecklist = strchklist;
     this.datasource.list = new MatTableDataSource(screenslist);
     this.selection.clear();
     console.log(this.checkedlist);
    if(this.enabledefaulttrigger)
       document.getElementById('defaultele').click();
   /* if(checklistclass.length)
    {
      setTimeout(() => {
        this.appendcheckclass(checklistclass);
      }, 3000);
    } //if  */
}

checkclick(i)
{
console.log('clicked', i);
}

/*appendcheckclass(list)
{
for(let i=0;i<list.length;i++)
{
  $('#checkbox_'+list[i]).click();
  $('#checkbox_'+list[i]).change();
  $('#checkbox_'+list[i]).trigger("change");
  $('#checkbox_'+list[i]).triggerHandler("change");
  this.cdr.detectChanges();
  this.cdr.markForCheck();
  //document.getElementById('checkbox_'+list[i]).click();
  //console.log(i,'click');
  //this.datasource.list.data.forEach(row => this.selection.select(row));
  //this.selection = new SelectionModel(true, this.datasource.list[i]);
  //this.selection = new SelectionModel<>(true, [...ELEMENT_DATA]) mat-checkbox mat-accent mat-checkbox-checked
  //document.getElementById('checkbox_'+list[i]).className = 'mat-checkbox mat-accent mat-checkbox-checked';
}

} */

changmthd()
{
console.log('chng');
}

defaulttoggle()
{
 this.enabledefaulttrigger=false;
}

onChange(event, rowindex, index, item) {
console.log(index, rowindex, event, item);
let indexval = index -2;   
this.storingpermissions(indexval, rowindex, event, 'single');
}

storingpermissions(indexval:number, rowindex:number, event:any, type:string)
{
console.log(type);
let tabname = this.selectedtab.toLowerCase();
let gettabindex = this.rolessorteddata.findIndex(function(item){ return item.tabname.toLowerCase() == tabname});
let gettabdata = this.rolessorteddata[gettabindex].screenlist[rowindex];
let existingpermission = this.rolessorteddata[gettabindex].screenlist[rowindex].newpermission.toString();
let arraylength = 1;
if(type == 'single')
 arraylength = 1;
else
 arraylength = existingpermission.length;
arraylength = existingpermission.length;
//console.log('new', existingpermission, indexval, arraylength);
for(let i=0;i<arraylength;i++)
{
let valueindex = indexval;
if(type == 'row')
{
  valueindex = i;
}
existingpermission = this.rolessorteddata[gettabindex].screenlist[rowindex].newpermission.toString();
let replacevalue = existingpermission.charAt(valueindex);
if(event.checked)
 replacevalue = 1;
else
 replacevalue = 0; 
this.rolessorteddata[gettabindex].screenlist[rowindex].newpermission = existingpermission.substr(0, valueindex) + replacevalue + existingpermission.substr(valueindex+1);
} //for loop endng 
//if row is unchecked then reassigning the values 
if(type == 'row' && !event.checked)
{
console.log('else');
let uncheckpermission = this.rolessorteddata[gettabindex].screenlist[rowindex].permission.toString(); 
//uncheckpermission.replace(/\d/g, '0');
let unchkarry = [];
for(let i=0;i<uncheckpermission.length;i++)
{
    unchkarry.push(0);
}
uncheckpermission = unchkarry.join("");
this.rolessorteddata[gettabindex].screenlist[rowindex].newpermission = uncheckpermission;
console.log(this.newRolestabsdata.tabslist[gettabindex]);
this.newRolestabsdata.tabslist[gettabindex].screenlist[rowindex].newpermission = uncheckpermission;
}
}

selectrow(event, index, colindex)
{
console.log(event, index, colindex);
let list = this.storechecklist[index];
this.checkedlist[index].forEach(function(entry, i) {
if(event.checked)
{
   entry.value = true;
}
else
{
  //entry.value = list[i].value;
  entry.value = false;
}
}); 
console.log('save', this.checkedlist);
this.storingpermissions(colindex, index, event, 'row');
}

selectall(value:boolean)
{
console.log('selectall', value, this.selectedtab);
console.log(this.newRolestabsdata);
for(let i = 0;i<this.checkedlist.length;i++)
{
let list = this.storechecklist[i];
this.checkedlist[i].forEach(function(entry, index) {
  if(value)
  {
    entry.value = true;
  }
  else
  {
    //entry.value = list[index].value;
     entry.value = false;
  }
}); 
} //for loop endng
//storing data
let tabname = this.selectedtab.toLowerCase();
let gettabindex = this.rolessorteddata.findIndex(function(item){ return item.tabname.toLowerCase() == tabname});
let gettabdata = this.rolessorteddata[gettabindex].screenlist;
let event ={checked:value};
for(let i=0;i<gettabdata.length;i++)
{
  this.storingpermissions(0, i, event, 'row');
}  
}


checkedvalue(value:any,  index:number, indexrow:number)
{
return value;
}

   /** Whether the number of selected elements matches the total number of rows. */
isAllSelected(index:number) {
const numSelected = this.selection.selected.length;
const numRows = this.datasource.list.data.length;
return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle(index:number) {
let value =  this.isAllSelected(index) ?
    this.selection.clear() :
    this.datasource.list.data.forEach(row => this.selection.select(row));
    let getcheckvalue = this.isAllSelected(index);
    this.selectall(getcheckvalue);
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: any): string {
let index =1;
if (!row) {
  return `${this.isAllSelected(index) ? 'select' : 'deselect'} all`;
}
return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}

getscreenlist(arrayB, element, permissionsarray, screen, screenslist)
{
/* arrayB.forEach((items) => {
  if(element.tabId == items.screensId.tabId)
  {
    let idexist = permissionsarray.findIndex(function(item){ return item.permissionId.screenId == items.screensId.screenId}); 
     screen.push(items.screenName);
     screenslist.push({screenname:items.screenName, screenid:items.screensId.screenId, permission:permissionsarray[idexist].permissions, newpermission:permissionsarray[idexist].permissions});
  } //if 
}) //arrayb fnctn endng */
for(let ind=0;ind<arrayB.length;ind++)
{
    let items = arrayB[ind];
   if(element.tabId == items.screensId.tabId)
   {
     let idexist = permissionsarray.findIndex(function(item){ return item.permissionId.screenId == items.screensId.screenId}); 
      screen.push(items.screenName);
      if(idexist > -1)
        screenslist.push({screenname:items.screenName, screenid:items.screensId.screenId, permission:permissionsarray[idexist].permissions, newpermission:permissionsarray[idexist].permissions});
   } //if 
 } //for loop endng
 return screenslist;
} 

fetchdynamicroles()
{
this.roleService.fetchdynamicrolesdata(this.modifyRoleObject.roleName).subscribe(data => {
   console.log('fetch', data);
   this.newRolesData.roleDto = data.roleDto;
   this.newRolesData.permissionDto=data.permissionDto;
   this.newRolesData.tabDto = data.tabDto;
   this.newRolesData.labelDto = data.labelDto;
   this.newRolesData.screenDto = data.screenDto;
   let arrayC=[];
   let arrayB = data.screenDto;
   let labelsarray = data.labelDto;
   let permissionsarray = data.permissionDto;
   //fetch screens for tabs
  // data.tabDto.forEach(function(element){
    for(let tabindex=0;tabindex<data.tabDto.length;tabindex++)
  {
    let screen=[];
    let screenslist=[];
    let element = data.tabDto[tabindex];
    screenslist = this.getscreenlist(arrayB, element, permissionsarray, screen, screenslist);
    //fetching screen list 
  //  arrayB.forEach((items) => {

  // }) //arrayb fntn endng
    //end of fetching screen list
    //fetching labels for screen
    let screenvisibility = element.visibility.toString();
    let label =[];
    let labellist = [];
    for(let i=0;i<screenvisibility.length;i++)
    {
      if(screenvisibility.charAt(i) == 1)
      {
         label.push(labelsarray[i].labelName);
         labellist.push(labelsarray[i]);
      }
    }
    //end of fetching labels for screen
  arrayC.push({tabname:element.tabName, screens:screen, screenlist:screenslist, labels:label, labelslist:labellist});
  }
  this.rolessorteddata = arrayC;
  this.newRolestabsdata.tabslist = arrayC;
  this.rolestype(0);
  console.log('arrayc',arrayC);
   //end of fetching screen for tabs
});
}
keyPress(event:any){
  console.log("event",event)
  var retrievedObject:any = localStorage.getItem('modifyRoleObject');
  retrievedObject=JSON.parse(retrievedObject);

console.log('retrievedObject: ', retrievedObject);
let value = event.target.value;
value = value.trim();
if(retrievedObject.roleDesc != value)
{
  this.enablesave=false
}

}

enablebuttonevent(){
  this.enablesave=false;
}
  /* end of sneha code */
}

