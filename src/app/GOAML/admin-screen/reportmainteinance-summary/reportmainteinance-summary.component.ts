import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { APIService } from '../reporting-maintenance/api.service';
import { reports } from '../reporting-maintenance/reports';

@Component({
  selector: 'app-reportmainteinance-summary',
  templateUrl: './reportmainteinance-summary.component.html',
  styleUrls: ['./reportmainteinance-summary.component.css']
})
export class ReportmainteinanceSummaryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  // reportData: Array<reports>;
   reportData:any;
   loggedInUser: string;
   displayedColumns: string[] = ['userNo','firstName','phoneNumber','email','creatorId','creatorDtStamp']
//   ,'idNumber','nationality','passport','email','passportCountry','occupation','contactType','countryprefix',
// 'phoneNumber','address','town','city','countryCode'
  

  constructor(private service: APIService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchAllData();
    this.loggedInUser = localStorage.getItem('userFromLogin');
    console.log("summary")
  }

  fetchAllData(){
    this.service.getReportMaintenanceData().subscribe(data =>{
      console.log("data::",data);
     this.reportData = data;
      this.dataSource = new MatTableDataSource<any>(this.reportData);
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getByUserId(userData: any) {
    console.log("user=====================",userData);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'userNo': userData.userNo,
        'firstName': userData.firstName,
        'middlename':userData.middlename,
        'lastName':userData.lastName,
        'gender':userData.gender,
        'address':userData.address,
        'birthDate':userData.birthDate,
        'city':userData.city,
        'contactType':userData.contactType,
        'countryCode':userData.countryCode,
        'countryprefix':userData.countryprefix,
        'creatorDtStamp':userData.creatorDtStamp,
        'creatorId':userData.creatorId,
        'email':userData.email,
        'idNumber':userData.idNumber,
        'nationality':userData.nationality,
        'occupation':userData.occupation,
        'passport':userData.passport,
        'passportCountry':userData.passportCountry,
        'phoneNumber':userData.phoneNumber,
        'ssn':userData.ssn,
        'town':userData.town,
        'verifierId':userData.verifierId,
        'verifierDtStamp':userData.verifierDtStamp,
        'version':userData.version,
        'buttonupdate':userData.buttonupdate,
        'communiactionType':userData.communiactionType,
        'addressType':userData.addressType

      }
     
  }
  this.router.navigate(['/reportingMaintenance'], navigationExtras);
}
}
