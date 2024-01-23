import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FctCreditBalance } from '../FctCreditBalance';
import { APIService } from '../../api.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit
 {

  credit :any;
  data:any;
  response:any;
  downloadMsg:any;
  validationResponse:any;
  selectedItems = [];
  dropdownSettings = {};
  selected = [];
  dropdownList = [];
  columnId = [];
  newCredit:FctCreditBalance[];

  constructor(private apiService:APIService) { }

  ngOnInit() {

    $("#show").click(function(){
      $("#btnExport").show();
  });

  $("#hide").click(function(){
    $("#btnExport").hide();
});

    this.dropdownList = [
      { item_id: 1, item_text: 'Credit Class' },
      { item_id: 2, item_text: 'Econ Sect' },
      { item_id: 3, item_text: 'Facility' },
      { item_id: 4, item_text: 'Branch Code' },
      { item_id: 5, item_text: 'Cod Inst Id' },
      { item_id: 6, item_text: 'Today' },
      { item_id: 7, item_text: 'Alt Acc No' },
      // { item_id: 8, item_text: 'Acc Number' },
      { item_id: 8, item_text: 'Acc Type' },
      { item_id: 9, item_text: 'Country' },
      { item_id: 10, item_text: 'System Class' },
      { item_id: 11, item_text: 'Mgt Status' },
      { item_id: 12, item_text: 'Ccy' },
      { item_id: 13, item_text: 'Product' },
      { item_id: 14, item_text: 'Amount Disbursed' },
      { item_id: 15, item_text: 'Principal Gl Code' },
      { item_id: 16, item_text: 'Main Int Gl Code' },
      { item_id: 17, item_text: 'Penal Int Gl Code' },
      { item_id: 18, item_text: 'Penal Prin Gl Code' },
      { item_id: 19, item_text: 'Due Days' },
      { item_id: 20, item_text: 'Int Rate' },
      { item_id: 21, item_text: 'Exch Rate' },
      { item_id: 22, item_text: 'Interest Overdue' },
      { item_id: 23, item_text: 'Penal Interest Overdue' },
      { item_id: 24, item_text: 'Penal Principal Overdue' },
      { item_id: 25, item_text: 'Total Outstanding Accural' },
      { item_id: 26, item_text: 'Principal Outs Bal' },
      { item_id: 27, item_text: 'Principal Outs Bal Lcy' },
      { item_id: 28, item_text: 'Total Out Lcy' },
      { item_id: 29, item_text: 'Book Date' },
      { item_id: 30, item_text: 'Value Date' },
      { item_id: 31, item_text: 'Maturity Date' },
      { item_id: 32, item_text: 'Security Details' },
      { item_id: 33, item_text: 'Unit' },
      { item_id: 34, item_text: 'Liab Status' },
      { item_id: 35, item_text: 'Tflag' },
      { item_id: 36, item_text: 'Customer Type' },
      { item_id: 37, item_text: 'Debit Int Oddays' },
      { item_id: 38, item_text: 'Msme' },
      { item_id: 39, item_text: 'Prd2' },
      { item_id: 40, item_text: 'Prev Month'},
      { item_id: 41, item_text: 'Remarks' } ,
      { item_id: 42, item_text: 'prfortwo' } ,
      { item_id: 43, item_text: 'prv liab status' },
      { item_id: 44, item_text: 'prv remarks' }];
      

      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: true,
        enableCheckAll:false
      };

  }

  onItemSelect (item:any) {
    console.log("before adding "+this.selected);
     this.selected.push(item.item_text);
     this.columnId.push(item.item_id);
     console.log(this.columnId);
     console.log("after adding "+this.selected);
  }
  onSelectAll (items: any) {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      this.selected.push(element.item_text);
    }
    console.log(this.selected);
  }
  onItemDeSelect (items: any) {
   
     console.log("before removing "+this.selected);
   var index = this.selected.indexOf(items.item_text);
   console.log(index);
     this.selected.splice(index,1);
     this.columnId.splice(index,1);
     console.log("after removing "+this.selected);
  }

  reset() {

    this.selectedItems=null;
    var index;
    this.selected.splice(index);
    this.columnId.splice(index);
    console.log(this.selected);
    this.credit=null;
    this.response=null;
    this.validationResponse=null;
    this.downloadMsg = null;
    this.data = null;
    //this.myForm.get("dateModel").patchValue([]);  // here multiselect should be reset with an empty array.
  }

  getFields(d_mis_date:Date)
  {
    this.validationResponse = "Fetching Records...";
    console.log(d_mis_date);
    if(!d_mis_date)
    {
      this.validationResponse = "Please MIS Enter Date!";
      this.downloadMsg = null;
    }
    else
    {
  //this.credit=
  
  this.apiService.getCreditBalanceModList(d_mis_date).subscribe(event =>{
    this.credit = event;
    this.data = this.credit;
    console.log(this.credit);
    //this.processRecords();
    if(this.credit)
    {
      this.downloadMsg = null;
      this.response = null;
      this.validationResponse = null;
      if(this.credit[0]==null)
      {
      this.validationResponse = "No Data Found with given MIS Date!";
      this.downloadMsg = null;
     }
    }
     else
     {
       this.validationResponse = null;
       this.downloadMsg = null;
     }
    
  });

}
if(!this.credit)
{
  //this.response="No Data Found with that Date";
  this.downloadMsg = null;
}
else
{
  this.response=null;
  this.downloadMsg = null;
}
  }
