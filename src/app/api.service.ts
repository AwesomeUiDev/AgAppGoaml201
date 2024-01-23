import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { User } from './user-management/user';
import { Role } from './role-management/role';
import { DM_REPORTS } from './finance/DM_REPORTS';
import { FctCreditBalance } from './mda/FctCreditBalance';
import { Login } from './login/login';
import { Observable, BehaviorSubject } from 'rxjs';
import { DatamartRefreshLog } from './datamart-refresh/DatamartRefreshLog';
import { TwMartRefresh } from './datamart-refresh/TwMartRefresh';
import { PackageDTO } from './datamart-refresh/staging/PackageDTO';
import { TvDatamart } from './datamart-refresh/TvDatamart';
import { TmModExtractionDetails } from './datamart-refresh/TmModExtractionDetails';
import { UserHomeComponent } from './user-home/user-home.component';
import { TvAdjustmentValue } from './finance/finance-adjustment-value/TvAdjustmentValue';
import { ListDTO } from './finance/finance-adjustment-value/ListDTO';
import { MdMultiSqlDetails } from './datamart-refresh/datamart-refresh-maintenance/MdMultiSql';
// import { ChangePasswordDTO } from './change-password/ChangePassword';
import { Dept } from './user-management/Dept';
import { FctIfrs } from './ifrs/fctIfrs';
import { SecurityDto } from 'src/app/security-dto';
// import { environment } from 'src/environments/environment';
import {environment} from 'src/environments/environment';
import { Router, ActivatedRouteSnapshot, Params } from '@angular/router';
import { ChangePasswordDTO } from './change-password/ChangePassword';

//export const GOAML_URL = 'http://localhost:8182';
interface IRoutePart {
  title: string,
  breadcrumb: string,
  params?: Params,
  url: string,
  urlSegments: any[]
}

@Injectable({
  providedIn: 'root'
})


export class APIService {
 
   API_URL = environment.url3;

  FILE_URL = environment.fileurl;
// API_URL = 'http://localhost:8899';
 //FILE_URL = 'http://localhost:8777';
 
 
  

  private uri = environment.excel + '/api';
  private uriForExt = environment.excel + '/extsys';
  private uriTag = environment.excel + '/tag';
 http: HttpClient;

