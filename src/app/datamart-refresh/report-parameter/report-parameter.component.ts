import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/api.service';
import { MdMultiSqlDetails } from '../datamart-refresh-maintenance/MdMultiSql';
import { MdMultiSqlOperatorDetails } from '../datamart-refresh-maintenance/MdMultiSqlOperator';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';
import { error } from 'util';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-report-parameter',
  templateUrl: './report-parameter.component.html',
  styleUrls: ['./report-parameter.component.css']
})
export class ReportParameterComponent implements OnInit {

  mdMultiSql= new MdMultiSqlOperatorDetails();
  op1 : string ="";
  op2 : string ="";
  op3 : string ="";
  op4 : string ="";
  op5 : string ="";
  op6 : string ="";
  op7 : string ="";
  op8 : string ="";
  op9 : string ="";
  op10: string ="";
  calculativeCount:number = 1;
  conditionCount:number = 1;
  response:any;
  validationResponse:any;
  status:boolean = false;
  

  constructor(private route: ActivatedRoute,private apiService:APIService,private router:Router) {
    this.route.queryParams.subscribe(params => {
      // this.roleObject. = params["firstname"];
       this.mdMultiSql.n_sort_order = params["n_sort_order"];
       this.mdMultiSql.v_report_no = params["v_report_no"];
       this.mdMultiSql.v_report_line_desc = params["v_report_line_desc"];
       this.mdMultiSql.v_column_name1 = params["v_column_name1"];
       this.mdMultiSql.v_column_name1_value = params["v_column_name1_value"];
       //this.mdMultiSql.v_column_name1_value.search("IN");
       
       this.mdMultiSql.v_column_name2 = params["v_column_name2"];
       this.mdMultiSql.v_column_name2_value = params["v_column_name2_value"];
       this.mdMultiSql.v_column_name3 = params["v_column_name3"];
       this.mdMultiSql.v_column_name3_value = params["v_column_name3_value"];
       this.mdMultiSql.v_column_name4 = params["v_column_name4"];
       this.mdMultiSql.v_column_name4_value = params["v_column_name4_value"];
       this.mdMultiSql.v_column_name4_value = params["v_column_name4_value"];
       this.mdMultiSql.v_column_name5 = params["v_column_name5"];
       this.mdMultiSql.v_column_name5_value = params["v_column_name5_value"];
       this.mdMultiSql.v_column_name6 = params["v_column_name6"];
       this.mdMultiSql.v_column_name6_value = params["v_column_name6_value"];
       this.mdMultiSql.v_column_name7 = params["v_column_name7"];
       this.mdMultiSql.v_column_name7_value = params["v_column_name7_value"];
       this.mdMultiSql.v_column_name8 = params["v_column_name8"];
       this.mdMultiSql.v_column_name8_value = params["v_column_name8_value"];
       this.mdMultiSql.v_column_name9 = params["v_column_name9"];
       this.mdMultiSql.v_column_name9_value = params["v_column_name9_value"];
       this.mdMultiSql.v_column_name10 = params["v_column_name10"];
       this.mdMultiSql.v_column_name10_value = params["v_column_name10_value"];
       this.mdMultiSql.v_measurable_column1 = params["v_measurable_column1"];
       this.mdMultiSql.v_measurable_column2 = params["v_measurable_column2"];
       this.mdMultiSql.v_measurable_column3 = params["v_measurable_column3"];
       this.mdMultiSql.v_measurable_column4 = params["v_measurable_column4"];
       this.mdMultiSql.v_measurable_column5 = params["v_measurable_column5"];
       this.mdMultiSql.v_measurable_column6 = params["v_measurable_column6"];
       this.mdMultiSql.v_measurable_column7 = params["v_measurable_column7"];
       this.mdMultiSql.v_measurable_column8 = params["v_measurable_column8"];
       this.mdMultiSql.v_measurable_column9 = params["v_measurable_column9"];
       this.mdMultiSql.v_measurable_column10 = params["v_measurable_column10"];
       this.mdMultiSql.v_measurable_column11 = params["v_measurable_column11"];
       this.mdMultiSql.v_measurable_column12 = params["v_measurable_column12"];
       this.mdMultiSql.v_measurable_column13 = params["v_measurable_column13"];
       this.mdMultiSql.v_measurable_column14 = params["v_measurable_column14"];
       this.mdMultiSql.v_measurable_column15 = params["v_measurable_column15"];
       this.mdMultiSql.v_measurable_column16 = params["v_measurable_column16"];
       this.mdMultiSql.v_measurable_column17 = params["v_measurable_column17"];
       this.mdMultiSql.v_measurable_column18 = params["v_measurable_column18"];
       this.mdMultiSql.v_measurable_column19 = params["v_measurable_column19"];
       this.mdMultiSql.v_measurable_column20 = params["v_measurable_column20"];
       console.log(this.mdMultiSql);
       //op={"",""};
      
  //condition 1  
  if(this.mdMultiSql.v_column_name1!=null && this.mdMultiSql.v_column_name1_value!=null)
  {    
       if(this.mdMultiSql.v_column_name1_value.includes("IN",0))
       {
         this.op1="IN";
         this.mdMultiSql.v_column_name1_value=this.mdMultiSql.v_column_name1_value.replace("IN","");
       }
       if(this.mdMultiSql.v_column_name1_value.includes("=",0))
       {
        this.op1="=";
        this.mdMultiSql.v_column_name1_value=this.mdMultiSql.v_column_name1_value.replace("=","");
       }
      }
      if(this.mdMultiSql.v_column_name2!=null && this.mdMultiSql.v_column_name2_value!=null)
      {    
 // condition 2     
       if(this.mdMultiSql.v_column_name2_value.includes("IN",0))
       {
         this.op2="IN";
         this.mdMultiSql.v_column_name2_value=this.mdMultiSql.v_column_name2_value.replace("IN","");
       }
       if(this.mdMultiSql.v_column_name2_value.includes("=",0))
       {
         this.op2="=";
         this.mdMultiSql.v_column_name2_value=this.mdMultiSql.v_column_name2_value.replace("=","");
       }
      }

      if(this.mdMultiSql.v_column_name3!=null && this.mdMultiSql.v_column_name3_value!=null)
      {    
 // condition 3     
       if(this.mdMultiSql.v_column_name3_value.includes("IN",0))
       {
         this.op3="IN";
         this.mdMultiSql.v_column_name3_value=this.mdMultiSql.v_column_name3_value.replace("IN","");
       }
       if(this.mdMultiSql.v_column_name3_value.includes("=",0))
       {
         this.op3="=";
         this.mdMultiSql.v_column_name3_value=this.mdMultiSql.v_column_name3_value.replace("=","");
       }
      }

      if(this.mdMultiSql.v_column_name4!=null && this.mdMultiSql.v_column_name4_value!=null)
      {    
 // condition 4     
       if(this.mdMultiSql.v_column_name4_value.includes("IN",0))
       {
         this.op4="IN";
         this.mdMultiSql.v_column_name4_value=this.mdMultiSql.v_column_name4_value.replace("IN","");
       }
       if(this.mdMultiSql.v_column_name4_value.includes("=",0))
       {
         this.op4="=";
         this.mdMultiSql.v_column_name4_value=this.mdMultiSql.v_column_name4_value.replace("=","");
       }
      }

      if(this.mdMultiSql.v_column_name5!=null && this.mdMultiSql.v_column_name5_value!=null)
      {    
 // condition 5     
       if(this.mdMultiSql.v_column_name5_value.includes("IN",0))
       {
         this.op5="IN";
         this.mdMultiSql.v_column_name5_value=this.mdMultiSql.v_column_name5_value.replace("IN","");
       }
       if(this.mdMultiSql.v_column_name5_value.includes("=",0))
       {
         this.op5="=";
         this.mdMultiSql.v_column_name5_value=this.mdMultiSql.v_column_name5_value.replace("=","");
       }
      }

      if(this.mdMultiSql.v_column_name6!=null && this.mdMultiSql.v_column_name6_value!=null)
      {    
 // condition 6     
       if(this.mdMultiSql.v_column_name6_value.includes("IN",0))
       {
         this.op6="IN";
         this.mdMultiSql.v_column_name6_value=this.mdMultiSql.v_column_name6_value.replace("IN","");
       }
       if(this.mdMultiSql.v_column_name6_value.includes("=",0))
       {
         this.op6="=";
         this.mdMultiSql.v_column_name6_value=this.mdMultiSql.v_column_name6_value.replace("=","");
       }
      }

      if(this.mdMultiSql.v_column_name7!=null && this.mdMultiSql.v_column_name7_value!=null)
      {    
 // condition 7     
       if(this.mdMultiSql.v_column_name7_value.includes("IN",0))
       {
         this.op7="IN";
         this.mdMultiSql.v_column_name7_value=this.mdMultiSql.v_column_name7_value.replace("IN","");
       }
       if(this.mdMultiSql.v_column_name7_value.includes("=",0))
       {
         this.op7="=";
         this.mdMultiSql.v_column_name7_value=this.mdMultiSql.v_column_name7_value.replace("=","");
       }
      }

      if(this.mdMultiSql.v_column_name8!=null && this.mdMultiSql.v_column_name8_value!=null)
      {    
 // condition 8     
       if(this.mdMultiSql.v_column_name8_value.includes("IN",0))
       {
         this.op8="IN";
         this.mdMultiSql.v_column_name8_value=this.mdMultiSql.v_column_name8_value.replace("IN","");
       }
       if(this.mdMultiSql.v_column_name8_value.includes("=",0))
       {
         this.op8="=";
         this.mdMultiSql.v_column_name8_value=this.mdMultiSql.v_column_name8_value.replace("=","");
       }
      }

      if(this.mdMultiSql.v_column_name9!=null && this.mdMultiSql.v_column_name9_value!=null)
      {    
 // condition 9   
         console.log("this is condition 9");
         this.conditionCount = 9;
       if(this.mdMultiSql.v_column_name9_value.includes("IN",0))
       {
         this.op9="IN";
         this.mdMultiSql.v_column_name9_value=this.mdMultiSql.v_column_name9_value.replace("IN","");
       }
       if(this.mdMultiSql.v_column_name9_value.includes("=",0))
       {
         this.op9="=";
         this.mdMultiSql.v_column_name9_value=this.mdMultiSql.v_column_name9_value.replace("=","");
       }
      }

      if(this.mdMultiSql.v_column_name10!=null && this.mdMultiSql.v_column_name10_value!=null)
      {    
 // condition 10     
       if(this.mdMultiSql.v_column_name10_value.includes("IN",0))
       {
         this.op10="IN";
         this.mdMultiSql.v_column_name10_value=this.mdMultiSql.v_column_name10_value.replace("IN","");
       }
       if(this.mdMultiSql.v_column_name10_value.includes("=",0))
       {
         this.op10="=";
         this.mdMultiSql.v_column_name10_value=this.mdMultiSql.v_column_name10_value.replace("=","");
       }
      }
  
       console.log("op");
       console.log(this.op1,this.op2,this.op3,this.op4,this.op5,this.op6,this.op7,this.op8,this.op9,this.op10,);
      
   });
  
  }

