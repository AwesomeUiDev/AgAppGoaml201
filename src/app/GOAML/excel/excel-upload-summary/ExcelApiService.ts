import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExtsysClass } from 'src/app/GOAML/ext-system/extsys-class';

// import * as AppConst from './app.const';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ExcelApiService {



    // For Behavior -- by sakthi
    externalSystem = new BehaviorSubject<any[]>([]);
    externalSystem$ = this.externalSystem.asObservable();


    //   private uri = AppConst.median + '/api';
    //   private uriForExt = AppConst.median + '/extsys';
    //   private uriTag = AppConst.median + '/tag';

    private uri = environment.excel + '/api';
    private uriForExt = environment.excel + '/extsys';
    private uriTag = environment.excel + '/tag';
    private uriForProcessProcedure = environment.excel + '/excelProcessPackage';
    private uriForMap = environment.excel + '/excelmap';
    private summary = environment.excel + '/uploadSummary';
    // Edited By Prabhat
    getAllExtCodeForExcelUpload(): Observable<any> {
        return this.http.get(`${this.summary}` + '/getAllDataSummary');
    }
    onClickOfQueryOfExcelProcessingSummary(dateup: any) {
        return this.http.get<any>(`${this.summary}/gettingtheBodyForExcelProcessing/${dateup}`);
    }



    callProcedureService(extSysName, processCode, dateforData) {
        return this.http.get<boolean>(`${this.uriForProcessProcedure}/callProcess/${extSysName}/${processCode}/${dateforData}`);
    }

    constructor(private http: HttpClient) { }

    // audit Logs
    getAllAuditData(): Observable<any> {
        return this.http.get(`${this.uri}` + '/auditsList');

    }
    getAllAuditDataByDate(from: Date, to: Date) {
        return this.http.get(`${this.uri}/dataauditsList/${from}/${to}`);
    }
    getProcessNameWithExtSys(extSysName): Observable<any> {
        return this.http.get(`${this.uriForExt}/processCode/${extSysName}`);

    }

    // ------------------Pooja---------------5th sept--------------
    // ----------------start-------------------
    // To get all processcode by ext sys code

    getAllExtCode(): Observable<any> {
        return this.http.get(`${this.uriForExt}` + '/getAllExtCode');
    }

    getProcessNameByExtSysCode(extSysCode: string): Observable<any> {
        return this.http.get(`${this.uriForExt}/processCodeByExtCode/${extSysCode}`);
    }

    // ---------------17th sept---------------START---------------
    // -----------------FOR UPDATE SCREEN--------------------
    getAllExtCodeForUpdateMapping(): Observable<any> {
        return this.http.get(`${this.uriForMap}` + '/getAllExtCode');
    }



    getProcessNameByExtSysCodeForUpdateMapping(extSysCode: string): Observable<any> {
        return this.http.get(`${this.uriForMap}/processCodeByExtCode/${extSysCode}`);
    }
    // tslint:disable-next-line: comment-format
    //---------------17th sept---------------END---------------
    getExtSysNameByExtSysCode(extSysCode: string): Observable<any> {
        return this.http.get<string>(`${this.uriForMap}/getExtsysByExtCode/${extSysCode}`,
            { responseType: 'text' as 'json' }
        );
    }
    getExtSysCodeByExtSysName(extNameValue: any): Observable<any> {
        return this.http.get<string>(`${this.uriForMap}/getExtSysCodeByExtName/${extNameValue}`,
            { responseType: 'text' as 'json' }
        );
    }

    updateMappingData(model: any, extNameValue: any, processCode: string, extSysCode: string, starting, isChecked, modifiedBy) {
        // let body = JSON.stringify(model);
        // tslint:disable-next-line: max-line-length
        return this.http.put(`${this.uriForMap}/updateMapping/${extNameValue}/${processCode}/${extSysCode}/${starting}/${isChecked}/${modifiedBy}`, model,
            // { responseType: 'json' }
        );
    }

    deleteMappingRow(id: any) {
        return this.http.delete(`${this.uriForMap}/deleteMappingRow/${id}`);
    }

    getAllExtsysNameAndProcessCodeOnAuthStatus(): Observable<any> {
        return this.http.get(`${this.uriForExt}/gettingExtsysNameAndProcessCodeOnAuthStatus`);
    }
    // --------------End----------------------------

    // dashboard
    // getAllDashboard(): Observable<any> {
    //   return this.http.get(`${this.uri}` + '/dashboardchartdata');

    // }


    // external system
    getAllExtSys(): Observable<any> {
        return this.http.get(`${this.uriForExt}` + '/extsysdata');

    }
    getAllExtSysName(): Observable<any> {
        return this.http.get(`${this.uriForExt}` + '/extsysName');

    }


    fetchAllAuthExternalSystem(): Observable<any> {
        return this.http.get(`${this.uriForExt}` + '/fetchAuthExtSystem');
    }
    createExtSys(extSys: Object): Observable<Object> {
        return this.http.post(`${this.uriForExt}` + '/createExtSys', extSys);

    }
    modifyExtSysService(modifyextSys: Object) {
        return this.http.put<boolean>(`${this.uriForExt}` + `/modifyextSys`, modifyextSys);
    }
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
    // authorizingTheRecord(extsobj: ExtsysClass) {
    //     return this.http.post<ExtsysClass>(`${this.uriForExt}` + '/authorizetherecordOfExteranlSystem', extsobj)
    // }
    // closingTheRecordOfProcessCodeMapping(closeobj: ExtsysClass) {
    //     return this.http.post<ExtsysClass>(`${this.uriForExt}` + '/onClcikOfCloseOFExtsys', closeobj)
    // }
    // reopeningTheRecordOfProcessCodeMapping(reopenobj: ExtsysClass) {
    //     return this.http.post<ExtsysClass>(`${this.uriForExt}` + '/reopeningTheRecord', reopenobj)
    // }
    // ------------------------------------------------------
    authorizingTheRecord(extsobj: ExtsysClass, name: string) {
        return this.http.put<ExtsysClass>(`${this.uriForExt}/` + `/authorizetherecordOfExteranlSystem/${name}`, extsobj)
    }

    closingTheRecordOfProcessCodeMapping(closeobj: ExtsysClass) {
        return this.http.put<ExtsysClass>(`${this.uriForExt}` + '/onClcikOfCloseOFExtsys', closeobj)
    }
    reopeningTheRecordOfProcessCodeMapping(reopenobj: ExtsysClass) {
        return this.http.put<ExtsysClass>(`${this.uriForExt}` + '/reopeningTheRecord', reopenobj)
    }
    // --------------------------------------------------------




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
    modifyTagService(modifytag: Object) {
        return this.http.put<boolean>(`${this.uriTag}` + `/modifytag`, modifytag);
    }
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

    // ----------------------pooja-----------------------------//
    //----------------------START-----------------------------//
    getProcessNameWithExtSysForMapping(extSysName: any) {
        return this.http.get(`${this.uriForMap}/fetchAllProcessCode/${extSysName}`);
    }

    getAllExtSysForUpdateMapping(): Observable<any> {
        return this.http.get(`${this.uriForMap}/fetchAllExt`);
    }

    getAllMappingByExtSysAndProcessCode(externalSystem: string, processCode: string, extCodeValue: string): Observable<any> {
        return this.http.get(`${this.uriForMap}/fetchAllMapping/${externalSystem}/${processCode}/${extCodeValue}`);
    }
    // onAuthorizingTheRecordOfExcelMApping(objOfAudit: ExcelMappingAuditLog) {
    //     return this.http.post(`${this.uriForMap}/authrizingTheRecordOfExcelMapping`, objOfAudit);
    // }
    // onClcikOFCloseOfUpdateExcelMApping(objOfAuditclose: ExcelMappingAuditLog) {
    //     return this.http.post(`${this.uriForMap}/closeTheRecordOfExcelMapping`, objOfAuditclose);
    // }
    // onClcikOfReopenOfUpdateExcelMapping(objOfAuditReopen: ExcelMappingAuditLog) {
    //     return this.http.post(`${this.uriForMap}/reopenninTheRecordOfExcelMapping`, objOfAuditReopen);
    // }

    // updateMapping(model, isValid,extSysName: string, processCode:string){
    //     return this.http.put(`${this.uriForMap}/`);
    // }

    onAuthorizingTheRecordOfExcelMApping(model: any, extNameValue: any, processCode: string, extSysCode: string, userId: any) {
        return this.http.put(`${this.uriForMap}/authOfRecord/${extNameValue}/${processCode}/${extSysCode}/${userId}`, model);
    }

    onClcikOFCloseOfUpdateExcelMApping(model: any, extNameValue: any, processCode: string, extSysCode: string) {
        return this.http.put(`${this.uriForMap}/closeOfRecord/${extNameValue}/${processCode}/${extSysCode}`, model);
    }

    onClcikOfReopenOfUpdateExcelMapping(model: any, extNameValue: any, processCode: string, extSysCode: string) {
        return this.http.put(`${this.uriForMap}/reOpenOfRecord/${extNameValue}/${processCode}/${extSysCode}`, model);
    }

    getAllColNames(externalSystem: string, processCode: string, extCodeValue: string): Observable<any> {
        return this.http.get(`${this.uriForMap}/fetchColNames/${externalSystem}/${processCode}/${extCodeValue}`);
    }
}