  constructor(private httpClient: HttpClient,  http: HttpClient) { }
  public routername: BehaviorSubject<any> = new BehaviorSubject<any>('');
  externalSystem = new BehaviorSubject<any[]>([]);
  externalSystem$ = this.externalSystem.asObservable();

  
  
  


  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {


    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.FILE_URL}/upload`, formdata, {
      reportProgress: true,
      responseType: 'text'

    }
    );
    return this.httpClient.request(req);
  }

 storeroutername(value:string)
 {
    this.routername.next(value);
 }

  financeUploadService(file: File, reportName, Exec_Date): Observable<HttpEvent<{}>> {


    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.FILE_URL}/financeUpload/${reportName}/${Exec_Date}`, formdata, {
      reportProgress: true,
      responseType: 'text'

    }
    );
    return this.httpClient.request(req);
  }

  financeDownloadService(reportName, Exec_Date) {
    return this.httpClient.get<any[]>(`${this.FILE_URL}/financeDownload/${reportName}/${Exec_Date}`);
  }

  // transferingUserObject(user:User)
  // {
  //   if(user.userType == 'N')
  //   {
  //     getUserObject(user);
  //   }
  // }

  //get User
  getUsers(fetchUser) {
    return this.httpClient.post<User[]>(`${this.API_URL}/user/viewUsers`, fetchUser);
  }

  getRolesForUserService(roleType) {
    return this.httpClient.get<string[]>(`${this.API_URL}/role/getRolesForUser/${roleType}`);
  }

  getRolesForViewPageService() {
    return this.httpClient.get<string[]>(`${this.API_URL}/role/getRolesForViewPage`);
  }
  //post user
  createUserService(newUser: User) {
    return this.httpClient.post<HttpEvent<string>>(`${this.API_URL}/user/createUser`, newUser);
  }

  modifyUserService(modifyUser: User) {
    return this.httpClient.post<boolean>(`${this.API_URL}/user/modifyUser`, modifyUser);
  }

  moldifyRoleService(modifyRole: Role) {
    console.log(modifyRole);
    return this.httpClient.post<boolean>(`${this.API_URL}/role/modifyRole`, modifyRole);

  }

  deleteUserService(userId) {
    return this.httpClient.delete<boolean>(`${this.API_URL}/user/deleteById/${userId}`);
  }

  deleteRoleService(roleRef) {
    return this.httpClient.delete<boolean>(`${this.API_URL}/role/deleteRoleById/${roleRef}`);
  }

  //get role
  getRoles(fetchRole) {
    return this.httpClient.post<Role[]>(`${this.API_URL}/role/viewRoles`, fetchRole);
  }
  //post role
  createRole(role: Role) {
    return this.httpClient.post<boolean>(`${this.API_URL}/role/createRole`, role)
  }

  staging(lastExecDate, branchSelect) {
    return this.httpClient.post<object>(`${this.API_URL}/staging`, { branchSelect, lastExecDate });
  }

  datamartRefresh(reportName) {
    return this.httpClient.get<object>(`${this.API_URL}/refresh`, reportName);
  }

  master(date, branch) {
    return this.httpClient.post<object>(`${this.API_URL}/master`, { date, branch });
  }

  fileUpload(date, rName, file) {
    return this.httpClient.post<object>(`${this.API_URL}/fileUpload`, { date, rName, file });
  }

  ibCapitalRefresh(date) {
    return this.httpClient.post<object>(`${this.API_URL}/ibCapitalRefresh`, date);
  }

  carMaintenance(date) {
    return this.httpClient.post<object>(`${this.API_URL}/carMaintenance`, date);
  }

  riskAdjustmentValues(department, date) {
    return this.httpClient.get<object>(`${this.API_URL}/riskAdjustmentValues`, department); //date
  }
  riskRefresh(date) {
    return this.httpClient.get<object>(`${this.API_URL}/riskRefresh`, date);
  }

  sfInvestmentFilter(date) {
    return this.httpClient.get<object>(`${this.API_URL}/sfInvestmentFilter`, date);
  }

  changePassword(passwordDTO: ChangePasswordDTO) {
    return this.httpClient.post<boolean>(`${this.API_URL}/user/changePassword`, passwordDTO);
  }

  reportListByDeptService(dept) {
    return this.httpClient.get<string[]>(`${this.API_URL}/finance/reportListByDept/${dept}`);
  }

  reportNameListService() {
    return this.httpClient.get<DM_REPORTS[]>(`${this.API_URL}/finance/reportList`);
  }

  columnNamesService(reportName) {
    return this.httpClient.get<string[]>(`${this.API_URL}/finance/columnNames/${reportName}`);
  }

  getdeptListService() {
    return this.httpClient.get<string[]>(`${this.API_URL}/finance/deptNames`);
  }

  // getMdaFieldsService(d_mis_date:Date)
  // {
  //   return this.httpClient.get<FctCreditBalance[]>(`${this.API_URL}/mda/fetchCreditBalance/${d_mis_date}`);
  // }
  beforefetchService(execDate)
  {
    return this.httpClient.get<boolean>(`${this.API_URL}/mda/beforeFetch/${execDate}`);
  
  }

  getMdaFieldsService(d_mis_date: Date) {
    return this.httpClient.get<FctCreditBalance[]>(`${this.API_URL}/mda/fetchCreditBalance/${d_mis_date}`);
  }

  getCreditBalanceModList(d_mis_date: Date) {
    return this.httpClient.get<FctCreditBalance[]>(`${this.API_URL}/mda/fetchCreditBalanceMod/${d_mis_date}`);
  }

  loginService(login: Login,ipAddress:string) {
    return this.httpClient.post<User>(`${this.API_URL}/login/credentials/${ipAddress}`, login);
  }

  startProcess() {
    console.log("api method");
    return this.httpClient.get<boolean>(`${this.API_URL}/mda/callCreditBalanceFunc`);
  }

  fetchCreditBalanceMod(d_mis_date: Date) {
    return this.httpClient.get<FctCreditBalance[]>(`${this.API_URL}/mda/fetchCreditBalanceMod/${d_mis_date}`);
  }

  getRoleInfoService(roleId) {
    console.log(roleId);
    return this.httpClient.get<string[]>(`${this.API_URL}/role/getRoleInfo/${roleId}`);
  }

  getRoleActiveStatusService(roleId) {
    return this.httpClient.get<Role>(`${this.API_URL}/role/roleActiveStatus/${roleId}`);
  }


  // fetchDatamartRefreshLog(exec_date:Date,process:string)
  // {
  //   return this.httpClient.get<DatamartRefreshLog[]>(`${this.API_URL}/datamartRefresh/fetchDatamartRefreshLog/${exec_date}/${process}`);
  // }

  stagingService(exe_date, branch, modules) {
    console.log(exe_date);
    console.log(branch);
    return this.httpClient.get<TvDatamart[]>(`${this.API_URL}/datamartRefresh/staging/${exe_date}/${branch}/${modules}`);
  }
  masterService(exe_date, branch, modules) {
    console.log(exe_date);
    console.log(branch);
    return this.httpClient.get<TvDatamart[]>(`${this.API_URL}/datamartRefresh/master/${exe_date}/${branch}/${modules}`);
  }

  financeReportListService() {
    return this.httpClient.get<DM_REPORTS[]>(`${this.API_URL}/datamartRefresh/reportList`);
  }

  stgLastExecDateService() {
    return this.httpClient.get<Date>(`${this.API_URL}/datamartRefresh/stgLastExecDate`);
  }
  masterLastExecDateService() {
    return this.httpClient.get<Date>(`${this.API_URL}/datamartRefresh/masterLastExecDate`);
  }

  fetchDatamartRefreshLog(exec_date: Date, area: string) {
    return this.httpClient.get<DatamartRefreshLog[]>(`${this.API_URL}/datamartRefresh/fetchDatamartRefreshLog/${exec_date}/${area}`);
  }
  stagingRefreshButtonService(exe_date) {
    return this.httpClient.get<TvDatamart[]>(`${this.API_URL}/datamartRefresh/stagingRefresh/${exe_date}`);
  }
  masterRefreshButtonService(exe_date) {
    return this.httpClient.get<TvDatamart[]>(`${this.API_URL}/datamartRefresh/masterRefresh/${exe_date}`);
  }

  modulesListService() {
    return this.httpClient.get<TmModExtractionDetails[]>(`${this.API_URL}/datamartRefresh/moduleList`);
  }

  branchListService() {
    return this.httpClient.get<string[]>(`${this.API_URL}/datamartRefresh/branchList`);
  }

  reportListService() {
    return this.httpClient.get<string[]>(`${this.API_URL}/datamartRefresh/reportList`);
  }

  reportRefreshService(mis_date: string, branch: string, report: string) {
    return this.httpClient.get<HttpEvent<boolean>>(`${this.API_URL}/datamartRefresh/reportRefresh/${mis_date}/${branch}/${report}`);
  }

  eodReportRefreshService(mis_date: string, branch: string, report: string) {
    return this.httpClient.get<HttpEvent<boolean>>(`${this.API_URL}/datamartRefresh/eodReportRefresh/${mis_date}/${branch}/${report}`);
  }

  mdaDownloadExcel(mdaDbFileDatList) {
    console.log(mdaDbFileDatList);
    // this.httpClient.post(`http://localhost:8889/download`,mdaDbFileDatList);

    const formdata: FormData = new FormData();
    formdata.append('mdaDbFileDatList', mdaDbFileDatList);
    const req = new HttpRequest('POST', `${this.API_URL}/download`, formdata, {
      reportProgress: true,
      responseType: 'text'

    }
    );
    return this.httpClient.request(req);
  }

  dateValidate(exe_date) {
    return this.httpClient.get<HttpEvent<boolean>>(`${this.API_URL}/datamartRefresh/dateValidate/${exe_date}`);
  }

  getMaintenanceReportsService() {
    return this.httpClient.get<string[]>(`${this.API_URL}/datamartRefresh/maintenanceReports`);
  }

  getLinesForMaintenanceService(v_report_no) {
    return this.httpClient.get<MdMultiSqlDetails[]>(`${this.API_URL}/datamartRefresh/maintenanceLines/${v_report_no}`);
  }


  financeAdjustmentDeptListService() {
    return this.httpClient.get<string[]>(`${this.FILE_URL}/adjustmentDeptList`);
  }

  financeAdjustmentListService(department) {

    return this.httpClient.get<TvAdjustmentValue[]>(`${this.FILE_URL}/adjustmentList/${department}`);
  }

  financeAdjustmentSaveService(listDTO: ListDTO) {
    console.log(listDTO);
    //var x =JSON.stringify(list);
    //console.log(x);
    return this.httpClient.post<any>(`${this.FILE_URL}/adjustmentSave`, listDTO);
  }

  authorizeUserService(user: User) {
    return this.httpClient.post<User[]>(`${this.API_URL}/user/authorizeUser`, user);
  }

  authorizeRoleService(role: Role) {
    return this.httpClient.post<Role[]>(`${this.API_URL}/role/authorizeRole`, role);
  }

  reportParameterDataService(mdData) {
    console.log(mdData);
    return this.httpClient.post<boolean>(`${this.API_URL}/datamartRefresh/maintenanceData`, mdData);
  }

  forgotPasswordService(userId) {
    return this.httpClient.get<boolean>(`${this.API_URL}/user/resetPassword/${userId}`);
  }
  // saveDataSecurity(obj: SecurityDto) {
  //   return this.httpClient.post(`${this.API_URL}/securityPolicy/save`, obj)
  // }
  // fetchSecurityPolicyService() {
  //   return this.httpClient.get<SecurityDto>(`${this.API_URL}/securityPolicy/fetch`);
  // }
  // getSecurityPolicyForAuth() {
  //   return this.httpClient.get<SecurityDto[]>(`${this.API_URL}/authorization/getSecurityPolicy`);
  // }
   getLoggerSwitchService(loggerSwitch){
      console.log("switch call ",loggerSwitch);
      return this.httpClient.get(`${this.API_URL}/getSwitch/${loggerSwitch}`);
      
      }

  // getContacts(){
  //   return this.httpClient.get(`${this.API_URL}/contacts`);
  // }
  // createContact(contact){
  //   return this.httpClient.post(`${this.API_URL}/contacts/`,contact);
  // }
  // updateContact(contact){
  //   return this.httpClient.put(`${this.API_URL}/contacts/`,contact);
  // }
  // deleteContact(contact){
  //   return this.httpClient.delete(`${this.API_URL}/contacts/${contact.pk}`);
  // }

  assignDepartmentService(deptObject:Dept)
{
return this.httpClient.post<boolean>(`${this.API_URL}/dept/save`,deptObject);
}

