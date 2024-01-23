import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
// import { APIService } from 'src/app/api.service';
import { ExtsysClass } from './extsys-class';
// import { RolesService } from '../roles.service';
// import { Roles } from '../roles/roles';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ExcelExtServiceService } from './excel-external-sys/excel-ext-service.service';
import { ExcelExtsys } from './excel-external-sys/excelExtSys';
import Swal from 'sweetalert2';
import { APIService } from 'src/app/api.service';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-ext-system',
  templateUrl: './ext-system.component.html',
  styleUrls: ['./ext-system.component.css']
})
export class ExtSystemComponent implements OnInit {
  @ViewChild('resetSubmitbtn') resetSubmitbtn: ElementRef<HTMLElement>;
  createExtSys1: ExtsysClass = new ExtsysClass();
  loggedInUser: string;
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  responseError: any;
  extdata: string[];
  data: string[];
  createExtSys2: string;
  dataFrom: any;
  constructor(private apiService: APIService,
    private api: ExcelExtServiceService, ) { }

  ngOnInit() {
    // this.loggedInUser = localStorage.getItem('userId');
    this.loggedInUser = localStorage.getItem('userFromLogin');
    this.getExt();
  }
  getExt() {
    this.api.getAllExt().subscribe(data => {
      this.extdata = data;
      this.data = this.extdata;
      // this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      // this.dataSource.paginator = this.paginator;
      console.log(data);
    });
    console.log(this.extdata);
  }
  getProcess(extSysCode) {
    console.log(extSysCode);
    this.createExtSys2 = extSysCode.extSysName;
    console.log(this.createExtSys2);

  }
  save(extSysCode) {
    console.log('inside create ext sys');
    this.createExtSys1.creatorId = this.loggedInUser;
    console.log(extSysCode);
    console.log(this.createExtSys1);
    this.createExtSys1.extSysCode = extSysCode.extSysCode;
    // console.log(this.createExtSys1.extSysCode = extSysCode.extSysCode);
    this.createExtSys1.extSysName = extSysCode.extSysName;
    // console.log(this.createExtSys1.extSysName = extSysCode.extSysName);
    // this.createExtSys1.processCode = extSysCode.processCode;
    // console.log(this.createExtSys1.processCode = extSysCode.processCode);
    this.apiService.createExtSys(this.createExtSys1,this.loggedInUser)
      .subscribe(data => {
        console.log(data);
        let element:HTMLElement = this.resetSubmitbtn.nativeElement;
        element.click();
        this.dataFrom = data;
        console.log(this.dataFrom);
        if (this.dataFrom) {
          Swal.fire('Maintenance , Saved Successfully');
        } else {
          Swal.fire('Choose other process code');
        }
      });
    console.log(this.createExtSys1);
    this.createExtSys1 = new ExtsysClass();
  }
  onSubmit(extSysCode) {
    //  this.submitted = true;
    this.save(extSysCode);
  }
  // get all roles
  getRoles() {
    // this.roleService.getAllRoles().subscribe(data => {
    //   this.allRoles = data;
    // });
  }
  paginationDetail = new BehaviorSubject(
    {
      length: 10,
      pageIndex: 0,
      pageSize: 10
    });
}
