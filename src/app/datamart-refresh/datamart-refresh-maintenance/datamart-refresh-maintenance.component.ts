import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/api.service';
import { MdMultiSqlDetails } from './MdMultiSql';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-datamart-refresh-maintenance',
  templateUrl: './datamart-refresh-maintenance.component.html',
  styleUrls: ['./datamart-refresh-maintenance.component.css']
})
export class DatamartRefreshMaintenanceComponent implements OnInit {

  constructor(private apiService:APIService,private router:Router) { }

  validationResponse:any;
  response:any;
  reportList:string[];
  mdMultiSqlDetails:MdMultiSqlDetails[];
  reportNo:string;
  reportParameterData=new MdMultiSqlDetails();

  ngOnInit() {
    this.getMaintenanceReports();
  }

  getMaintenanceReports()
  {
    this.apiService.getMaintenanceReportsService().subscribe(resp=>{
      this.reportList = resp;
      console.log(this.reportList);
    });
  }

  getMaintenanceLines(v_report_no)
  {
    this.reportNo=v_report_no;
    this.apiService.getLinesForMaintenanceService(v_report_no).subscribe(resp=>{
      this.mdMultiSqlDetails = resp;
      console.log(this.mdMultiSqlDetails);
    });
  }

  navigateToReportParameter(n_sort_order,v_report_line_desc)
  {
    console.log(n_sort_order);
    console.log(v_report_line_desc);
    
    for (let i = 0; i < this.mdMultiSqlDetails.length; i++) 
    {
      if(this.mdMultiSqlDetails[i].n_sort_order==n_sort_order&&this.mdMultiSqlDetails[i].v_report_line_desc==v_report_line_desc&&this.mdMultiSqlDetails[i].v_report_no==this.reportNo)
      this.reportParameterData= this.mdMultiSqlDetails[i];
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
            //"firstname": "Nic"
            "n_sort_order": this.reportParameterData.n_sort_order,

            "v_report_no":  this.reportParameterData.v_report_no,

            "v_report_line_desc":  this.reportParameterData.v_report_line_desc,

            "v_column_name1":  this.reportParameterData.v_column_name1,

            "v_column_name1_value": this.reportParameterData.v_column_name1_value,

            "v_column_name2": this.reportParameterData.v_column_name2,

            "v_column_name2_value": this.reportParameterData.v_column_name2_value,

            "v_column_name3": this.reportParameterData.v_column_name3,

            "v_column_name3_value": this.reportParameterData.v_column_name3_value,

            "v_column_name4": this.reportParameterData.v_column_name4,

            "v_column_name4_value": this.reportParameterData.v_column_name4_value,
            
            "v_column_name5": this.reportParameterData.v_column_name5,

            "v_column_name5_value": this.reportParameterData.v_column_name5_value,

            "v_column_name6": this.reportParameterData.v_column_name6,

            "v_column_name6_value": this.reportParameterData.v_column_name6_value,

            "v_column_name7": this.reportParameterData.v_column_name7,

            "v_column_name7_value": this.reportParameterData.v_column_name7_value,

            "v_column_name8": this.reportParameterData.v_column_name8,

            "v_column_name8_value": this.reportParameterData.v_column_name8_value,

            "v_column_name9": this.reportParameterData.v_column_name9,

            "v_column_name9_value": this.reportParameterData.v_column_name9_value,

            "v_column_name10": this.reportParameterData.v_column_name10,

            "v_column_name10_value": this.reportParameterData.v_column_name10_value,

            "v_measurable_column1": this.reportParameterData.v_measurable_column1,

            "v_measurable_column2": this.reportParameterData.v_measurable_column2,
            
            "v_measurable_column3": this.reportParameterData.v_measurable_column3,

            "v_measurable_column4": this.reportParameterData.v_measurable_column4,

            "v_measurable_column5": this.reportParameterData.v_measurable_column5,

            "v_measurable_column6": this.reportParameterData.v_measurable_column6,

            "v_measurable_column7": this.reportParameterData.v_measurable_column7,

            "v_measurable_column8": this.reportParameterData.v_measurable_column8,

            "v_measurable_column9": this.reportParameterData.v_measurable_column9,

            "v_measurable_column10": this.reportParameterData.v_measurable_column10,

            "v_measurable_column11": this.reportParameterData.v_measurable_column11,

            "v_measurable_column12": this.reportParameterData.v_measurable_column12,

            "v_measurable_column13": this.reportParameterData.v_measurable_column13,

            "v_measurable_column14": this.reportParameterData.v_measurable_column14,

            "v_measurable_column15": this.reportParameterData.v_measurable_column15,

            "v_measurable_column16": this.reportParameterData.v_measurable_column16,

            "v_measurable_column17": this.reportParameterData.v_measurable_column17,

            "v_measurable_column18": this.reportParameterData.v_measurable_column18,

            "v_measurable_column19": this.reportParameterData.v_measurable_column19,

            "v_measurable_column20": this.reportParameterData.v_measurable_column20

            
        }
    };
    this.router.navigate(["reportParameter"], navigationExtras);
  }
    

}