//   tableToExcel = (function () {
//     var uri = 'data:application/vnd.ms-excel;base64,'
//         , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
//         , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
//         , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
//     return function (table, name) {
//         if (!table.nodeType) table = document.getElementById(table)
//         var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
//         var blob = new Blob([format(template, ctx)]);
//         var blobURL = window.URL.createObjectURL(blob);
//         this.downloadMsg = "Download Successful!";
//         this.validationResponse = null;
//         if (this.ifIE()) {
//            var csvData = table.innerHTML;
//             if (window.navigator.msSaveBlob) {
//                 var blob = new Blob([format(template, ctx)], {
//                     type: "text/html"
//                 });
//                 navigator.msSaveBlob(blob, '' + name + '.xls');
//             }
//         }
//         else
//         window.location.href = uri + base64(format(template, ctx))
//     }
// })()

//  ifIE():boolean
//  {
//     var isIE11 = navigator.userAgent.indexOf(".NET CLR") > -1;
//     var isIE11orLess = isIE11 || navigator.appVersion.indexOf("MSIE") != -1;
//     return isIE11orLess;
// }

clone(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
          copy[i] = this.clone(obj[i]);
      }
      return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
      }
      return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

downloadExcel():any
{
  // this.apiService.mdaDownloadExcel(this.credit);
  // console.log(this.credit);
//var temp = Object.assign({},this.credit);
console.log(this.credit);
var temp = this.clone(this.credit);
console.log(temp);
  const options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '',
    showLabels: true, 
    filename:"FctCreditBalance",
    //showTitle: true,
    //title: 'My Awesome CSV',
    //useBom: true,
    useKeysAsHeaders: true
     //headers: ['Mis Date', 'Account No', 'Customer Name','Lib No','Customer No','Credit Class','Econ Sect','Facility','Branch Code','Cod Inst Id','Today','Alt Acc No','Acc Type','Country','System Class','Mgt Status','Ccy','Product','Amount Disbursed','Principal Gl Code','Main Int Gl Code','Penal Int Gl Code','Penal Prin Gl Code','Due Days','Int Rate','Exch Rate','Interest Overdue','Penal Interest Overdue','Penal Principal Overdue','Total Outstanding Accural','Principal Outs Bal','Principal Outs Bal Lcy','Total Out Lcy','Book Date','Value Date','Maturity Date','Security Details','Unit','Liab Status','Tflag','Customer Type','Debit Int Oddays','Msme','Prd2','Remarks','Prev Month'] //<-- Won't work with useKeysAsHeaders present!
  };

  for (let i = 0; i < this.data.length; i++) {
    //const element = this.credit[i];
    // temp =  this.credit[i];

    if(this.columnId.includes(1))
    {
      //temp = this.credit[];
      //console.log(this.data);
      console.log("IF");
//console.log(this.data);
    }
    else
    {
      temp[i].credit_class = " ";
      console.log("ELSE");
    }
    if(this.columnId.includes(2))
    {
     
    }
    else
    {
      temp[i].econ_sect = " ";
    }
    if(this.columnId.includes(3))
    {
     
    }
    else
    {
      temp[i].facility = " ";
    }
    if(this.columnId.includes(4))
    {
      //temp[i].branch_code = "\""+temp[i].branch_code;
    }
    else
    temp[i].branch_code = " ";
    if(this.columnId.includes(5))
    {
     
    }
    else
    temp[i].cod_inst_id = " ";
    if(this.columnId.includes(6))
    {
      //temp[i].today = "\""+temp[i].today;
    }
    else
    temp[i].today = " ";
    if(this.columnId.includes(7))
    {
     
    }
    else
    temp[i].alt_acc_no = " ";
    if(this.columnId.includes(8))
    {
     
    }
    else
    temp[i].acc_type = " ";
    if(this.columnId.includes(9))
    {
      
    }
    else
    temp[i].country = " ";
    if(this.columnId.includes(10))
    {
      
    }
    else
    temp[i].system_class = " ";
    if(this.columnId.includes(11))
    {
     
    }
    else
    temp[i].mgt_status = " ";
    if(this.columnId.includes(12))
    {
     
    }
    else{
      temp[i].ccy = " ";
    }
    if(this.columnId.includes(13))
    {
     
    }
    else{
      temp[i].product = " ";
    }
    if(this.columnId.includes(14))
    {
     
    }
    else{
      temp[i].amount_disbursed = " ";
    }
    if(this.columnId.includes(15))
    {
     
    }
    else{
      temp[i].principal_gl_code = " ";
    }
    if(this.columnId.includes(16))
    {
     
    }
    else{
      temp[i].main_int_gl_code = " ";
    }
    if(this.columnId.includes(17))
    {
     
    }
    else{
      temp[i].penal_int_gl_code = " ";
    }
    if(this.columnId.includes(18))
    {
     
    }
    else{
      temp[i].penal_prin_gl_code = " ";
    }
    if(this.columnId.includes(19))
    {
     
    }
    else{
      temp[i].due_days = " ";
    }
    if(this.columnId.includes(20))
    {
     
    }
    else{
      temp[i].int_rate = " ";
    }
    if(this.columnId.includes(21))
    {
     
    }
    else{
      temp[i].exch_rate = " ";
    }
    if(this.columnId.includes(22))
    {
     
    }
    else{
      temp[i].interest_overdue = " ";
    }
    if(this.columnId.includes(23))
    {
     
    }
    else{
      temp[i].penal_interest_overdue = " ";
    }
    if(this.columnId.includes(24))
    {
     
    }
    else{
      temp[i].penal_principal_overdue = " ";
    }
    if(this.columnId.includes(25))
    {
     
    }
    else{
      temp[i].total_outstanding_accural = " ";
    }
    if(this.columnId.includes(26))
    {
     
    }
    else{
      temp[i].principal_outs_bal = " ";
    }
    if(this.columnId.includes(27))
    {
     
    }
    else{
      temp[i].principal_outs_bal_lcy = " ";
    }
    if(this.columnId.includes(28))
    {
     
    }
    else{
      temp[i].total_out_lcy = " ";
    }
    if(this.columnId.includes(29))
    {
     
    }
    else{
      temp[i].book_date = " ";
    }
    if(this.columnId.includes(30))
    {
     
    }
    else{
      temp[i].value_date = " ";
    }
    if(this.columnId.includes(31))
    {
     
    }
    else{
      temp[i].maturity_date = " ";
    }
    if(this.columnId.includes(32))
    {
     
    }
    else{
      temp[i].security_details = " ";
    }
    if(this.columnId.includes(33))
    {
     
    }
    else{
      temp[i].unit = " ";
    }
    if(this.columnId.includes(34))
    {
     
    }
    else{
      temp[i].liab_status = " ";
    }
    if(this.columnId.includes(35))
    {
     
    }
    else{
      temp[i].tflag = " ";
    }
    if(this.columnId.includes(36))
    {
     
    }
    else{
      temp[i].customer_type = " ";
    }
    if(this.columnId.includes(37))
    {
     
    }
    else{
      temp[i].debit_int_oddays = " ";
    }
    if(this.columnId.includes(38))
    {
     
    }
    else{
      temp[i].msme = " ";
    }
    if(this.columnId.includes(39))
    {
     
    }
    else{
      temp[i].prd2 = " ";
    }
    if(this.columnId.includes(40))
    {
     
    }
    else{
      temp[i].remarks = " ";
    }
    if(this.columnId.includes(41))
    {
     
    }
    else{
      temp[i].remarks = " ";
    }
    if(this.columnId.includes(42))
    {
     
    }
    else{
      temp[i].prvRemarks = " ";
    }
    if(this.columnId.includes(43))
    {
     
    }
    else{
      temp[i].prvLiabStatus = " ";
    }
    
    
    //temp[i].prev_month = " ";
    //temp[i].d_mis_date = +temp[i].d_mis_date;
    //temp[i].liab_number = +temp[i].liab_number;
    //temp[i].customer_number = +temp[i].customer_number;
  }

  this.newCredit = temp;

  return this.newCredit;
//const csvExporter = new ExportToCsv(options);
 
//csvExporter.generateCsv(temp);
//this.downloadMsg = "Download Successful!";
}

public exportAsExcelFile(json: any[], excelFileName: string): void {
  
  //json = this.data;
  json = this.downloadExcel();
  console.log(json);
  
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
