import { Component, OnInit, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable'; 
import { Roles } from '../models/roles';
import {RolePermissions} from '../models/fmosNewRolePermissions';
import {permissionsLabels} from '../models/fmosNewRolePermissions';
import { RoleService } from '../roles.service';
//import { RoleService } from 'app/shared/services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roleObject: Roles;
  @Input() userUpdate: Roles;
  allRoles: Array<Roles>;
  userRoles: string[];
  //roleCodes = new Roles();
  //roleCodes = new RolePermissions();
  roleCodes = new permissionsLabels();
  @Output()
  modifyRoleObject: Roles;
  displayedColumns: string[] = [ 'roleName', 'roleDesc', 'authStatus', 'recordStatus'];
 
  pageSize:any;
  pageIndex:any;
  dataIndex: any;
  userRolesFromLogin: string;
  loggedInUser: string;
  buttonsaccesslist = new RolePermissions();
  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  // username: string;
  constructor(private roleService: RoleService, private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getRoles();
    this.userRolesFromLogin = localStorage.getItem('userRolesFromLogin');
    if(this.userRolesFromLogin)
       this.userRoles = this.userRolesFromLogin.split(',');
    this.loggedInUser = localStorage.getItem('userFromLogin');
    this.getNewPermissions();
    this.roleService.screenLabelList.subscribe(message => this.roleCodes = message);
    setTimeout(() => {
       console.log(this.roleCodes);
    }, 3000);
  }


  getRoles() {
    this.roleService.getAllRoles().subscribe(data => {
      this.allRoles = data;
      this.dataSource = new MatTableDataSource<Roles>( this.allRoles );
      this.dataSource.paginator = this.paginator;
    });
  }

  getNewPermissions()
  {
    this.roleService.fetchScreenPermissions('Role');
  }


  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getRole(userObject) {
    // this.dataIndex = (this.pageIndex*this.pageSize)+i;
    // var userObject;
    // console.log(i);
    // console.log(this.dataIndex);
    // if(this.dataIndex>4)
    // {
    //    userObject = this.allRoles[this.dataIndex];
      // console.log(this.dataIndex);
      // console.log('from dataIndex');
      //console.log(i);
    // }
    // else
    // {
     // console.log(i);
      // userObject = this.allRoles[i];
      // console.log(userObject);
      // console.log('from index');
    // }
    // const userObject = this.allRoles[i];
    // console.log(userObject.roleName);
    this.modifyRoleObject = userObject;
    console.log('inside modify');
    console.log(this.modifyRoleObject);
      const navigationExtras: NavigationExtras = {
        queryParams: {
            'id': this.modifyRoleObject.id,
            'roleName': this.modifyRoleObject.roleName,
            'roleDesc': this.modifyRoleObject.roleDesc,
            'new1': this.modifyRoleObject.new1,
            'copy1': this.modifyRoleObject.copy1,
            'delete1': this.modifyRoleObject.delete1,
            'close1': this.modifyRoleObject.close1,
            'unlock1': this.modifyRoleObject.unlock1,
            'reopen1': this.modifyRoleObject.reopen1,
            'print1': this.modifyRoleObject.print1,
            'auth1': this.modifyRoleObject.auth1,
            'view1': this.modifyRoleObject.view1,
            'new2': this.modifyRoleObject.new2,
            'copy2': this.modifyRoleObject.copy2,
            'delete2': this.modifyRoleObject.delete2,
            'close2': this.modifyRoleObject.close2,
            'unlock2': this.modifyRoleObject.unlock2,
            'reopen2': this.modifyRoleObject.reopen2,
            'print2': this.modifyRoleObject.print2,
            'auth2': this.modifyRoleObject.auth2,
            'view2': this.modifyRoleObject.view2,
            'new3': this.modifyRoleObject.new3,
            'copy3': this.modifyRoleObject.copy3,
            'delete3': this.modifyRoleObject.delete3,
            'close3': this.modifyRoleObject.close3,
            'unlock3': this.modifyRoleObject.unlock3,
            'reopen3': this.modifyRoleObject.reopen3,
            'print3': this.modifyRoleObject.print3,
            'auth3': this.modifyRoleObject.auth3,
            'view3': this.modifyRoleObject.view3,
            'new4': this.modifyRoleObject.new4,
            'copy4': this.modifyRoleObject.copy4,
            'delete4': this.modifyRoleObject.delete4,
            'close4': this.modifyRoleObject.close4,
            'unlock4': this.modifyRoleObject.unlock4,
            'reopen4': this.modifyRoleObject.reopen4,
            'print4': this.modifyRoleObject.print4,
            'auth4': this.modifyRoleObject.auth4,
            'view4': this.modifyRoleObject.view4,
            'new5': this.modifyRoleObject.new5,
            'copy5': this.modifyRoleObject.copy5,
            'delete5': this.modifyRoleObject.delete5,
            'close5': this.modifyRoleObject.close5,
            'unlock5': this.modifyRoleObject.unlock5,
            'reopen5': this.modifyRoleObject.reopen5,
            'print5': this.modifyRoleObject.print5,
            'auth5': this.modifyRoleObject.auth5,
            'view5': this.modifyRoleObject.view5,
            'new6': this.modifyRoleObject.new6,
            'copy6': this.modifyRoleObject.copy6,
            'delete6': this.modifyRoleObject.delete6,
            'close6': this.modifyRoleObject.close6,
            'unlock6': this.modifyRoleObject.unlock6,
            'reopen6': this.modifyRoleObject.reopen6,
            'print6': this.modifyRoleObject.print6,
            'auth6': this.modifyRoleObject.auth6,
            'view6': this.modifyRoleObject.view6,
            'new7': this.modifyRoleObject.new7,
            'copy7': this.modifyRoleObject.copy7,
            'delete7': this.modifyRoleObject.delete7,
            'close7': this.modifyRoleObject.close7,
            'unlock7': this.modifyRoleObject.unlock7,
            'reopen7': this.modifyRoleObject.reopen7,
            'print7': this.modifyRoleObject.print7,
            'auth7': this.modifyRoleObject.auth7,
            'view7': this.modifyRoleObject.view7,
            'new8': this.modifyRoleObject.new8,
            'copy8': this.modifyRoleObject.copy8,
            'delete8': this.modifyRoleObject.delete8,
            'close8': this.modifyRoleObject.close8,
            'unlock8': this.modifyRoleObject.unlock8,
            'reopen8': this.modifyRoleObject.reopen8,
            'print8': this.modifyRoleObject.print8,
            'auth8': this.modifyRoleObject.auth8,
            'view8': this.modifyRoleObject.view8,
            'new9': this.modifyRoleObject.new9,
            'copy9': this.modifyRoleObject.copy9,
            'delete9': this.modifyRoleObject.delete9,
            'close9': this.modifyRoleObject.close9,
            'unlock9': this.modifyRoleObject.unlock9,
            'reopen9': this.modifyRoleObject.reopen9,
            'print9': this.modifyRoleObject.print9,
            'auth9': this.modifyRoleObject.auth9,
            'view9': this.modifyRoleObject.view9,
            'view10': this.modifyRoleObject.view10,
            'view11': this.modifyRoleObject.view11,
            'view12': this.modifyRoleObject.view12,
            'view13': this.modifyRoleObject.view13,
            'view14': this.modifyRoleObject.view14,
            'new15': this.modifyRoleObject.new15,
            'copy15': this.modifyRoleObject.copy15,
            'delete15': this.modifyRoleObject.delete15,
            'close15': this.modifyRoleObject.close15,
            'unlock15': this.modifyRoleObject.unlock15,
            'reopen15': this.modifyRoleObject.reopen15,
            'print15': this.modifyRoleObject.print15,
            'auth15': this.modifyRoleObject.auth15,
            'view15': this.modifyRoleObject.view15,
            'new16': this.modifyRoleObject.new16,
            'copy16': this.modifyRoleObject.copy16,
            'delete16': this.modifyRoleObject.delete16,
            'close16': this.modifyRoleObject.close16,
            'unlock16': this.modifyRoleObject.unlock16,
            'reopen16': this.modifyRoleObject.reopen16,
            'print16': this.modifyRoleObject.print16,
            'auth16': this.modifyRoleObject.auth16,
            'view16': this.modifyRoleObject.view16,
            'new17': this.modifyRoleObject.new17,
            'copy17': this.modifyRoleObject.copy17,
            'delete17': this.modifyRoleObject.delete17,
            'close17': this.modifyRoleObject.close17,
            'unlock17': this.modifyRoleObject.unlock17,
            'reopen17': this.modifyRoleObject.reopen17,
            'print17': this.modifyRoleObject.print17,
            'auth17': this.modifyRoleObject.auth17,
            'view17': this.modifyRoleObject.view17,
            'new18': this.modifyRoleObject.new18,
            'copy18': this.modifyRoleObject.copy18,
            'delete18': this.modifyRoleObject.delete18,
            'close18': this.modifyRoleObject.close18,
            'unlock18': this.modifyRoleObject.unlock18,
            'reopen18': this.modifyRoleObject.reopen18,
            'print18': this.modifyRoleObject.print18,
            'auth18': this.modifyRoleObject.auth18,
            'view18': this.modifyRoleObject.view18,
            'new19': this.modifyRoleObject.new19,
            'copy19': this.modifyRoleObject.copy19,
            'delete19': this.modifyRoleObject.delete19,
            'close19': this.modifyRoleObject.close19,
            'unlock19': this.modifyRoleObject.unlock19,
            'reopen19': this.modifyRoleObject.reopen19,
            'print19': this.modifyRoleObject.print19,
            'auth19': this.modifyRoleObject.auth19,
            'view19': this.modifyRoleObject.view19,
            'new20': this.modifyRoleObject.new20,
            'copy20': this.modifyRoleObject.copy20,
            'delete20': this.modifyRoleObject.delete20,
            'close20': this.modifyRoleObject.close20,
            'unlock20': this.modifyRoleObject.unlock20,
            'reopen20': this.modifyRoleObject.reopen20,
            'print20': this.modifyRoleObject.print20,
            'auth20': this.modifyRoleObject.auth20,
            'view20': this.modifyRoleObject.view20,
            'new24': this.modifyRoleObject.new24,
            'copy24': this.modifyRoleObject.copy24,
            'delete24': this.modifyRoleObject.delete24,
            'close24': this.modifyRoleObject.close24,
            'unlock24': this.modifyRoleObject.unlock24,
            'reopen24': this.modifyRoleObject.reopen24,
            'print24': this.modifyRoleObject.print24,
            'auth24': this.modifyRoleObject.auth24,
            'view24': this.modifyRoleObject.view24,
            // 'view16': this.modifyRoleObject.view16,
            // 'view17': this.modifyRoleObject.view17,
            // 'view18': this.modifyRoleObject.view18,
            // 'view19': this.modifyRoleObject.view19,
            // 'view20': this.modifyRoleObject.view20,
            // 'view21': this.modifyRoleObject.view21,
            // 'view22': this.modifyRoleObject.view22,
             'view23': this.modifyRoleObject.view23,
            'maker': this.modifyRoleObject.maker,
            'makerDtStamp': this.modifyRoleObject.makerDtStamp,
            'checkerId': this.modifyRoleObject.checkerId,
            'verifierId':this.modifyRoleObject.verifierId,
            'checkerDtStamp': this.modifyRoleObject.checkerDtStamp,
            'recordStatus': this.modifyRoleObject.recordStatus,
            'authStatus': this.modifyRoleObject.authStatus,
            'firstTimeAuth':this.modifyRoleObject.firstTimeAuth
        }
      };
      this.router.navigate(['/roles/details'], navigationExtras);
      //this.router.navigate(['/roles/search'], navigationExtras);
    }''
    onPaginateChange(event)
    {
      console.log(event);
     // console.log(this.pageSize);
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      console.log(event.pageSize);
      console.log(event.pageIndex);   
    }

    
   /* getRolesForRole() {
      this.roleService.getAllRoles().subscribe(data => {
        this.allRoles = data;
       // console.log(this.allRoles);
        // this.roleCodes.auth1 = 'true';
        for (let i = 0; i < this.allRoles.length; i++) {
          // const e//lement = a//rray[i];
          // let roles = new Roles();
          // const userRoles = new Array();
          console.log(this.userRoles.length);
           for (let j = 0; j < this.userRoles.length; j++) {
           // let k = 0;
              if (this.userRoles[j] === this.allRoles[i].roleName) {
  
                console.log('COMPARING');
               // userRoles[k++] = this.allRoles[j];
               // console.log('roles ' + userRoles);
                if (this.allRoles[i].delete1 === 'true') {
                  console.log('delete1');
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
                  console.log('new2');
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
                  console.log('new3');
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
                  console.log('new4');
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
           
           console.log(this.roleCodes);
  
          // roles = userRoles[i];
  
  this.cdr.markForCheck();
  
  
        }
        });
    } */
}
