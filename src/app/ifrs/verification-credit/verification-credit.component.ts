import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/api.service';
import { FctIfrs } from '../fctIfrs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-verification-credit',
  templateUrl: './verification-credit.component.html',
  styleUrls: ['./verification-credit.component.css']
})
export class VerificationCreditComponent implements OnInit {

  data: any;
  downloadMsg: any;
  validationResponse: any;

  constructor(private apiService: APIService) { }

  ngOnInit() {
  }

  fetchAllVerificationCredit(exec_date, lib_no) {
    this.validationResponse = "Fetching Records Please Wait!";
    if(!exec_date)
    {
      this.validationResponse = "Enter Date!";
    }
    // else if(!lib_no)
    // {
    //   this.validationResponse = "Enter Lib No!";
    // }
    else
    {
      if(!lib_no)
      {
        lib_no = null;
      }
    this.apiService.fetchAllVerificationCreditService(exec_date, lib_no).subscribe(resp=>{
      this.data = resp;
      console.log(this.data);
      if(this.data)
      {
        this.validationResponse = null;
      }
      else
      {
        this.validationResponse = "No Data Found!";
      }

    },error=>{
      if(HttpErrorResponse)
      {
        this.validationResponse = "Failed!";
      }
    }
    );
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
    json = this.data;
    
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
