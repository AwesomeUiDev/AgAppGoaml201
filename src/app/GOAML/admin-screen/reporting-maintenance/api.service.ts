import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { reports } from './reports';
import {environment} from 'src/environments/environment';
@Injectable(
    {providedIn: 'root'}
)
export class APIService {
    api= environment.url;
    // API_URL = 'http://192.168.0.115:8080';
    constructor(private httpClient: HttpClient) { }
    checkUserNo(userno)
    {
        return this.httpClient.get<boolean>(`${this.api}/ReportMaintananceDetails/getuser/${userno}`)
    }
    savetoDbOfReportMaintance(refofReports: reports,userName:string) {
        return this.httpClient.post(`${this.api}/ReportMaintananceDetails/savetoDb/${userName}`,refofReports)
    }
    getReportMaintenanceData(){
        return this.httpClient.get(`${this.api}/ReportMaintananceDetails/fetchData`);
    }
    updateReportMaintanance(reports: reports,userName:string){
        return this.httpClient.put(`${this.api}/ReportMaintananceDetails/update/${userName}`,reports)
    }
    
}