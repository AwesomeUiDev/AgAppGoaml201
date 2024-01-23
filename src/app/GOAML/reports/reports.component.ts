import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionDto } from '../transaction-dto';
import { XmlServiceService } from '../service/xml-service.service';
import { GenerateXml } from '../generate-xml/generate-xml';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PeriodicElement } from '../messages/messages.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  response:any;
  response1:any;
  response2:any;
  transactionDto:TransactionDto;
  dateData: GenerateXml = new GenerateXml();
  report:TransactionDto[];
  reportTypeData:any;
  list = new Array<TransactionDto>();
  datafortable:boolean;
reportName1:TransactionDto;
reportNameForDropdown: Array<TransactionDto["reportName"]>;
displayedColumns: string[] = ['trnRefNo', 'transactionDate', 'module', 'currency','lcyAmount','reportingDate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: any;
 // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngOnInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  constructor(private service:XmlServiceService) { }

  ngOnInit() {
    this.datafortable=false;
    this.generateXml();
    this.tocheckTheDropdown();
  
   // this.dataSource.sort = this.sort;
  }
  generateXml() {

    // console.log(this.dateData.toDate);
    // console.log(this.dateData.fromDate);
    this.service.reportDataCall().subscribe(data => {
      this.response = data;
    //  this.dataSource=this.response;
    //  this.paginator = this.paginator;
    });
    // console.log(this.generate.fromDate);
    // console.log(this.generate.toDate);
  }
 
  getRecordTrn(){
    console.log(this.dateData.toDate);
    console.log(this.dateData.fromDate);
    console.log(this.dateData.reportType);
    this.service.getReport(this.dateData).subscribe(data => {
      this.response1 = data;
      this.datafortable=true;
      //console.log(this.response);
     // JSON.parse(this.response1);
      console.log(this.response1);
      this.dataSource = new MatTableDataSource<any>(this.response1);
      this.dataSource.paginator = this.paginator;
    });
  }
downloadData(){
  console.log(this.dateData.toDate);
  console.log(this.dateData.fromDate);
  console.log(this.dateData.reportType);
  this.service.getReport1(this.dateData).subscribe(data => {
    this.response2 = data;
    console.log("response2",this.response2);
    // this.dataSource = new MatTableDataSource<any>(this.response1);
    // this.dataSource.paginator = this.paginator;
  });
  if(this.response2) {
    this.exportAsXLSX();
    console.log("exportAsXLSX in if")
  }
}
  exportAsXLSX():void {
  
    this.service.exportAsExcelFile(this.response2, 'report');
    console.log("exportasXLSX")
  }
  getDowmloadData(){
    this.service.getReportTableData(this.dateData).subscribe(data => {
      console.log("getdownlaod")
      this.response = data;
    });
  }
  tocheckTheDropdown() {
    this.service.getAllTrnDto().subscribe(resp => {
  
      this.reportTypeData = resp;
     console.log(this.reportTypeData);
      console.log(this.list);

    });
    console.log(this.reportNameForDropdown);
  }
  tableHide(){
    this.datafortable = undefined;
  }
}
