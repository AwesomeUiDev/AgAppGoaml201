import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ExcelMappingClass } from '../excel-mapping/excelMapping';
import { ExcelMaster } from './excelMasterClass';
import { ExternalSystem } from '../excel-mapping/externalSystem';
import { ExcelProcessingService } from 'src/app/GOAML/service/xmlservice.service';

@Component({
  selector: 'app-excel-processing',
  templateUrl: './excel-processing.component.html',
  styleUrls: ['./excel-processing.component.css']
})
export class ExcelProcessingComponent implements OnInit {
  displayedColumns: string[] = ['creditAmount', 'debitAmount', 'numberOfRecords'];
  dataSource: any;
  toppings = new FormControl();
  excelMap: ExcelMappingClass[];
  columnname1:ExcelMappingClass;
  excelMasterData:any;
  postexcelMasterData:ExcelMaster=new ExcelMaster();
  responseData:any;
  dataFromresponse:ExcelMaster;
  form: FormGroup;
  extSysData:ExternalSystem[];
  processData:ExternalSystem;
  excelMaint: ExcelMappingClass = new ExcelMappingClass();
  //toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(private excelUpload: ExcelProcessingService) { }

  ngOnInit() {
    this. getAllExternalSystem();
  }
  getAllExternalSystem(){
    console.log('mathos call');
    this.excelUpload.getAllExternalSystem().subscribe(response=>{
      this.extSysData=response;
      console.log( this.extSysData);
    
    });
   // console.log( this.extSysData);
  }
  getExternalSystem(ext){
console.log(ext.extSys);
this.excelUpload.getProcessNameWithExtSys(ext.extSys).subscribe(response=>{
this.processData=response;
console.log(this.processData);
console.log('process method end');
});
  }
  getProcessName(extSys1){
    console.log(extSys1);
    
    this.excelUpload.getProcessNameWithExtSys(extSys1).subscribe(response=>{
    this.processData=response;
    console.log(this.processData);
    console.log('process method end');
    });
      }
  finalSubmit(dateforData: Date){
    console.log(this.processData,dateforData);
//this.postexcelMasterData.externalSystem=process.extSys;
//this.postexcelMasterData.processingDate=dateforData;
//this.postexcelMasterData.process=this.processData;
    // this.excelUpload.showDetails(process,dateforData).subscribe(response=>{
    //   this.dataFromresponse=response;
    //   this.dataFromresponse=this.excelMasterData;
    //   console.log(this.dataFromresponse);
    //   console.log(this.excelMasterData);
    // });
    this.excelUpload.processData(this.processData.extSys,this.processData.processName,this.postexcelMasterData).subscribe(response=>{
      this.excelMasterData=response;
      
     this.dataFromresponse=this.excelMasterData;
    
    //  console.log(this.dataFromresponse);
    //  console.log(this.dataFromresponse.creditAmount);
    //   console.log(this.excelMasterData);
    });
  }

  getProcessData(){
    console.log('get process call');
    this.excelUpload.getProcessDataMethod().subscribe(response=>{
      this.responseData=response;
      console.log( this.responseData);
    });
  }

}
