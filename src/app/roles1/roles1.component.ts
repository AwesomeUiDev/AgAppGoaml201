import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Roles } from './models/roles';
import { Permission } from './models/rolePermission';
import { RoleService } from './roles.service';
import {fmosrolesdata} from './models/fmosroledata';
import Swal from 'sweetalert2';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-roles',
  templateUrl: './roles1.component.html',
  styleUrls: ['./roles1.component.css']
})
export class Roles1Component implements OnInit {
  @ViewChild('resetSubmitbtn') resetSubmitbtn: ElementRef<HTMLElement>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  submitted = false;
  rowPermission: boolean;
  fms: boolean;
  fmsMonitor: boolean;
  ras: any;
  fmsbutton: any;
  responseError: any;
  submit: any;
  next: any;
  adminbutton: any;
  fmsmonitoring: any;
  medianPermission: any;
  check = 0;
  select1: boolean = false;
  role: Roles = new Roles();
  permission: Permission;
  username: string;
  adminPermission: any;
  fmsbuttonPermission: any;
  fmsmonitorPermission: any;
  rasbuttonPermission: any;
  medianbuttonPermission: any;
  //dyn roles
  displayedcolumns:any=[];
  previouschecklist:any=[];
  checkedlist:any=[];
  selection = new SelectionModel(true, []);
  storechecklist:any=[];
  auditlogdata:any;
  dummydata:any = {roles:{name:'fms', description:'role desc'},
    tabslist:[
        // {tabname:'Admin', 
        // screens:['database', 'application', 'customer', 'employee'],
        // screenlist:[{screenname:'database', permission:111111},
        //             {screenname:'application', permission:111110},
        //             {screenname:'customer', permission:111100},
        //             {screenname:'employee', permission:111000}],
        // labels:['new', 'edit', 'view', 'delete', 'print', 'auth'],
        // },
        // {tabname:'FMS', 
        // screens:['fms', 'application', 'customer', 'report'],
        // labels:['new', 'edit', 'view', 'delete', 'print', 'auth'],
        // screenlist:[{screenname:'fms', permission:101100},
        // {screenname:'application', permission:101100},
        // {screenname:'customer', permission:101100},
        // {screenname:'report', permission:101100}],
        // },
        // {tabname:'FMS Monitoring', 
        // screens:['FMS Monitoring', 'application', 'customer', 'employee'],
        // labels:['new', 'edit', 'view', 'delete', 'print', 'auth'],
        // screenlist:[{screenname:'FMS Monitoring', permission:101100},
        // {screenname:'application', permission:101100},
        // {screenname:'customer', permission:101100},
        // {screenname:'employee', permission:101100}],
        // } // by usha 26/05/20
        //by usha 26/05/20
        {tabname:'GOAML',  
        screens:['Data Extraction', 'Generate XML', 'Authorize XML', 'Message','System Configuration','Reporting maintenance',
        'Error Monitoring','External System Maitenance','External System Summary','Excel Mapping','MTS Upload','MTS  Upload Summary','STR'],
        labels:['new', 'edit', 'view', 'delete', 'print', 'auth'],
        screenlist:[{screenname:'Data Extraction', permission:100000},
        {screenname:'Generate XML', permission:100000},
        {screenname:'Authorize XML', permission:100000},
        {screenname:'Message', permission:100000},
        {screenname:'System Configuration', permission:100000},
        {screenname:'Reporting maintenance', permission:100000},
        {screenname:'Error Monitoring', permission:100000},
        {screenname:'External System Maitenance', permission:100000},
        {screenname:'External System Summary', permission:100000},
        {screenname:'Excel Mapping',permission:100000},
        {screenname:'MTS Upload', permission:100000},
        {screenname:'MTS  Upload Summary', permission:100000},
        {screenname:'STR', permission:100000},
        {screenname:'Fetching', permission:100000},
        {screenname:'GModification Process', permission:100000},
        {screenname:'Verification', permission:100000},
        {screenname:'Fetching', permission:100000},
        {screenname:'Process', permission:100000},
        {screenname:'Verification Finance', permission:100000},
        {screenname:'Verification Credit', permission:100000}],
    }
      ]
  };
  //datasource:any={headers:[], list:[]};
  datasource:any={list:[], checkedlist:[]};
  rolessorteddata:any;
  newfmostabsdata:any={tabslist:[]};
  public selectedtab: string;
  fmosRolesData:fmosrolesdata = new fmosrolesdata();
  enabledefaulttrigger:boolean=true;