getUserDeptService(userId)
{
return this.httpClient.get<Dept>(`${this.API_URL}/dept/getDept/${userId}`)
// const req = new HttpRequest('GET', `${this.API_URL}/dept/getDept/${userId}`,{
// reportProgress: true,
// responseType: 'text'

// }
// );
// return this.httpClient.request(req);
}

checkLastMasterDetailsService()
{
return this.httpClient.get<boolean>(`${this.API_URL}/datamartRefresh/lastMasterDetails`)
}

fetchAllVerificationCreditService(exec_date, lib_no) {
  return this.httpClient.get<FctIfrs[]>(`${this.API_URL}/ifrs/fetchAllCredit/${exec_date}/${lib_no}`);
}

fetchAllVerificationFinanceService(exec_date,lib_no) {
  return this.httpClient.get<FctIfrs[]>(`${this.API_URL}/ifrs/fetchAllFinance/${exec_date}/${lib_no}`);
}

callIfrsFunction(misDate)
{
  return this.httpClient.get<boolean>(`${this.API_URL}/ifrs/funcCall/${misDate}`);
}

//MDA
getAllAuditData(): Observable<any> {
  return this.http.get(`${this.uri}` + '/auditsList');

}
getAllAuditDataByDate(from: Date,to: Date)
{
  return this.http.get(`${this.uri}/dataauditsList/${from}/${to}`);
}
getProcessNameWithExtSys(extSysName): Observable<any> {
  return this.httpClient.get(`${this.uriForExt}/processCode/${extSysName}`);

}

