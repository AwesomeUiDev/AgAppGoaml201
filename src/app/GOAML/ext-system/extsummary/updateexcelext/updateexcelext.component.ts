import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ExcelExtsys } from '../../excel-external-sys/excelExtSys';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APIService } from 'src/app/api.service';
import { ExcelExtServiceService } from '../../excel-external-sys/excel-ext-service.service';
import { ExtsummaryComponent } from '../extsummary.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateexcelext',
  templateUrl: './updateexcelext.component.html',
  styleUrls: ['./updateexcelext.component.css']
})
export class UpdateexcelextComponent implements OnInit {

  //formData:ExcelExtsys;
  @Input()
  formData = new ExcelExtsys();
  validationResponse: any;
  responseError: any;
  is_edit = true;
  editFunction: boolean;
  editFunction2: boolean;
  poovar:any;
  loggedInUser: string;
  auditdata:ExcelExtsys;

  constructor(private route: ActivatedRoute, private http: HttpClient,
    private router: Router, private apiService: ExcelExtServiceService,
    private shareService: APIService) { }


  ngOnInit() {
    this.shareService.externalSystem$.subscribe((data: any) => {
      this.formData.id = data.id;
      this.formData.extSysCode = data.extSysCode;
      this.formData.extSysName = data.extSysName;
      this.auditdata = data;
      console.log("data works", data)
      // this.loggedInUser = localStorage.getItem('userId');
      this.loggedInUser = localStorage.getItem('userFromLogin');
    })
    this.editFunction = false;
    this.editFunction2 = true;
    this.poovar=true;
  }
  onSubmit(formData: ExcelExtsys) {
    console.log('inside modify user');
    formData.updatedBy = this.loggedInUser;
    formData.id=this.formData.id;
    console.log(formData);
    this.apiService.modifyExtSys(formData,this.loggedInUser).subscribe(data => {
      this.validationResponse = data;
      if (data) {
        // this.responseError = 'Success!';
        Swal.fire('Updated Successfully');
      } else {
        // this.responseError = 'Server Error!';
        Swal.fire('Server Error!');
      }
      console.log(data);
    });
  }

  changeStatus() {
    console.log('change status call');
    this.is_edit = false;
    console.log('done');
    this.editFunction = true;
    this.editFunction2 = false;
    this.poovar=false;
  }
}
