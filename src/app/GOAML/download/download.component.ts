import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { TransactionDto } from '../transaction-dto';
import { GenerateXml } from '../generate-xml/generate-xml';
import { MatPaginator, MatTableDataSource, MatDatepickerInputEvent, MatSort } from '@angular/material';
import { XmlServiceService } from '../service/xml-service.service';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { Authorize } from '../authorize-xml/authorize';
import { element } from 'protractor';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  response:any;
  response1:any;
  response2:any;
  transactionDto:TransactionDto;
  dateData: GenerateXml = new GenerateXml();
  authorize:Authorize =new Authorize();
  reportDate: TransactionDto = new TransactionDto();
  report:TransactionDto[];
  reportTypeData:any;
  list = new Array<TransactionDto>();
  datafortable:boolean;
reportName1:TransactionDto;
reportNameForDropdown: Array<TransactionDto["reportName"]>;
displayedColumns: string[] = ['reportName', 'reportType','makerId','action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: any;
 // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
 dataDate:Date;
//  =new FormControl(moment());
 currentTime: string = moment().format('MMM-DD-YYYY');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  response3: any;
  events: string;
  fileUrl: any;

  // ngOnInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  constructor(private service:XmlServiceService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.datafortable=false;
    this.generateXml();
    this.tocheckTheDropdown();
    // this.getData();

    
  
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
      this.dataSource.sort = this.sort;
    });
  }
downloadData(element){
  // console.log(this.dateData.toDate);
  console.log(this.dateData.fromDate);
  // console.log(this.dateData.reportType);
  console.log("ele", element);
  let downloadquery = [element];
  this.service.getReportDownload(downloadquery).subscribe((data:any) => {
    this.response2 = data;
    // this.downloadingXmlfile(data);
  // setTimeout(() => {
      this.downloadingXmlfile(data,element);
    // }, 5000);


    // console.log(this.response2);
    // console.log("reportId",this.reportDate.reportId)

    // console.log("response3", this.response3 )
    // this.dataSource = new MatTableDataSource<any>(this.response1);
    // this.dataSource.paginator = this.paginator;
  });
  
  
  // if(this.response2) {
  //   this.exportAsXLSX();
  // }
}
  exportAsXLSX():void {
  
    this.service.exportAsExcelFile(this.response2, 'report');
  }
  getDowmloadData(){
    this.service.getReportTableData(this.dateData).subscribe(data => {
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
  
getData(){
  console.log("date",this.dateData.fromDate)
  // let dateval = moment(new Date(value)).format("MMM-DD-YYYY");
  let executionDate = this.service.convertDate(this.dateData.fromDate);
  console.log("exe:",executionDate)
  this.service.getReportsData(executionDate).subscribe(reportdata => {
    this.response3 = reportdata;
    console.log("reports::",reportdata)
    let authArray=[];
    for(let i=0;i<reportdata.length;i++){
      if(reportdata[i].authStatus=='A'){
        authArray.push(reportdata[i])

      }
    }
    if(!authArray.length)
    {
      Swal.fire('No Data Found');
      return false;
    }
    console.log("autharray",authArray)
    this.datafortable=true;
    this.dataSource = new MatTableDataSource<any>(authArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    setTimeout(() => this.dataSource.paginator = this.paginator);
  });
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  } 
}
downloadingXmlfile(data,reportData){
  console.log("reportData::",reportData)
     const blob = new Blob([data], { type: 'application/xml' });
  this.fileUrl=window.URL.createObjectURL(blob);
    //  this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
//      let link = document.createElement('a');
// link.href = this.fileUrl; //data is object received as response
// link.download = "testing.xml";
// link.click();
// setTimeout(() => {
  let link = document.createElement('a');
  link.href = this.fileUrl; //data is object received as response
  console.log("response3",this.response3);
  link.download = reportData.reportName+".xml";
 
  // console.log("reportname",link.download)
  // console.log("report:::",reportData[0].reportName)
  link.click();
// }, 1000);


}
}
