import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ExcelExtServiceService } from '../excel-external-sys/excel-ext-service.service';
import { ExcelExtsys } from '../excel-external-sys/excelExtSys';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { APIService } from 'src/app/api.service';
import { RoleService } from 'src/app/roles1/roles.service';
import { permissionsLabels } from 'src/app/roles1/models/fmosNewRolePermissions';

@Component({
  selector: 'app-extsummary',
  templateUrl: './extsummary.component.html',
  styleUrls: ['./extsummary.component.css']
})
export class ExtsummaryComponent implements OnInit {


  roleCodes = new permissionsLabels();
  displayedColumns: string[] = ['extSysCode', 'extSysName'];
 // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  //ExcelExtsys
  formData:ExcelExtsys;
  extdata:ExcelExtsys[];
  dataSource: any;
  pageSize: any;
  pageIndex: any;
  dataIndex: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
   
    this.getExt();

    setTimeout(() => {
      this.newRolePermissions();
      }, 2000);
      this.roleService.screenLabelList.subscribe(message => this.roleCodes = message);
      
  }
  constructor(private api: ExcelExtServiceService, private route: ActivatedRoute, 
    private http: HttpClient,
    private router: Router,
    private apiService:APIService,
    private roleService: RoleService) {
    // this.route.queryParams.subscribe(params => {

    //   // this.modifyUserObject.userRef = params["userRef"];
    //   this.formData.extSysCode = params['extSysCode'];
    //   this.formData.extSysName = params['extSysName'];
    // });
  }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  newRolePermissions()
{
this.roleService.fetchScreenPermissions('External System Summary');
}
 
  getExt(){
    this.api.getAllExt().subscribe(data=>{
      this.extdata=data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      this.dataSource.paginator = this.paginator;
      console.log(data);
    });
    console.log(this.extdata);
  }
  getExtSys(row) {
    console.log("row",row);
    this.apiService.externalSystem.next(row);

    const navigationExtras: NavigationExtras = {
      queryParams: {}
    };

    this.router.navigate(['/excelExtSysUpdate'], navigationExtras);
  }
  onPaginateChange(event) {
    console.log(event);
    // console.log(this.pageSize);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    console.log(event.pageSize);
    console.log(event.pageIndex);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];