
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExcelProcessingService {
  private uri = environment.url + '/excel';
  private excelfile = environment.excel + '/excelfile';
  private url = environment.excel + '/excelcolumns';
  private excelprocess = environment.excel + '/excelprocess';
  private excelmap = environment.excel + '/excelmap';
  private url3 = environment.excel + '/excelstatic';
  private urlforexcelmaster = environment.excel + '/excelmaster';
  private url1 = environment.excel + '/extsys';
  private excelExtSys = environment.excel + '/excelmaster';
  private httpHeader = { header: new HttpHeaders({ 'Content-type': 'application/json' }) };
  FILE_URL = "";
  constructor(private http: HttpClient) { }
  // createRoles(formdata: Object): Observable<Object> {

  //   return this.http.post(`${this.url}` + '/postColumnMapping', formdata);
  // }
  columnData(role: Object, extSys, processName, headerRepeated, startingRow,userName:string): Observable<Object> {

    return this.http.post(`${this.excelmap}/postColumnMapping/${extSys}/${processName}/${headerRepeated}/${startingRow}/${userName}`, role);
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

  pushFileToStorage(extSystem, processName, userId, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.excelfile}/process/${extSystem}/${processName}/${userId}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );

    console.log(req);
    return this.http.request(req);
  }

  getAllMappingByExtSysAndProcessCode(externalSystem: string, processCode: string): Observable<any> {
    return this.http.get(`${this.excelmap}/fetchAllMapping/${externalSystem}/${processCode}`);
  }

  deleteMappingRow(id: any) {
    return this.http.delete(`${this.excelmap}/deleteMappingRow/${id}`);
  }

  updateMappingData(formArrModel: any, externalSystem: any, processCode: any, starting: any, isChecked: any,userName:string) {
    return this.http.put(`${this.excelmap}/updateMapping/${externalSystem}/${processCode}/${starting}/${isChecked}/${userName}`,formArrModel);
  }

}