// dashboard
// getAllDashboard(): Observable<any> {
//   return this.http.get(`${this.uri}` + '/dashboardchartdata');

// }


// external system
getAllExtSys(): Observable<any> {
  console.log("extsysdata", this.uriForExt);
  return this.httpClient.get(`${this.uriForExt}` + '/extsysdata');
}
getAllExtSysName(): Observable<any> {
  console.log("ext sys")
  return this.httpClient.get(`${this.uriForExt}` + '/extsysName');

}


fetchAllAuthExternalSystem(): Observable<any> {
  return this.http.get(`${this.uriForExt}` + '/fetchAuthExtSystem');
}
/* createExtSys(extSys: Object): Observable<Object> {
  let body = JSON.stringify(extSys);
  return this.httpClient.post(`${this.uriForExt}` + '/createExtSys', extSys);
} */
// modifyExtSysService(modifyextSys: Object) {
// return this.http.put<boolean>(`${this.uriForExt}` + `/modifyextSys`, modifyextSys);
// }
verifyExtSys(extSysName: string, userIdLoggedIn: string): Observable<Object> {
return this.http.get(`${this.uriForExt}/verify/${extSysName}/${userIdLoggedIn}`);
}
deleteExtSys(extSysName: string, userIdLoggedIn: string): Observable<Object> {
return this.http.delete(`${this.uriForExt}/${extSysName}/${userIdLoggedIn}`, { responseType: 'text' });
}
closelockRecordExtSys(extSysName: string, userIdLoggedIn: string): Observable<Object> {
return this.http.get(`${this.uriForExt}/close/${extSysName}/${userIdLoggedIn}`);
}
reopenRecordExtSys(extSysName: any, userIdLoggedIn: string): Observable<Object> {
return this.http.get(`${this.uriForExt}/reOpen/${extSysName}/${userIdLoggedIn}`);
}





