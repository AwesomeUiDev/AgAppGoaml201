import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionDto } from '../transaction-dto';
import { GenerateXml } from '../generate-xml/generate-xml';
import { UserStatusDTO } from './user-status-dto';
import { MatPaginator } from '@angular/material';
import { XmlServiceService } from '../service/xml-service.service';
import { UserService } from 'src/app/user/user.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-auditlog',
  templateUrl: './user-auditlog.component.html',
  styleUrls: ['./user-auditlog.component.css']
})
export class UserAuditlogComponent implements OnInit {

  response:any;
  response1:any;
  response2:any;
  transactionDto:TransactionDto;
  statusDto:UserStatusDTO = new UserStatusDTO();
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
  value1: any;
  dateval: string;
  fromdate: string;
  todate: string;

  // ngOnInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  constructor(private service:XmlServiceService,private userservice:UserService) { }
  // private datePipe: DatePipe

  ngOnInit() {
    this.datafortable=false;
    this.generateXml();
    this.tocheckTheDropdown();
  
   // this.dataSource.sort = this.sort;
  }
  handlesInputChange(value)
  {
    
        this.value1 = value;
    //  console.log(this.value1) 
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
  convertDate(value): string{
    let date = moment(value).format('YYYY-MM-DD');
    // let date = moment(new Date(value)).format("MMM-DD-YYYY");
     console.log("date", date);
    return date;

  }
 
  getRecordTrn(){
   
    console.log(this.statusDto.fromDate);
    console.log(this.statusDto.toDate); 
    console.log(this.statusDto.reportType);
    let d_mis_date=this.statusDto.toDate
  // this.dateval=this.datePipe.transform(this.dateData.toDate,"dd-MM-yy");
   this.fromdate= this.convertDate(this.statusDto.fromDate)
   this.todate= this.convertDate(this.statusDto.toDate)
   console.log(this.fromdate+"in"+this.todate)
   this.statusDto.fromDate=this.fromdate;
   console.log(this.statusDto.fromDate);
    console.log(this.statusDto.toDate); 
   this.statusDto.toDate=this.todate;
    this.userservice.getuseraudit(this.statusDto).subscribe(data => {
      this.response1 = data;
      console.log("res::",data)
      this.response2 = data;
      console.log("resp1::",this.response2)
      console.log("response1::", this.response1[0].responsemsg)
      console.log("response2::", this.response2[0].responsemsg);
      if(this.response2[0].responsemsg === "No Data Found"){
        // window.alert("if download");
       console.log("IF: ")
       Swal.fire(`No Data Found`);
      }else{
        console.log("Else : ")
        // window.alert("else download");
        // Swal.fire(`Downloading`);
        this.exportAsXLSX();
      }
     
      // this.downloadData();
      // console.log(this.response1);
    //   if(this.statusDto.reportType=="User Status Report")
    //   {
    //     console.log("inside"+this.dateData.reportType);
    //   }else 
    //   {
    //     console.log("inside audit log"+this.dateData.reportType);
    //   }
    //   this.datafortable=true;
    //   //console.log(this.response);
    //  // JSON.parse(this.response1);
    //   console.log(this.response1);
    //   this.dataSource = new MatTableDataSource<any>(this.response1);
    //   this.dataSource.paginator = this.paginator;
    });
  }
downloadData(){
  console.log(this.dateData.toDate);
  console.log(this.dateData.fromDate);
  console.log(this.dateData.reportType);
  this.service.getReport1(this.statusDto).subscribe(data => {
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
    var myDate= new Date();
    let todayDate = moment(myDate).format('DD-MM-YYYY');
    console.log("todayDate",todayDate)
    var reporttype1;
    if(this.statusDto.reportType === "User Status Report"){
      reporttype1 = "User_Report_"+todayDate;
    }
    else{
      reporttype1 = "Audit_Report_"+todayDate;
    }
    this.service.exportAsExcelFile2(this.response2, reporttype1);
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
