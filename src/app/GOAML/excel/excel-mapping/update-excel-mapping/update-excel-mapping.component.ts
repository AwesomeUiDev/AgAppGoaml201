import { AppConfirmService } from './../../../service/app.confirm.service/app-confirm.service';
import { ExcelExtServiceService } from './../../../ext-system/excel-external-sys/excel-ext-service.service';
import { Component, OnInit } from '@angular/core';

import { ExcelProcessingService } from 'src/app/GOAML/service/xmlservice.service';
import Swal from 'sweetalert2';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { APIService } from 'src/app/api.service';
export interface DTYPES {
  id: number;
  type: string;
  isActive: boolean;
}
@Component({
  selector: 'app-update-excel-mapping',
  templateUrl: './update-excel-mapping.component.html',
  styleUrls: ['./update-excel-mapping.component.css']
})
export class UpdateExcelMappingComponent implements OnInit {

  extSysData1: string[];
  processCodeValue: any;
  processName: string;
  formdata: any;

  //For table
  addForm: FormGroup;
  rows: FormArray;

  starting: number;
  isChecked: boolean;

  dataTypes: DTYPES[] = [
    { id: 1, type: 'DATE', isActive: true },
    { id: 2, type: 'NUMBER', isActive: false },
    { id: 3, type: 'CHAR', isActive: false },
    { id: 4, type: 'VARCHAR', isActive: false }
  ];
  loggedInUser: string;

  constructor(private api: APIService,
    private processApi: ExcelProcessingService,
    private excelExtServiceService: ExcelExtServiceService,
    private fb: FormBuilder, private confirmService:AppConfirmService) { }


  ngOnInit() {
    this.loggedInUser = localStorage.getItem('userFromLogin');
    this.getAllExternalSystem();
    this.addForm = this.fb.group({
      excelMapping: this.fb.array([])
    });

  }

  getAllExternalSystem() {
    console.log('mathos call');
    this.excelExtServiceService.getAllExtSysName().subscribe(response => {
      this.extSysData1 = response;
      console.log(this.extSysData1);
      //   this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
    // console.log( this.extSysData);
  }

  getProcess(extSysName) {
    console.log(extSysName);
    this.api.getProcessNameWithExtSys(extSysName).subscribe(response => {
      this.processCodeValue = response;

      this.processName = this.processCodeValue;
      console.log(this.processName, "  ", this.processName.length);

      if (this.processName.length == 0) {
        Swal.fire("No ProcessCode foound for : " + extSysName)
      }

      console.log('process method end');
    });
  }

  // FOR FETCHING THE DATA
  getAllMapping(extSysName: string, processCode: string) {

    console.log(extSysName + " " + processCode);


    this.processApi.getAllMappingByExtSysAndProcessCode(extSysName, processCode)
      .subscribe(
        data => {
          this.formdata = data;
          console.log("this.formdata : ", this.formdata)

          if (this.formdata != null) {
            Swal.fire(
              'Fetched Data Successfully !',
            )
            this.patchData(this.formdata);
            console.log("Check Array ==>", this.formdata);
            this.starting = this.formdata[0].startingRow;
            this.isChecked = this.formdata[0].headerRepeated;

          } else {
            Swal.fire(
              'No mapping data,for:  ' + extSysName + ' and ' + processCode + ' !',
            )
          }

        }
      );
  }

  updateMappingData(formArrModel, isFormValid, externalSystem, processCode, starting, isChecked) {
    console.log("formArrModel : ", formArrModel);
    console.log("isFormValid : ", isFormValid);
    console.log("externalSystem : ", externalSystem);
    console.log("processCode : ", processCode);
    console.log("starting : ", starting);
    console.log("isChecked : ", isChecked)
    this.processApi.updateMappingData(formArrModel,externalSystem,processCode,starting,isChecked,this.loggedInUser)
    .subscribe(data=>{
      console.log("data :"+data)
      if(data)
      {
        Swal.fire('Updated Successfully')
      }else{
        Swal.fire('Failed to update')
      }
    })
  }


  private getSubArray() {
    return this.fb.group({
      columnnName: null,
      dataType: null,
      defaultValue: null,
      excelMappingColumn: null,
      mandatory: null,
      headerName: null,
      dateFormat: null,
      startingRow: [''],
      headerRepeated: [''],
      id: ['']
    });
  }


  /**
   * Add new subArray row into form
   */

  addSubArray() {
    const control = <FormArray>this.addForm.controls['excelMapping'];
    control.push(this.getSubArray());
  }

  /**
   * Remove subArray row from form on click delete button
   */

  removeSubArray(i: number, data) {
    console.log("i", i);
    console.log("data", data.value);
    this.confirmService
      .confirm({ title: "Confirm", message: "Are you sure to delete?", ok: "Yes", cancel: "No" })
      .subscribe(res => {
        if (res) {
    this.getRowIdx(i);
        } else return;
      });


  }

  /**
   * TODO Populate the data
   */

  patchData(formdata) {

    console.log("formdata", formdata)
    const control = <FormArray>this.addForm.controls['excelMapping'];
    for (let i = 0; i < formdata.length; i++) {
      console.log("lenght", formdata.length)
      control.push(this.getSubArray());
    }
    this.addForm.patchValue({ excelMapping: formdata });
  }

  /**
   * This is one of the way how clear subArray fields.
   */

  clearAllSubArray() {
    const control = <FormArray>this.addForm.controls['excelMapping'];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }



  /**
   * @method getRowIdx(i){}
   */
  private getRowIdx(i) {
    const control = <FormArray>this.addForm.controls['excelMapping'];
    let fg = control.get([i]);

    let idx = fg.get('id').value;
    console.log("For Delete => ", idx);

    if (idx) {
      this.processApi.deleteMappingRow(idx)
        .subscribe(e => {
          console.log("Resp : ", e);
          if (e) {

            Swal.fire('Deleted : '+idx);
          } else {
            Swal.fire('Failed : '+idx);
          }
          control.removeAt(i);
          // this.cdr.markForCheck();
        }, err => {

        });
    } else {
      control.removeAt(i);
      // this.cdr.markForCheck();
    }



  }


  checkTypeStatus(i) {
    console.log(i);
    // console.log("test", this.getSubArrayFormGroup(i).controls['dataType'].value);


    const control = <FormArray>this.addForm.controls['excelMapping'];
    let fg = control.get([i]);

    console.log("Value", fg.value.dataType)

    if (fg.value.dataType == 'DATE') {
      fg.get('dateFormat').enable();
    } else {
      fg.get('dateFormat').disable();
    }

  }

  getSubArrayFormGroup(index): FormGroup {
    const control = <FormArray>this.addForm.controls['excelMapping'];
    let fg = control.get([index]);

    console.log("Value", fg.value);
    return fg.value;
  }
  // excelMapping
  get f() { return this.addForm.controls; }
  get t() { return this.f.excelMapping as FormArray; }

}
