import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExcelExtsys } from './excelExtSys';
import { ExcelExtServiceService } from './excel-ext-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-excel-external-sys',
  templateUrl: './excel-external-sys.component.html',
  styleUrls: ['./excel-external-sys.component.css']
})
export class ExcelExternalSysComponent implements OnInit {
  @ViewChild('resetSubmitbtn') resetSubmitbtn: ElementRef<HTMLElement>;
  excelExt: ExcelExtsys = new ExcelExtsys();
  data: ExcelExtsys;
  msg: string;
  dataext: any;
  responseError: any;
  loggedInUser: string;
  constructor(private api: ExcelExtServiceService) { }

  ngOnInit() {
    this.loggedInUser = localStorage.getItem('userFromLogin');
  }
  save() {
    this.api.createExt(this.excelExt,this.loggedInUser)
      .subscribe(data => {
      this.dataext = data;
      let element:HTMLElement = this.resetSubmitbtn.nativeElement;
        element.click();
        console.log(this.dataext);
        console.log("login user",this.loggedInUser)
        if (this.dataext) {
          Swal.fire(
            'Summary, Saved Successfully'
          );
          // this.responseError = 'Success!';
        } else {
          Swal.fire( 'Choose other External System Code Or Name!');
           
           
          
          // this.responseError = 'Choose other External System Code Or Name!';
        }
        //error => console.log(error)

      });

    this.excelExt = new ExcelExtsys();
  }

  onSubmit() {
    // this.submitted = true;
    this.save();
  }
}