  //end of dyn roles
  constructor(private roleService: RoleService,
    private _formBuilder: FormBuilder,
    private cdr:ChangeDetectorRef) { }
  newRole(): void {
    this.submitted = false;
    this.role = new Roles();
  }

  ngOnInit() {
    this.selectedtab = this.dummydata.tabslist[0].tabname;
    this.username = localStorage.getItem('userFromLogin');
    this.getPermission();
    this.rowPermission = false;
    this.fms = false;
    this.fmsMonitor = false;
    this.adminbutton = true;
    this.fmsbutton = true;
    this.fmsmonitoring = true;
    this.myFunc();
    this.medianPermission = false;

    this.changeAdmin();

  }

  selectionChanged(item){
    console.log("Selected value: " + item.value);
  }
 /* getPermission() {
    this.roleService.getAllPermission().subscribe(data => {
      this.permission = data;
      console.log(this.permission);
      this.adminPermission = this.permission.admin;
      this.fmsbuttonPermission = this.permission.fms;
      this.fmsmonitorPermission = this.permission.fmsMonitoring;
      this.rasbuttonPermission = this.permission.ras;
      this.medianbuttonPermission = this.permission.median;
    });
  } */
 


  button() {
    this.adminPermission = this.permission.admin;
    this.fmsbuttonPermission = this.permission.fms;
    this.fmsmonitorPermission = this.permission.fmsMonitoring;
    this.rasbuttonPermission = this.permission.ras;
    this.medianbuttonPermission = this.permission.median;
  }
  save() {
    this.role.maker = this.username;
    let permissionslist = [];
    for(let i=0;i<this.rolessorteddata.length;i++)
    {
        let screenoccurence = this.rolessorteddata[i].screenlist;
        for(let ind=0;ind<screenoccurence.length;ind++)
        {
            // if(screenoccurence[ind].permission.toString() != screenoccurence[ind].newpermission.toString())
            // {
              let gettabindex = this.fmosRolesData.permissionDto.findIndex(function(item){ return item.permissionId.screenId == screenoccurence[ind].screenid});
              if(gettabindex >= 0)
              {
                 this.fmosRolesData.permissionDto[gettabindex].permissionId.roleName = this.role.roleName;
                 let obj = {'permissionId' : this.fmosRolesData.permissionDto[gettabindex].permissionId};
                 obj["permissions"] = screenoccurence[ind].newpermission;
                 permissionslist.push(obj);
              }
            // } //if
        } //for loop endng
    } //for loop endng
    let newRole:any = {roleDto:this.role};
    newRole.permissionDto = permissionslist;
    this.role.roleName=this.role.roleName.trim();
    this.role.roleDesc=this.role.roleDesc.trim();
    this.roleService.createnewrole(newRole)
      .subscribe(role => {
        console.log(role);
        let element:HTMLElement = this.resetSubmitbtn.nativeElement;
        element.click();
        this.auditlogdata = role;
        if (role) {
          let userId = localStorage.getItem('userFromLogin');
          this.roleService.fetchNewRolePermissions(userId);
        //  Swal.fire("Success!");
        Swal.fire("Role is Created!");
        } else {
         Swal.fire("Role Name Exist!");
        }
        this.cdr.markForCheck();
      }, error => {

        if (HttpErrorResponse) {
          Swal.fire('Oops...', 'Server Error!', 'error')
        
        }

      });
    this.role = new Roles();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  changeAdmin() {
    console.log('change status call');
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
    this.rowPermission = false;
    this.fms = false;
    this.fmsMonitor = false;
    this.fmsbutton = false;
    this.medianPermission = true;
    this.ras = false;
  }
  changeRas() {
    this.rowPermission = false;
    this.fms = false;
    this.fmsMonitor = false;
    this.fmsbutton = false;
    this.medianPermission = false;
    this.ras = true;
  }


  public selectCheckBox() {
    this.check = 1;


  }
  myFunc() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }
  selectAll() {
    if (this.select1) {
      this.select1 = false;
    }
    else {
      this.select1 = true;
     
    }
  }

  /* sneha code */
 
