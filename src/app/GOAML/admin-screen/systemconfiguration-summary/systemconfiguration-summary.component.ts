import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { APIService } from '../system-configuration/api.service';

@Component({
  selector: 'app-systemconfiguration-summary',
  templateUrl: './systemconfiguration-summary.component.html',
  styleUrls: ['./systemconfiguration-summary.component.css']
})
export class SystemconfigurationSummaryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource:any;
  reportData:any;
  // displayedColumns: string[] = ['rentityId','reportingCurrrency','rentityBranch','threshouldAmount','reportingFrequency','reportType']
  displayedColumns: string[] = ['rentityId','reportType','fileLocation','creatorId','creatorDtStamp']
  configData1: any;

  constructor(private service: APIService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.onClickofSummary();
  }
  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onClickofSummary(){
 this.service.getData().subscribe(res=>{
  console.log("res::",res);
  this.reportData = res;
  this.dataSource = new MatTableDataSource<any>(this.reportData);
      this.dataSource.paginator = this.paginator;
});
}
getByUserId(configData: any) {
  this.reportData.buttonupdate=true;
  console.log("configData=====================",configData);
  const navigationExtras: NavigationExtras = {
    queryParams: {
      'reportType': configData.reportType,
      'submissionCode':configData.submissionCode,
      'rentityId':configData.rentityId,
      'action':configData.action,
      'fileLocation':configData.fileLocation,
      'creatorDtStamp':configData.creatorDtStamp,
      'creatorId':configData.creatorId,
      'maximumTransaction':configData.maximumTransaction,
      'reason':configData.reason,
      'rentityBranch':configData.rentityBranch,
      'reportingCurrrency':configData.reportingCurrrency,
      'reportingFrequency':configData.reportingFrequency,
      'threshouldAmount':configData.threshouldAmount,
      'verifierDtStamp':configData.verifierDtStamp,
      'verifierId':configData.verifierId,
      'vsersion':configData.vsersion,
      'buttonupdate':configData.buttonupdate


    }
  }
  this.router.navigate(['/systemConfig'], navigationExtras);
}

}