// tag service
getAllTags(): Observable<any> {
return this.http.get(`${this.uriTag}` + '/tagdata');

}
fetchAllAuthTags(): Observable<any> {
return this.http.get(`${this.uriTag}` + '/fetchAuthTags');
}
createTag(tags: Object): Observable<Object> {
return this.http.post(`${this.uriTag}` + '/createTag', tags);

}
// modifyTagService(modifytag: Object) {
// return this.http.put<boolean>(`${this.uriTag}` + `/modifytag`, modifytag);
// }
verifyTag(tagName: string, userIdLoggedIn: string): Observable<Object> {
return this.http.get(`${this.uriTag}/verify/${tagName}/${userIdLoggedIn}`);
}
deleteTag(tagName: string, userIdLoggedIn: string): Observable<Object> {
return this.http.delete(`${this.uriTag}/${tagName}/${userIdLoggedIn}`, { responseType: 'text' });
}
closelockTag(tagName: string, userIdLoggedIn: string): Observable<Object> {
return this.http.get(`${this.uriTag}/close/${tagName}/${userIdLoggedIn}`);
}
reopenRecordTag(tagName: any, userIdLoggedIn: string): Observable<Object> {
return this.http.get(`${this.uriTag}/reOpen/${tagName}/${userIdLoggedIn}`);
}
/* modifyExtSysService(modifyextSys: Object) {
  return this.httpClient.put<boolean>(`${this.uriForExt}` + `/modifyextSys`, modifyextSys);
} */