  rolestype(index:number)
  {
    if(this.newfmostabsdata && this.newfmostabsdata.tabslist && this.newfmostabsdata.tabslist[index].tabname)
    {
      this.selectedtab = this.newfmostabsdata.tabslist[index].tabname;
    }
     let indexdata = this.newfmostabsdata.tabslist[index];
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
     console.log(screenslist);
     this.datasource.list = new MatTableDataSource(screenslist);
     this.selection.clear();
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

  /* appendcheckclass(list)
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
let gettabdata = [];
let existingpermission:any='';
if(gettabindex > -1)
{
  gettabdata = this.rolessorteddata[gettabindex].screenlist[rowindex];
  existingpermission = this.rolessorteddata[gettabindex].screenlist[rowindex].newpermission.toString();
}
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
    console.log(this.newfmostabsdata.tabslist[gettabindex]);
    this.newfmostabsdata.tabslist[gettabindex].screenlist[rowindex].newpermission = uncheckpermission;
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
console.log(this.newfmostabsdata);
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
let gettabdata = [];
if(gettabindex > -1)
   gettabdata = this.rolessorteddata[gettabindex].screenlist;
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

preparingPermissiondto(screenlist, permissionlength)
{
   let permissionlist = [];
   if(!screenlist){
     screenlist=[];
   }
   for(let i=0;i<screenlist.length;i++)
   {
      let permissionidobj = {roleName:'', screenId:screenlist[i].screensId.screenId};
      let permissionarray=[];
      for(let j=0;j<permissionlength;j++)
      {
         permissionarray.push(0);
      }
      let permissionstring=permissionarray.join("");
      permissionlist.push({permissionId:permissionidobj, permissions:permissionstring});
   } //for loop endng
   return permissionlist;
}

getPermission()
{
this.roleService.fetchnewscreenlabels().subscribe(data => {
   let labelDtolength = 0;
   if(data && data.labelDto && data.labelDto.length)
        labelDtolength = data.labelDto.length;
   let permissionsarray =  this.preparingPermissiondto(data.screenDto, labelDtolength);
   this.fmosRolesData.roleDto = data.roleDto;
   this.fmosRolesData.permissionDto=permissionsarray;
   this.fmosRolesData.tabDto = data.tabDto;
   this.fmosRolesData.labelDto = data.labelDto;
   this.fmosRolesData.screenDto = data.screenDto;
   let arrayC=[];
   let arrayB = data.screenDto;
   let labelsarray = data.labelDto;
  
   //fetch screens for tabs
  // data.tabDto.forEach(function(element){
    if(!data.tabDto){
      data.tabDto=[];
    }
    for(let tabindex=0;tabindex<data.tabDto.length;tabindex++)
  {
    let screen=[];
    let screenslist=[];
    let element = data.tabDto[tabindex];
    screenslist = this.getscreenlist(arrayB, element, permissionsarray, screen, screenslist);
    //fetching screen list 
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
  this.newfmostabsdata.tabslist = arrayC;
  this.rolestype(0);
   //end of fetching screen for tabs
});
}

reset()
 {
   this.rolessorteddata = [];
   this.selection.clear();
   this.newfmostabsdata.tabslist[0].screenlist[0].newpermission = this.newfmostabsdata.tabslist[0].screenlist[0].permission;
   for(let i=0;i<this.checkedlist.length;i++)
   {
       /*for(let j=0;j<this.checkedlist[i].length;j++)
       {
           this.checkedlist[i][j].value = false;
       }*/
       this.checkedlist[i].forEach(function(entry, index) {
         entry.value = false;
      }); 
   }
   for(let i=0;i<this.newfmostabsdata.tabslist.length;i++)
   {
      for(let j=0;j<this.newfmostabsdata.tabslist[i].screenlist.length;j++)
      {
        this.newfmostabsdata.tabslist[i].screenlist[j].newpermission = this.newfmostabsdata.tabslist[i].screenlist[j].permission;
      } //for loop endng
   } //for loop endng  
   this.cdr.detectChanges();
   this.cdr.markForCheck();
   console.log(this.checkedlist);
 }

//  reset()
//  {
//    this.rolessorteddata = [];
//    this.selection.clear();
//    this.newfmostabsdata.tabslist[0].screenlist[0].newpermission = this.newfmostabsdata.tabslist[0].screenlist[0].permission;
//    for(let i=0;i<this.checkedlist.length;i++)
//    {
//        for(let j=0;j<this.checkedlist[i].length;j++)
//        {
//            this.checkedlist[i][j].value = false;
//        }
//    }
//    for(let i=0;i<this.newfmostabsdata.tabslist.length;i++)
//    {
//       for(let j=0;j<this.newfmostabsdata.tabslist[i].screenlist.length;j++)
//       {
//         this.newfmostabsdata.tabslist[i].screenlist[j].newpermission = this.newfmostabsdata.tabslist[i].screenlist[j].permission;
//       } //for loop endng
//    } //for loop endng 
//    console.log('reset mthd'); 
//  }










/* end of sneha code */

}



