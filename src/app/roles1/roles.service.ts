import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import { AppConstants } from 'app/config/app.constant';
import { Roles } from './models/roles';
import { BehaviorSubject } from 'rxjs';
import {RolePermissions} from './models/fmosNewRolePermissions';
import {permissionsLabels} from './models/fmosNewRolePermissions';
//import { AppConstants } from 'src/app/shared/config/app.constant';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class RoleService {
  _baseURL : string;
  _fmosbaseURL:string;
  storeuserpermissions:object;
  public username: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public tabData:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  //public screenLabelList = new BehaviorSubject([]);
  public screenLabelList = new BehaviorSubject<permissionsLabels>(new permissionsLabels());
  labelData = this.screenLabelList.asObservable();
  screenData = new permissionsLabels();
  public screenwisePermissions:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private httpHeader = { header: new HttpHeaders({ 'Content-type': 'application/json' }) };
  constructor(private http: HttpClient) { 
    // this._baseURL = environment.url3 + '/role';
    this._fmosbaseURL = environment.url3+'/fmsRoles'; 
  }

  createRoles(role: Object): Observable<Object> {
    // return this.http.delete(`${this._baseURL}/${userId}/${userIdLoggedIn}`, { responseType: 'text' });
    return this.http.post(`${this._baseURL}` + '/createRole', role);
  }
  
  getRoleByRoleName(roleName: String): Observable<any> {
    return this.http.get<Roles>(`${this._baseURL}/${roleName}`);
  }

  getAllRoles(): Observable<any> {
    //return this.http.get(`${this._baseURL}` + '/roles');
   return this.http.get(`${this._fmosbaseURL}` + '/fetchAllRolesSummary');
  }

  fetchAllAuthRoles(): Observable<any> {
    return this.http.get(`${this._baseURL}` + '/fetchAuthRoles');
  }

  modifyRoleService(modifyRole: Roles) {
    return this.http.put<boolean>(`${this._baseURL}` + `/modifyRole`, modifyRole);
  }

  newmodifyRoleService(modifyRole: permissionsLabels,userName:string) {
    return this.http.put<boolean>(`${this._fmosbaseURL}` + `/modifyRole/${userName}`, modifyRole);
  }

  verifyRole(roleName: string, userIdLoggedIn: string): Observable<Object> {
   // return this.http.get(`${this._baseURL}/${roleName}/${userIdLoggedIn}`);
   return this.http.get(`${this._fmosbaseURL}/authorize/${roleName}/${userIdLoggedIn}`);
  }

  deleteRole(roleName: string, userIdLoggedIn: string): Observable<Object> {
    return this.http.delete(`${this._fmosbaseURL}/delete/${roleName}/${userIdLoggedIn}`);
    // return this.http.delete(`${this._baseURL}/${roleName}/${userIdLoggedIn}`, { responseType: 'text' });
  }
  closelockRecord(roleName: string, userIdLoggedIn: string): Observable<Object> {
    return this.http.get(`${this._fmosbaseURL}/close/${roleName}/${userIdLoggedIn}`);
  }
  reopenRecord(roleName: any, userIdLoggedIn: string): Observable<Object> {
    return this.http.get(`${this._fmosbaseURL}/reopen/${roleName}/${userIdLoggedIn}`);
  }


  //permission
  getAllPermission(): Observable<any> {

    return this.http.get(`${this._baseURL}` + '/permission');
  }

  fetchnewscreenlabels():Observable<any>
  {
    return this.http.get(`${this._fmosbaseURL}` + '/fetchTabLabelAndScreen');
  }

  createnewrole(roledata):Observable<any>
  {
    return this.http.post(`${this._fmosbaseURL}` + '/saveRoleDetails', roledata);
  }

  fetchfmosroles(): Observable<any>
  {
    const userIdLoggedIn = localStorage.getItem('userFromLogin');
    return this.http.get(`${this._fmosbaseURL}/allRolePermissionForUser/${userIdLoggedIn}`);

  }


  fetchNewRolePermissions(userIdLoggedIn:string)
  {
    this.http.get(`${this._fmosbaseURL}/allRolePermissionForUser/${userIdLoggedIn}`).subscribe(data => {
       localStorage.setItem('userPermissions',JSON.stringify(data));
       this.storeuserpermissions = data;
       setTimeout(() => {
        this.EnablescreenPermissions();
        }, 500);
    })
  }

  EnablescreenPermissions()
  {
    let userPermissions = JSON.parse(localStorage.getItem('userPermissions'));
    let permissionlist=[];
    if(userPermissions)
    {
      let labelsdata = userPermissions.labels;
      labelsdata.sort((a, b) => a.labelId - b.labelId);
      let screensdata = userPermissions.screenAndPermissionsDTO;
      let viewindex = labelsdata.findIndex(function(item){ return item.labelName.toLowerCase() == 'view'});;
      for(let i=0;i<screensdata.length;i++)
      {
          let data =  screensdata[i].permissions.toString();
          if(data.charAt(viewindex) == 1 || data.charAt(viewindex) == "1")
          {
              permissionlist.push(screensdata[i].screenName);
          }
      } //for loop endng
    } //if
    console.log(permissionlist);
      this.screenwisePermissions.next(permissionlist);
  }

 fetchScreenPermissions(screenName:string)
 {
    let userPermissions = JSON.parse(localStorage.getItem('userPermissions'));
    console.log('scr', screenName,userPermissions);
    let labellist:any = [];
    this.screenData = new permissionsLabels();
    if(userPermissions)
    {
       let labelList = userPermissions.labels;
       if(labelList)
       {
          labelList.sort((a, b) => a.labelId - b.labelId);
       }
       let permissionList = userPermissions.screenAndPermissionsDTO;
      if(permissionList)
      {
       let idexist = permissionList.findIndex(function(item){ return item.screenName.toLowerCase() == screenName.toLowerCase()}); 
       if(idexist >= 0)
       {
           let rolelist =  permissionList[idexist];
           let screenvisibility = rolelist.permissions.toString();
           for(let i=0;i<screenvisibility.length;i++)
           {
             if(screenvisibility.charAt(i) == 1)
             {
                labelList[i].exist = true;
                labelList[i].labellowercase = labelList[i].labelName.toLowerCase();
                labellist.push(labelList[i]);
                this.screenData[labelList[i].labellowercase] = labelList[i];
             }
           } //for loop endng
       } //if screen data exist
      } //if permission list exist
    } //if permissions exist
    console.log('scr', this.screenData);
    this.screenLabelList.next(this.screenData);
 }

  //dynamic roles
    fetchdynamicrolesdata(roleName:string): Observable<any> 
    {
       return this.http.get(`${this._fmosbaseURL}/fetchRoleData/${roleName}`);
    }
  //end of dynamic roles

    preparingrolesdata(data)
    {
      let arrayC=[];
      let arrayB = data.screenDto;
      let labelsarray = data.labelDto;
      let permissionsarray = data.permissionDto;
      //fetch screens for tabs
      data.tabDto.forEach(function(element){
       let screen=[];
       let screenslist=[];
       //fetching screen list 
       arrayB.forEach((items) => {
         if(element.tabId == items.screensId.tabId)
         {
           let idexist = permissionsarray.findIndex(function(item){ return item.permissionId.screenId == items.screensId.screenId}); 
            screen.push(items.screenName);
            screenslist.push({screenname:items.screenName, screenid:items.screensId.screenId, permission: permissionsarray[idexist].permissions});
         }
      })
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
     });
      this.tabData.next(arrayC);
    }
}

