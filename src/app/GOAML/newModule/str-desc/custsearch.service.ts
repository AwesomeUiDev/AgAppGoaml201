import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class STRService {
  url = environment.url + '/bank';
  constructor(private http: HttpClient) { }
  getErrorStack(): Observable<any> {

    return this.http.get(`${this.url}` + `/getErrorLog`)

  }

  getDataForBank(bankData: Object): Observable<Object> {

    return this.http.post(`${this.url}` + `/bankurl`, bankData)

  }
  getDataForTrn(bankData: Object): Observable<Object> {

    return this.http.post(`${this.url}` + `/banktrn`, bankData)

  }
  getDataForMtsTrn(mtsData: Object): Observable<Object> {

    return this.http.post(`${this.url}` + `/mtsurltrn`, mtsData)

  }
  getDataForMtsId(mtsData: Object): Observable<Object> {

    return this.http.post(`${this.url}` + `/mtsurlid`, mtsData)

  }
   getTransactiondata(TRN_REF_NO: string): Observable<Object> {
    return this.http.get(`${this.url}/getTrn/${TRN_REF_NO}`)

  }
  getTransactiondata3(TRN_REF_NO: string): Observable<Object> {
    return this.http.get(`${this.url}/getTrnWithtrn/${TRN_REF_NO}`)

  }
 strTransactionMarkDataForDb(reason: string,action: string,description: string,trnNo: string,userId:string,event): Observable<any> {
    return this.http.get(`${this.url}/getStrData/${reason}/${action}/${description}/${trnNo}/${userId}/${event}`)

  }
 nonStrTransactionApi(trnNo: string,userId:string): Observable<any> {
    return this.http.get(`${this.url}/getNonStr/${trnNo}/${userId}`)

  }
  strTransactionMarkDataForDbBank(reason: string,action: string,description: string,trnNo: string,userId:string): Observable<any> {
    return this.http.get(`${this.url}/getStrDataBank/${reason}/${action}/${description}/${trnNo}/${userId}`)

  }
  nonStrTransactionApiBank(trnNo: string,userId:string): Observable<any> {
    return this.http.get(`${this.url}/getNonStrBank/${trnNo}/${userId}`)

  }
  //data extraction for goaml
  getDataForExtraction(data: Object,userId:string): Observable<any> {

    return this.http.post<any>(`${this.url}` + `/dataext/${userId}`, data)

  }

  getALCTRDataForExtraction(data: Object,userId:string): Observable<any> {

    return this.http.post<any>(`${this.url}` + `/dataextalctr/${userId}`, data)

  }

  getIWTRDataForExtraction(data: Object,userId:string): Observable<any> {

    return this.http.post<any>(`${this.url}` + `/dataExtIwtr/${userId}`, data)

  }
  
  // data extraction for mts with upload date
  getDataForMtsUpload(data: Date,reportType: string,module:string): Observable<any> {

    return this.http.get(`${this.url}` + `/uploaddatemts/${data}/${reportType}/${module}`)

  }
 
}
