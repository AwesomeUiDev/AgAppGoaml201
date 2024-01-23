import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ExcelMappingClass, ExcelMappingClass3, ExcelMappingClass2 } from './excelMapping';
import { ExternalSystem } from './externalSystem';
import { MatTableDataSource } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import Swal from 'sweetalert2';
import { ExcelProcessingService } from 'src/app/GOAML/service/xmlservice.service';
import { IfStmt } from '@angular/compiler';
import { MatSelectModule } from '@angular/material/select';
import { ExcelExtServiceService } from 'src/app/GOAML/ext-system/excel-external-sys/excel-ext-service.service';
import { APIService } from 'src/app/api.service';


interface sample {
  excelMap: ExcelMappingClass[];
  processData: ExternalSystem[];
}
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-excel-mapping',
  templateUrl: './excel-mapping.component.html',
  styleUrls: ['./excel-mapping.component.css']
})
export class ExcelMappingComponent implements OnInit {
  saveDisabled:boolean=false;
  public fieldArray: Array<ExcelMappingClass2> = [];
  starting: any;
  isChecked: boolean;
  public newAttribute: any = {};
  object3 = new ExcelMappingClass3();
  isHeaderVal: boolean;
  Form: FormGroup;
  headerRepeated: boolean;
  datebox: boolean;
  datebox1: boolean;
  extdata: ExternalSystem;
  startingRow:number;
  @ViewChild('isHeaderPresent') isHeaderCustom: ElementRef;
  @ViewChild('extSys1') extRef: ElementRef;
  @ViewChild('dateValue') dateRef: ElementRef;
  errorMsg: any;
  // isHeaderPresent:boolean;
  displayedColumns: string[] = ['columnnDescription', 'dataType', 'mandatory','headerName' ,'dateFormat' , 'mappingColumn'];
  toppings = new FormControl();
  datatypevalue: string[] = ['NUMBER', 'DATE', 'Char', 'VarChar']
  foods: Food[] = [
    { value: 'NUMBER', viewValue: 'NUMBER' },
    { value: 'DATE', viewValue: 'DATE' },
    { value: 'CHAR', viewValue: 'CHAR' },
    { value: 'VARCHAR', viewValue: 'VARCHAR' }
  ];
  public excelMap1: Array<ExcelMappingClass> = [];
  excelMap: ExcelMappingClass[];
  newColumn: ExcelMappingClass[];
  columnname1: ExcelMappingClass;
  dataSource: any;
  dataFromresponse: any;
  message: boolean;
  form: FormGroup;
  extSysData: ExternalSystem[];
  extSysData1: string[];
  processData: ExternalSystem;
  processData1: ExternalSystem = new ExternalSystem;
  processData2: ExternalSystem;
  processCodeValue: any;
  column1: boolean;
  excelMaint: ExcelMappingClass = new ExcelMappingClass();
  addForm: FormGroup;

