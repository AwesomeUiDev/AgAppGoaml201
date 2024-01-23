
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import { ExcelExtsys } from 'src/app/GOAML/ext-system/excel-external-sys/excelExtSys';
import { ExcelProcessingSummary } from './ExcelProcessingSummary';

@Injectable({
  providedIn: 'root'
})
export class ExcelProcessingService {


  // private uri = AppConst.dist + '/excel';
  private excelfile = environment.excel + '/excelfile';
  private url = environment.excel + '/excelcolumns';
  private excelprocess = environment.excel + '/excelprocess';
  private url3 = environment.excel + '/excelstatic';
  private urlforexcelmaster = environment.excel + '/excelmaster';
  private url1 = environment.excel + '/extsys';
  private ext = environment.excel + '/excelExt';
  // createRoles(formdata: Object): Observable<Object> {
  private excelExtSys = environment.excel + '/excelmaster';
  private uriForProcessSum = environment.excel + '/excelProcessingsummary';
  private httpHeader = { header: new HttpHeaders({ 'Content-type': 'application/json' }) };
  FILE_URL = ' ';
  constructor(private http: HttpClient) { }

  private excelmap = environment.excel + '/excelmap';
  //   return this.http.post(`${this.url}` + '/postColumnMapping', formdata);
  // }
  columnData(role: Object, extSys, processName, headerRepeated, startingRow, extCode): Observable<Object> {
    // let body = JSON.stringify(role);
    // console.log("Body : "+ body)
    return this.http.post(`${this.excelmap}/postColumnMapping/${extSys}/${processName}/${headerRepeated}/${startingRow}/${extCode}`, role,
      // { responseType: 'json' }
    );
  }
  showDetails(processName: Object): Observable<Object> {

    return this.http.post(`${this.urlforexcelmaster}/findByCondition/`, processName);
  }
  processData(extSys, processName, postexcelMasterData): Observable<any> {

    return this.http.get(`${this.excelprocess}/processData/${extSys}/${processName}/${postexcelMasterData}`, processName);
  }

  getAllExcelColumn(): Observable<any> {
    return this.http.get(`${this.url3}` + '/findAll');

  }
  getAllExternalSystem(): Observable<any> {
    return this.http.get(`${this.excelExtSys}` + '/findAllExtSys');

  }

  getProcessNameWithExtSys(extSys1: string): Observable<any> {
    return this.http.get(`${this.excelExtSys}/findProcess/${extSys1}`);

  }
  getProcessDataMethod(): Observable<any> {
    return this.http.get(`${this.url}` + '/processData');

  }
  pushFileToStorage(extSystem, processName, file: File, extSysCode): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.excelfile}/process/${extSystem}/${processName}/${extSysCode}`, formdata, {
      reportProgress: true,
    });
    return this.http.request(req);
  }

  public upload(extSystem, processName, file: File, extSysCode,executionDate,userId) {
    let uploadURL = `${this.excelfile}/process/${extSystem}/${processName}/${extSysCode}/${executionDate}/${userId}`;

    const formdata: FormData = new FormData();
    formdata.append('file', file);

    return this.http.post<any>(uploadURL, formdata, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          console.log("api progress",progress);
          return { status: ' Uploading please wait ...', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  callProcedureService(extSys1, processData, dateforData) {
    console.log('calling procedure');
    return this.http.get<boolean>(`${this.excelExtSys}/procedureCall/${extSys1}/${processData}/${dateforData}`);
  }

  /// from here new methods

  getAllExt(): Observable<any> {
    return this.http.get(`${this.ext}` + '/getExt');

  }
  modifyExtSys(formData: object,deptname) {
    return this.http.put(`${this.ext}` + `/update/${deptname}`, formData);
  }
  // getProcessNameWithExtSys(extSysName): Observable<any> {
  //   return this.http.get(`${this.url}/findProcess/${extSysName}`);

  // }
  getCustomer(id: number): Observable<Object> {
    return this.http.get(`${this.ext}/${id}`);
  }

  createExt(customer: Object,deptName:any): Observable<Object> {
    return this.http.post(`${this.ext}` + `/create/${deptName}`, customer);
  }

  updateCustomer(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.ext}/${id}`, value);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.ext}/${id}`, { responseType: 'text' });
  }

  getCustomersList(): Observable<any> {
    return this.http.get(`${this.ext}`);
  }

  getCustomersByAge(age: number): Observable<any> {
    return this.http.get(`${this.ext}/age/${age}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.ext}` + `/delete`, { responseType: 'text' });
  }
  // AUDIT LOG FOR - External system 
  // -------------------START--------
  // -------By vidya----------------
  authorizingTheRecord(obj: ExcelExtsys, name: string) {
    return this.http.put(`${this.ext}/` + `/authorizetherecord/${name}`, obj)
  }
  ClosingTheRecord(objClose: ExcelExtsys) {
    return this.http.put(`${this.ext}/` + `/toClosingTheRecord`, objClose)
  }
  reopeningTheRecord(reopening: ExcelExtsys) {
    return this.http.put(`${this.ext}/` + `/reopeningTheRecord`, reopening)
  }
  // ---------End-----------------------

  getAuthorizedExt():Observable<any> 
  {
    return this.http.get(`${this.ext}/gettingExtsysCodeonAuthSatus`)
  }

  gettingExternalSystemName()
    {
        return this.http.get<string[]>(`${this.uriForProcessSum}/getTheExteranlSytemName`)
    }

    gettingAllProcessNameBasedOnExternalSystem(extSysName:string)
    {
        return this.http.get<string[]>(`${this.uriForProcessSum}/gettingAllProcessName/${extSysName}`)
    }
   

    fetchAllExtDeptNames():Observable<any>{
      return this.http.get(`${this.ext}/listOfDeptName`);
    }

    getDepartmentNameByDeptId(deptId):Observable<any> {
      return this.http.get(`${this.ext}/deptName/${deptId}`);
    }
    getDept(roleId: any) {
      return this.http.get(`${this.url1}/getDeptByRole/${roleId}`);
    }
}
