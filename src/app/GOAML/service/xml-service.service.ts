import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { ResponseError } from '../response-error';
import * as moment from 'moment';
// import { PasswordChangeClass } from '../user/forget-password/forget-password.component';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';
const EXCEL_EXTENSION = '.xml';
const EXCEL_EXTENSIONS = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class XmlServiceService {
  uri = environment.url + '/generate';
  uriForReport = environment.url + '/report';
  uriAuth = environment.url + '/authorize';
  uriExcel = environment.url + '/excel';
  uriLogin = environment.url + '/dtblogin';
  constructor(private http: HttpClient) { }

  createUser(dateData: Object): Observable<any> {

    return this.http.post(`${this.uri}` + `/generateXmlReport`, dateData)


  }
  generateXml(dateData: Object) {

    return this.http.post<ResponseError>(`${this.uri}` + `/generateXmlReport1`, dateData)
  }
  getReport(dateData: Object): Observable<Object> {

    return this.http.post(`${this.uriForReport}` + `/reportLimitData`, dateData)

  }
  getReport1(dateData: Object): Observable<Object> {

    return this.http.post(`${this.uriForReport}` + `/excelDownload`, dateData)

  }

  getReportDownload(reportDate:Object): Observable<Object>{
    console.log(reportDate);
    // const headers = new HttpHeaders({ 'Content-Type': 'text/xml', 'responseType': 'text' }).set('Accept', 'text/xml');

    // var headers = new Headers({'Content-Type': 'application/xml'})
    // headers.set('Accept', 'application/json');
    // headers.set('Content-Type', 'application/xml');
    
    // application/json, text/plain,

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json', //<- To SEND XML
        'Accept':  'application/xml',       //<- To ask for XML
         'Response-Type': 'text'  ,           //<- b/c Angular understands text
        // 'Accept': 'text/xml'
      })
    };
    const httpHeaders = new HttpHeaders();
    return this.http.post(`${this.uriForReport}` + `/excelDownload1/` ,  reportDate , {headers: httpHeaders,responseType: 'text'})
     
// { responseType: 'text' },
  }
  getReportTableData(dateData: Object): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/xml', //<- To SEND XML
    //     'Accept':  'application/xml',       //<- To ask for XML
    //     'Response-Type': 'text'             //<- b/c Angular understands text
    //   })
    // };

    return this.http.get(`${this.uriForReport}` + `/reportFromdate`, dateData)

  }


  convertDate(value): string{
    let date = moment(value).format('MMM-DD-YYYY');
    // let date = moment(new Date(value)).format("MMM-DD-YYYY");
     console.log("date", date);
    return date;

  }

  getReportsData(executionDate): Observable<any> {
    console.log("executionDate in service::",executionDate)
    return this.http.get(`${this.uriForReport}` + `/listofReports/${executionDate}`)

  }

  authDownloadData(userId: string, reportId: string): Observable<Object> {
    return this.http.get(`${this.uriAuth}/auth/${userId}/${reportId}`)

  }
  downloadData(userId: string, reportId: string,reportType:string): Observable<Object> {
    return this.http.get(`${this.uriAuth}/download/${userId}/${reportId}/${reportType}`)

  }
  theDropDown() {

  }
  //get the report type
  getAllTrnDto(): Observable<any> {
    return this.http.get(`${this.uri}` + '/reportType')

  }
  getAllAuthData(): Observable<any> {
    return this.http.get(`${this.uriAuth}` + '/getAuthorize')

  }

  authXMLCall(userId: string, reportId: string): Observable<Object> {
    return this.http.get(`${this.uriAuth}/auth/${userId}/${reportId}`)

  }

  reportDataCall(): Observable<any> {
    return this.http.get(`${this.uriForReport}` + '/fetchAll')

  }
  // reportDataCall(): Observable<any> {
  //   return this.http.get(`${this.uriForReport}` + '/fetchAll')

  // }

  
  public exportAsExcelFile2(json: any[], excelFileName: string): void {
    console.log("before json",json)
    if(json){
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFiles(excelBuffer, excelFileName);
    }
  }
  private saveAsExcelFiles(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSIONS);
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    console.log("before json",json)
    if(json){
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
    }
  }


  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  getRejectcall(reportId:string, text:any, userId:any,makerId:string): Observable<any> {
    return this.http.get(`${this.uriAuth}/reject/${reportId}/${text}/${userId}/${makerId}`);

  }
  // resetPassword(resetpassword: PasswordChangeClass): Observable<any> {
  //   return this.http.post(`${this.uriLogin}/changepassword`, resetpassword);
  // }
  
}