modifyExtSysService(modifyextSys: Object,userName:string){
  console.log("service username",userName)
  return this.httpClient.put(`${this.uriForExt}/modifyextSys/${userName}`, modifyextSys);
}
createExtSys(extSys: Object,userName:string): Observable<Object> {
  let body = JSON.stringify(extSys);
  return this.httpClient.post(`${this.uriForExt}/createExtSys/${userName}`, extSys);

}

logout(userid:string,ipaddress:string){
  return this.httpClient.get(`${this.API_URL}/login/logout/${userid}/${ipaddress}`);
}
// logoutDetail(userId:string){
  //   return this.httpClient.get(`${this.API_URL}/login/userLogoutDetails/${userId}`);
  // }
//

getIpAddress():any{
  this.httpClient.get<{ip:string}>('https://jsonip.com').subscribe((data) => {
                  console.log('data', data);
                  let ipData = data
                  console.log("ipData",ipData)
                  return ipData;
             })
}

// generateRouteParts(snapshot: ActivatedRouteSnapshot): IRoutePart[] {
//   var routeParts = <IRoutePart[]>[];
//   if (snapshot) {
//     if (snapshot.firstChild) {
//       routeParts = routeParts.concat(this.generateRouteParts(snapshot.firstChild));
//     }
//     if (snapshot.data['title'] && snapshot.url.length) {
//       routeParts.push({
//         title: snapshot.data['title'], 
//         breadcrumb: snapshot.data['breadcrumb'], 
//         url: snapshot.url[0].path,
//         urlSegments: snapshot.url,
//         params: snapshot.params
//       });
//     }
//   }
//   return routeParts;
// }
//-----------------------29-08-20--change password shilpa---------------
changePassword1(passwordDTO: ChangePasswordDTO) {
  return this.httpClient.post<ChangePasswordDTO>(`${this.API_URL}/login/changePassword`, passwordDTO);
}

getOtpForReset(username) {
  return this.httpClient.get(`${this.API_URL}/login/otpForReset/${username}`);
}
// -----------------ended-----------------------------------
// -----------------29-8-20----- securitypolicy kalyan-----------------------------

// onclickOfAuthOfSecurityPolicyRecord(security)
//   {
//     return this.httpClient.post<SecurityDto>(`${this.API_URL}/securityPolicy/authorize`,security);
//   }
//   gettingUnAuthRecords()
//   {
//     return this.httpClient.get<SecurityDto>(`${this.API_URL}/securityPolicy/fetchDataForAut`)
//   }

  onAuthOfSecurityPolicy(security)
  {
    return this.http.post<SecurityDto>(`${this.API_URL}/securityPolicy/authorize`,security)
  }

  // ------------------------ended---security policy--------------------


saveDataSecurity(obj: SecurityDto)
 {
return this.httpClient.post(`${this.API_URL}/securityPolicy/save`, obj)
}
fetchSecurityPolicyService() 
{
return this.httpClient.get<SecurityDto>(`${this.API_URL}/securityPolicy/fetch`);
}
gettingDataForSecurityPolicy()
{
return this.httpClient.get<SecurityDto>(`${this.API_URL}/securityPolicy/fetch`)
}
gettingUnAuthRecords()
{
return this.httpClient.get<SecurityDto>(`${this.API_URL}/securityPolicy/fetchDataForAuth`)
}
gettingSecurityPolicySummary()
{
return this.httpClient.get<SecurityDto>(`${this.API_URL}/securityPolicy/fetch`)
}
onSaveOfSecurityPolicy(security)
{
console.log("in service",security);
return this.httpClient.post<SecurityDto>(`${this.API_URL}/securityPolicy/save`,security)
}
//authrizing security policy
onclickOfAuthOfSecurityPolicyRecord(security)
{
return this.httpClient.post<SecurityDto>(`${this.API_URL}/securityPolicy/authorize`,security);
}
getSecurityPolicyForAuth()
 {
return this.httpClient.get<SecurityDto[]>(`${this.API_URL}/authorization/getSecurityPolicy`);
}

}