  // toggle()
  // {
    
  //   if(this.hideByShow == false)
  //   this.hideByShow = true;

  //   else
  //   this.hideByShow = false;
  //   console.log(this.hideByShow);
  // }

  incrementCondition(count)
  {
      console.log("increment");       
      this.conditionCount = count
      console.log(this.conditionCount);

  }

  decrementCondition(count)
  {
      console.log("Decrement");      
      this.conditionCount = count;
      console.log(this.conditionCount);

  }

  incrementCalculative(count)
  {
      console.log("increment");
      this.calculativeCount=count;
      console.log(this.calculativeCount);


  }

  decrementCalculative(count)
  {
    console.log("Decrement");
      this.calculativeCount=count;
      console.log(this.calculativeCount);

  
  }

  ngOnInit() {

    
//     $("#show").click(function(){
//       $("#btn").show();
//   });

//   $("#hide").click(function(){
//     $("#btn").hide();
// });

  }

  operator1(op,num)
  {
   
    if(num==1)
    {
      this.op1=op;
      console.log("op1");
    console.log(this.op1);
    }
    if(num==2)
    {
      this.op2=op;
      console.log("op2");
    console.log(this.op2);
    }
    if(num==3)
    {
      this.op3=op;
      console.log("op3");
    console.log(this.op3);
    }
    if(num==4)
    {
      this.op4=op;
      console.log("op4");
    console.log(this.op4);
    }
    if(num==5)
    {
      this.op5=op;
      console.log("op5");
    console.log(this.op5);
    }
    if(num==6)
    {
      this.op6=op;
      console.log("op6");
    console.log(this.op6);
    }
    if(num==7)
    {
      this.op7=op;
      console.log("op7");
    console.log(this.op7);
    }
    if(num==8)
    {
      this.op8=op;
      console.log("op8");
    console.log(this.op8);
    }
    if(num==9)
    {
      this.op9=op;
      console.log("op9");
    console.log(this.op9);
    }
    if(num==10)
    {
      this.op10=op;
      console.log("op10");
    console.log(this.op10);
    }
   
    //,this.op2,this.op3,this.op4,this.op5,this.op6,this.op7,this.op8,this.op9,this.op10,);
  }
  reportParameterData(mdData:MdMultiSqlDetails)
  {
    //logic to concat op 1 tp 10 to column value 1 to 10
    if(this.op1!="")
    mdData.v_column_name1_value=this.op1+mdData.v_column_name1_value;
    if(this.op2!="")
    mdData.v_column_name2_value=this.op2+mdData.v_column_name2_value;
    if(this.op3!="")
    mdData.v_column_name3_value=this.op3+mdData.v_column_name3_value;
    if(this.op4!="")
    mdData.v_column_name4_value=this.op4+mdData.v_column_name4_value;
    if(this.op5!="")
    mdData.v_column_name5_value=this.op5+mdData.v_column_name5_value;
    if(this.op6!="")
    mdData.v_column_name6_value=this.op6+mdData.v_column_name6_value;
    if(this.op7!="")
    mdData.v_column_name7_value=this.op7+mdData.v_column_name7_value;
    if(this.op8!="")
    mdData.v_column_name8_value=this.op8+mdData.v_column_name8_value;
    if(this.op9!="")
    mdData.v_column_name9_value=this.op9+mdData.v_column_name9_value;
    if(this.op10!="")
    mdData.v_column_name10_value=this.op10+mdData.v_column_name10_value;
    console.log(mdData);

    this.apiService.reportParameterDataService(mdData).subscribe(resp=>{
      console.log(resp);
      this.status = resp;
      if(resp == true)
      {
        this.response = "Update Successful!";
        this. validationResponse = null;
      }
      if(resp == false)
      {
        this.validationResponse = "Update Failed!";
        this.response = null;
      }
    },error=>{
      if(HttpErrorResponse || this.status == false)
      {
        this.validationResponse = "Update Failed!";
        this.response = null;
      }
    });
    
    this.op1="";
    this.op2="";
    this.op3="";
    this.op4="";
    this.op5="";
    this.op6="";
    this.op7="";
    this.op8="";
    this.op9="";
    this.op10="";


  }

  cancel()
  {
    this.router.navigateByUrl("datamartRefreshMaintenance");
  }
  

}
