import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExcelExtServiceService {
  //private url = AppConst.median + '/excelExt';
 
  private url = environment.excel + '/excelExt';
  constructor(private http: HttpClient) { }

  // http://localhost:9191/excelExt/getExt
  // Ext Data
  getAllExt(): Observable<any> {
    return this.http.get(`${this.url}` + '/getExt');

  }
  modifyExtSys(formData:object,userName:string)
  {
    return this.http.put(`${this.url}` + `/update/${userName}`, formData);
  }

  getAllExtSysName(): Observable<any> {
    return this.http.get(`${this.url}` + '/extsysName');

  }
  getProcessNameWithExtSys(extSysName): Observable<any> {
    return this.http.get(`${this.url}/findProcess/${extSysName}`);

  }
  getCustomer(id: number): Observable<Object> {
    return this.http.get(`${this.url}/${id}`);
  }

  createExt(customer: Object,userName:string): Observable<Object> {
    console.log("service",userName)
    return this.http.post(`${this.url}` + `/create/${userName}`, customer);
  }

  updateCustomer(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getCustomersList(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  getCustomersByAge(age: number): Observable<any> {
    return this.http.get(`${this.url}/age/${age}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.url}` + `/delete`, { responseType: 'text' });
  }
}