  rows: FormArray;
  processdata1: any;
  processName: string;
  poojaprocessdata: any[];
  poojaext2: any;
  poojaprocess2: any;
  loggedInUser: string;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  // @ViewChild(MatSort) sort: MatSort;
  constructor(private excelUpload: ExcelProcessingService, private api: APIService,
    private fb: FormBuilder,private excelApi:ExcelExtServiceService) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });

    this.rows = this.fb.array([]);
  }

  ngOnInit() {
    this.loggedInUser = localStorage.getItem('userFromLogin');
    this.getAllColumn();
    this.getAllExternalSystem();
    this.isChecked = false;
    this.datebox = false;
    this.datebox1 = true;
    this.message = false;
    this.addForm.get("items_value").setValue("yes");

    this.addForm.addControl('rows', this.rows);


this.startingRow=0;



  }

  // ngAfterViewInit(){
  //  console.log("ref ::",this.extRef.nativeElement.value);
  // }

  checkValue(val) {
    console.log("For checkbox", val.checked, this.isChecked);
    // val.checked === true ? this.isChecked = true : this.isChecked= false;

  }
  finalSubmit(rows, isChecked, startingRow) {
    console.log(startingRow);
    console.log(this.poojaext2);
    console.log(this.poojaprocess2);
    console.log(rows);
    rows.forEach(element => {
      if (!element.mandatory) {
        element.mandatory = false;
        console.log("mandatory 1 : " + element.mandatory)
      }
    });
    // console.log(this.processdata1);

    console.log(startingRow);
    // if (startingRow =  '') {
    //   //alert("enter stsrting rows");
    //   startingRow = 0;
    // }
    //this.startingRow=startingRow;
    console.log("checking...", isChecked);
    // console.log(this.processdata1.extSysName, this.processdata1.processCode);

    this.object3.excelMappingDto = this.excelMap;
    this.excelMap.forEach(elemnet => {
      if (!elemnet.mandatory) {
        elemnet.mandatory = false;
        console.log("mandatory 2 : " + elemnet.mandatory)
      }

    });
    this.object3.excelMapping = rows;
    console.log(this.object3);

    this.excelUpload.columnData(this.object3, this.poojaext2, this.poojaprocess2, isChecked, startingRow,this.loggedInUser).subscribe(response => {
      this.dataFromresponse = response;
      this.saveDisabled=true;
      console.log(this.dataFromresponse);
      if (response) {
        Swal.fire("Success")
      } else {
        Swal.fire("Failed")
      }
    });



  }





  getProcess(extSysName) {
    console.log(extSysName);
    this.api.getProcessNameWithExtSys(extSysName).subscribe(response => {
      this.processCodeValue = response;

      this.processName = this.processCodeValue;
      console.log(this.processName, "  ",this.processName.length);

      if(this.processName.length==0){
        Swal.fire("No ProcessCode found for : "+ extSysName)
      }

      // this.processName.split(',');
      // this.poojaprocessdata=
      // console.log(this.poojaprocessdata);
      console.log('process method end');
    });
  }
 
  getProcessName1(processCode, extSysName) {
    console.log("before process");
    console.log(processCode);
    console.log(extSysName);
    this.poojaext2 = extSysName;
    this.poojaprocess2 = processCode;

  }
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      columnnName: null,
      dataType: null,
      defaultValue: null,
      mappingColumn: null,
      mandatory: null,
      headerName:null,
      dateFormat:null
    });
  }



  getAllExternalSystem() {
    console.log('mathos call');
    this.excelApi.getAllExtSysName().subscribe(response => {
      this.extSysData1 = response;
      console.log(this.extSysData1);
      //   this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
    // console.log( this.extSysData);
  }
  getProcessName(extSys1) {
    console.log(extSys1);
    console.log(this.extSysData);
    this.api.getProcessNameWithExtSys(extSys1).subscribe(response => {
      this.processData = response;
      console.log("process Code",this.processData);
      // this.extSysData.forEach(element => {
      //   if (element.extSys === "extSys1") {
      //     this.processData1.processName = element.processName;
      //     this.processData1.extSys = element.extSys;
      //   }

    });
    // console.log(this.processData1);
    // this.processData2 = this.processData1;

    // this.excelUpload.getProcessNameWithExtSys(extSys1).subscribe(response => {
    //   this.processData = response;
    //   console.log(this.processData);
    // console.log('process method end');
    // });
  }
  // getProcessName(process){
  //   console.log(process);
  // }

  finalSubmit1(rows, startingRow, extSys1, processName1) {

    for (let index = 0; index < rows.length; index++) {
      if (!rows[index].mandatory) {
        const element = rows[index].mandatory = false;
      }

      console.log(rows);

    }
    console.log(this.excelMap);
    for (let index = 0; index < this.excelMap.length; index++) {
      // const element = this.excelMap[index];
      if (!this.excelMap[index].mandatory) {
        const element = this.excelMap[index].mandatory = false;
      }

    }
    console.log(rows);
    console.log(startingRow);
    console.log(extSys1);
    console.log(processName1);
    console.log(this.isChecked);
    this.headerRepeated = this.isChecked;
    this.object3.excelMappingDto = this.excelMap;
    this.object3.excelMapping = rows;
    console.log(this.object3);

    this.processData1.extSys = extSys1;
    console.log(this.processData1.extSys);
    this.processData1.processName = processName1;
    console.log(this.processData1.processName);
    this.excelUpload.columnData(this.object3, this.processData1.extSys, this.processData1.processName, this.headerRepeated, startingRow,this.loggedInUser).subscribe(response => {
      this.dataFromresponse = response;
      console.log(this.dataFromresponse);
      this.message = this.dataFromresponse;
      if (this.message) {
        Swal.fire(
          'Success !',
        )
      } else {
        Swal.fire(
          'Failed !',
        )
      }
    });
    // if (this.dataFromresponse) {
    //   Swal.fire(
    //     'Success !',
    //   )
    // } else {
    //   Swal.fire(
    //     'Failed !',
    //   )
    // }
  }
  getAllColumn() {
    console.log("method call");
    this.excelUpload.getAllExcelColumn().subscribe(response => {
      this.excelMap = response;
      //  this.excelMap=this.columnname1.columnname;
      console.log(this.excelMap);
      console.log(this.excelMap[0]);
      this.dataSource = new MatTableDataSource<ExcelMappingClass>(this.excelMap);
    });
  }
  addNewColumn() {
    this.newColumn.push(new ExcelMappingClass());
    // this.column1=true;
  }

  addFieldValue() {

    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};


  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

}
