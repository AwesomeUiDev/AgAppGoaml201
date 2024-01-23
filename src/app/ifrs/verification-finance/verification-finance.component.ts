import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/api.service';
import { FctIfrs } from '../fctIfrs';
import { HttpErrorResponse } from '@angular/common/http';
import { exec } from 'child_process';
declare const $;

@Component({
  selector: 'app-verification-finance',
  templateUrl: './verification-finance.component.html',
  styleUrls: ['./verification-finance.component.css']
})
export class VerificationFinanceComponent implements OnInit {

  data: any;
  downloadMsg: any;
  validationResponse: any;


  constructor(private apiService: APIService) { }

  ngOnInit() {

    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip(); 
  });
  }

  fetchAllVerificationFinance(exec_date, lib_no) {
    console.log(exec_date);
    console.log(lib_no);
    this.downloadMsg = null;
    this.validationResponse = "Fetching Records Please Wait!";
    if(!exec_date)
    {
      this.validationResponse = "Enter Date!";
    }
    else
    {
      if(!lib_no)
      {
        lib_no = null;
      }
    this.apiService.fetchAllVerificationFinanceService(exec_date, lib_no).subscribe(resp=>{
      this.data = resp;
      console.log(this.data);
      if(this.data)
      {
        this.validationResponse = null;
      }
      else
      {
        this.validationResponse = "No Data Found!";
        this.downloadMsg = null;
      }
    },error=>{
      if(HttpErrorResponse)
      {
        this.validationResponse = "Failed!";
        this.downloadMsg = null;
      }
    });
  }
  }

  reset()
  {
    this.validationResponse = null;
    this.downloadMsg = null;
    this.data = null;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
  
    //json = this.data;
    

  //   for (let i = 0; i < this.data.length; i++) {
  //     //const element = this.credit[i];
  //     // temp =  this.credit[i];
  
  //     if(this.data[i].exec_date.includes("null") || this.data[i].exec_date.includes(null))
  //     {
  //       //temp = this.credit[];
  //       //console.log(this.data);
  //       this.data[i].exec_date = " ";
        
  // //console.log(this.data);
  //     }
  //     if(this.data[i].facility.includes("null") || this.data[i].facility == null)
  //     {
  //       this.data[i].facility = " ";
  //     }
  //   }
    //   else
    //   {
    //     temp[i].econ_sect = " ";
    //   }
    //   if(this.columnId.includes(3))
    //   {
       
    //   }
    //   else
    //   {
    //     temp[i].facility = " ";
    //   }
    //   if(this.columnId.includes(4))
    //   {
    //     //temp[i].branch_code = "\""+temp[i].branch_code;
    //   }
    //   else
    //   temp[i].branch_code = " ";
    //   if(this.columnId.includes(5))
    //   {
       
    //   }
    //   else
    //   temp[i].cod_inst_id = " ";
    //   if(this.columnId.includes(6))
    //   {
    //     //temp[i].today = "\""+temp[i].today;
    //   }
    //   else
    //   temp[i].today = " ";
    //   if(this.columnId.includes(7))
    //   {
       
    //   }
    //   else
    //   temp[i].alt_acc_no = " ";
    //   if(this.columnId.includes(8))
    //   {
       
    //   }
    //   else
    //   temp[i].acc_type = " ";
    //   if(this.columnId.includes(9))
    //   {
        
    //   }
    //   else
    //   temp[i].country = " ";
    //   if(this.columnId.includes(10))
    //   {
        
    //   }
    //   else
    //   temp[i].system_class = " ";
    //   if(this.columnId.includes(11))
    //   {
       
    //   }
    //   else
    //   temp[i].mgt_status = " ";
    //   if(this.columnId.includes(12))
    //   {
       
    //   }
    //   else{
    //     temp[i].ccy = " ";
    //   }
    //   if(this.columnId.includes(13))
    //   {
       
    //   }
    //   else{
    //     temp[i].product = " ";
    //   }
    //   if(this.columnId.includes(14))
    //   {
       
    //   }
    //   else{
    //     temp[i].amount_disbursed = " ";
    //   }
    //   if(this.columnId.includes(15))
    //   {
       
    //   }
    //   else{
    //     temp[i].principal_gl_code = " ";
    //   }
    //   if(this.columnId.includes(16))
    //   {
       
    //   }
    //   else{
    //     temp[i].main_int_gl_code = " ";
    //   }
    //   if(this.columnId.includes(17))
    //   {
       
    //   }
    //   else{
    //     temp[i].penal_int_gl_code = " ";
    //   }
    //   if(this.columnId.includes(18))
    //   {
       
    //   }
    //   else{
    //     temp[i].penal_prin_gl_code = " ";
    //   }
    //   if(this.columnId.includes(19))
    //   {
       
    //   }
    //   else{
    //     temp[i].due_days = " ";
    //   }
    //   if(this.columnId.includes(20))
    //   {
       
    //   }
    //   else{
    //     temp[i].int_rate = " ";
    //   }
    //   if(this.columnId.includes(21))
    //   {
       
    //   }
    //   else{
    //     temp[i].exch_rate = " ";
    //   }
    //   if(this.columnId.includes(22))
    //   {
       
    //   }
    //   else{
    //     temp[i].interest_overdue = " ";
    //   }
    //   if(this.columnId.includes(23))
    //   {
       
    //   }
    //   else{
    //     temp[i].penal_interest_overdue = " ";
    //   }
    //   if(this.columnId.includes(24))
    //   {
       
    //   }
    //   else{
    //     temp[i].penal_principal_overdue = " ";
    //   }
    //   if(this.columnId.includes(25))
    //   {
       
    //   }
    //   else{
    //     temp[i].total_outstanding_accural = " ";
    //   }
    //   if(this.columnId.includes(26))
    //   {
       
    //   }
    //   else{
    //     temp[i].principal_outs_bal = " ";
    //   }
    //   if(this.columnId.includes(27))
    //   {
       
    //   }
    //   else{
    //     temp[i].principal_outs_bal_lcy = " ";
    //   }
    //   if(this.columnId.includes(28))
    //   {
       
    //   }
    //   else{
    //     temp[i].total_out_lcy = " ";
    //   }
    //   if(this.columnId.includes(29))
    //   {
       
    //   }
    //   else{
    //     temp[i].book_date = " ";
    //   }
    //   if(this.columnId.includes(30))
    //   {
       
    //   }
    //   else{
    //     temp[i].value_date = " ";
    //   }
    //   if(this.columnId.includes(31))
    //   {
       
    //   }
    //   else{
    //     temp[i].maturity_date = " ";
    //   }
    //   if(this.columnId.includes(32))
    //   {
       
    //   }
    //   else{
    //     temp[i].security_details = " ";
    //   }
    //   if(this.columnId.includes(33))
    //   {
       
    //   }
    //   else{
    //     temp[i].unit = " ";
    //   }
    //   if(this.columnId.includes(34))
    //   {
       
    //   }
    //   else{
    //     temp[i].liab_status = " ";
    //   }
    //   if(this.columnId.includes(35))
    //   {
       
    //   }
    //   else{
    //     temp[i].tflag = " ";
    //   }
    //   if(this.columnId.includes(36))
    //   {
       
    //   }
    //   else{
    //     temp[i].customer_type = " ";
    //   }
    //   if(this.columnId.includes(37))
    //   {
       
    //   }
    //   else{
    //     temp[i].debit_int_oddays = " ";
    //   }
    //   if(this.columnId.includes(38))
    //   {
       
    //   }
    //   else{
    //     temp[i].msme = " ";
    //   }
    //   if(this.columnId.includes(39))
    //   {
       
    //   }
    //   else{
    //     temp[i].prd2 = " ";
    //   }
    //   if(this.columnId.includes(40))
    //   {
       
    //   }
    //   else{
    //     temp[i].remarks = " ";
    //   }
      
    //   temp[i].prev_month = " ";
    //   //temp[i].d_mis_date = +temp[i].d_mis_date;
    //   //temp[i].liab_number = +temp[i].liab_number;
    //   //temp[i].customer_number = +temp[i].customer_number;
    // }
    
    //json = temp;
    //excelFileName = "fct";
    //const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    //const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data']};
   
    //const excelBuffer: any = XLSX.writeFile(workbook, excelFileName);
    
    //const output:any = XLSX.writeFile(workbook, excelBuffer);
    //console.log(output);
    //alasql('SELECT firstName AS FirstName INTO XLSX("test.xlsx", ?) FROM ?', [options, $scope.users]);
    //this.saveAsExcelFile(excelBuffer, excelFileName);
  
    //function exportExcel(json) {
     // delete this.data.rowNumber;
     //delete Object.getPrototypeOf(this.data).name;
      console.log(this.data);
      json = this.data;
      var fileName=prompt("Enter Filename");
      var opts = {
        headers:true, 
        column: {
            style:{
                Font:{
                    Bold:"1",
                    Color:"#3C3741",
                },
                Alignment:{
                    Horizontal:"Center"
                },
                Interior:{
                    Color:"#7CEECE",
                    Pattern:"Solid"
                }
            },
        },
      };
      alasql('SELECT * INTO XLSXML("'+fileName+'.xls",?) FROM ?',[opts,json ]);
      this.downloadMsg = "Note: By Default File is xml spreadsheet, save as xls before uploading!";
  
      
  //}
  
  
  }


  }

