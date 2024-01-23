import { HttpClient } from '@angular/common/http';
import { Configuration } from './Configuration';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
@Injectable(
    {providedIn: 'root'}
)
export class APIService {
   api= environment.url ;
    // API_URL = 'http://192.168.0.115:8080';
    constructor(private httpClient: HttpClient) { }
    theDropDown()
    {
        return this.httpClient.get<string[]>(`${this.api}/ReportMaintananceDetails/fethingreportType`);   
    }
    saveDataOfSystemConfigToDb(sysconfig: Configuration,userName:string) {
        console.log("service",userName)
        return this.httpClient.post(`${this.api}/ReportMaintananceDetails/savetodbsys/${userName}`,sysconfig)
    }
    getData(){
        return this.httpClient.get(`${this.api}/ReportMaintananceDetails/getData`);
    }
    updateRecords(sysconfig:Configuration,userName:string){
        return this.httpClient.put(`${this.api}/ReportMaintananceDetails/UpdateSystemConfig/${userName}`,sysconfig)
    }
}