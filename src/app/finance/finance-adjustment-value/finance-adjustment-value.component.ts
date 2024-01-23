import { Component, OnInit, Input } from '@angular/core';
import { TvAdjustmentValue } from './TvAdjustmentValue';
import { APIService } from 'src/app/api.service';
import { ListDTO } from './ListDTO';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
declare const $;

@Component({
  selector: 'app-finance-adjustment-value',
  templateUrl: './finance-adjustment-value.component.html',
  styleUrls: ['./finance-adjustment-value.component.css']
})
export class FinanceAdjustmentValueComponent implements OnInit {

  constructor(private apiService:APIService,private listDTO:ListDTO) { }

  //@Input()
  listFromDb:TvAdjustmentValue[];
  deptList:string[];
  newObject = new TvAdjustmentValue();
  responseMsg:any;
  responseError:any;
  selectedDept:any;
  saveStatus:boolean;
  // @Input()
  // public test:TvAdjustmentValue;
  

 //listDTO:ListDTO;
  

  ngOnInit() {


    this.financeAdjustmentDeptList();

     $(document).ready(function(){
    //   $(".add-row").click(function(){
    //       // var account_number = $("#account_number").val();
    //       // console.log(account_number);
    //       // var branch_code = $("#branch_code").val();
    //       // var currency = $("#currency").val();
    //       // var debit_amount = $("#debit_amount").val();
    //       // var credit_amount = $("#credit_amount").val();
    //       // var department = $("#department").val();
    //       // var exec_date = $("#exec_date").val();
    //       // console.log("end");
    //       // var markup = "<tr><td><input type='checkbox' name='record'></td>"+
    //       // "<td><input type='text' [(ngModel)]='newObject.account_number' size='11' name='account_number' ngModel #account_number></td>"+
    //       // "<td><input type='text' [(ngModel)]='newObject.branch_code'  size='11' name='branch_code' ngModel #branch_code></td>"+
    //       // "<td><input type='text' [(ngModel)]='newObject.currency'  size='11' name='currency' ngModel #currency></td>"+
    //       // "<td><input type='text' [(ngModel)]='newObject.debit_amount'  size='11' name='debit_amount' ngModel #debit_amount></td>"+
    //       // "<td><input type='text' [(ngModel)]='newObject.credit_amount'  size='11' name='credit_amount' ngModel #credit_amount></td>"+
    //       // "<td><input type='text' [(ngModel)]='newObject.department'  size='11' name='department' ngModel #department></td>";
    //       // $(".TableColor tbody").append(markup);
    //   });
      
   
      // Find and remove selected table rows
      $(".delete-row").click(function(){
          $(".TableColor tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                  $(this).parents("tr").remove();
              }
          });
      });
  });    

  $("#show").click(function(){
    $("#deleteBtn").show();
});

$("#show").click(function(){
  $("#fetchTable").show();
});
  
//   $(document).ready(function () {
//     var counter = 0;

//     $("#addrow").on("click", function () {
//         var newRow = $("<tr *ngFor='let list of listFromDb'>");
//         var cols = "";

//         cols += '<td><input type="button" size="5" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
//         cols += '<td><input type="text" class="form-control" name="account_number [(ngModel)]="list.account_number" #account_number' + counter + '"/></td>';
//         cols += '<td><input type="text" class="form-control" name="branch_code" [(ngModel)]="list.branch_code" #branch_code' + counter + '"/></td>';
//         cols += '<td><input type="text" class="form-control" name="currency" [(ngModel)]="list.currency" #currency' + counter + '"/></td>';
//         cols += '<td><input type="text" class="form-control"  name="debit_amount" [(ngModel)]="list.debit_amount" #debit_amount' + counter + '"/></td>';
//         cols += '<td><input type="text" class="form-control" name="credit_amount" [(ngModel)]="list.credit_amount" #credit_amount' + counter + '"/></td>';
//         cols += '<td><input type="text" class="form-control" name="department" [(ngModel)]="list.department" #department' + counter + '"/></td>';
        
//         newRow.append(cols);
//         $("table.order-list").append(newRow);
//         counter++;
//     });



//     $("table.order-list").on("click", ".ibtnDel", function (event) {
//         $(this).closest("tr").remove();       
//         counter -= 1
//     });


// });



// function calculateRow(row) {
//     var price = +row.find('input[name^="price"]').val();

// }

// function calculateGrandTotal() {
//     var grandTotal = 0;
//     $("table.order-list").find('input[name^="price"]').each(function () {
//         grandTotal += +$(this).val();
//     });
//     $("#grandtotal").text(grandTotal.toFixed(2));
// }


  }

  financeAdjustmentDeptList()
  {
    this.apiService.financeAdjustmentDeptListService().subscribe(response=>{
      this.deptList = response;
      console.log(this.deptList);
    });
  }

  financeAdjustmentList(department)
  {
    this.selectedDept = department;
    // console.log("dept name");
    // console.log(department);
    this.apiService.financeAdjustmentListService(department).subscribe(response=>{
      this.listFromDb = response;
      console.log(this.listFromDb);
    });
  }

  financeAdjustmentSave(exec_date)
  {
    for (let i = 0; i < this.listFromDb.length; i++) {
      if(this.listFromDb[i].account_number != null)
      {
      this.listFromDb[i].exec_date = exec_date;
        this.listFromDb[i].department = this.selectedDept;
      }
    }

    if(!exec_date)
    {
      this.responseError = "Enter Date!";
    }
    else
    {
   // this.newObject.exec_date = exec_date;

    console.log(this.listFromDb);
   
    this.listDTO.arrayList = this.listFromDb;
    
  //   console.log(this.listDTO);
  //   console.log("Before Adding Object");
  //  console.log(this.newObject);
  //  this.listFromDb.push(this.newObject);
  //  console.log("after Adding Object");
  //  console.log(this.listFromDb.length);
  //  for (let i = 0; i < this.listFromDb.length; i++) {
  //   var temp :TvAdjustmentValue;
  //    temp = this.listFromDb[i];
  //    console.log(temp);
     
  //  }
   console.log(this.listFromDb);

    this.apiService.financeAdjustmentSaveService(this.listDTO).subscribe(response=>{
      this.saveStatus = response;
      console.log(this.saveStatus);
      if(this.saveStatus == true)
      {
        this.responseMsg = "Save Successful!";
        this.responseError = null;
      }
     
    },error=>{ if(this.saveStatus == false || HttpErrorResponse)
      {
        
        this.responseError = "Save Failed!";
        this.responseMsg = null;
      }
      this.saveStatus = error;
    });
    }
  }

  addObject()
  {
    
   
    this.listFromDb.push(this.newObject);
    this.newObject = new TvAdjustmentValue();
    console.log(this.listFromDb);
    this.responseMsg = null;
    this.responseError = null;
    //location.reload(); 
    //var a:any=document.getElementById("").<any>location.reload(true);
    //   $(document).ready(function() {
    //     $('.add-row').click(function () {
    //         location.reload(true); 
    //     });    // RELOAD PAGE ON BUTTON CLICK EVENT.
    // });

  }

  delete(i) {
    console.log("Delete Function");
    //console.log(i);
     //var index = this.listFromDb.indexOf(i);
     this.listFromDb.splice(i, 1);
     console.log("Size");
     console.log(this.listFromDb.length);
     console.log(this.listFromDb);
     this.responseMsg = null;
     this.responseError = null;

  }

  // addToArray()
  // {
  //   var account_number = <String>document.getElementById("account_number");
  //         console.log(account_number);
  //         this.tv.account_number = account_number;
  // }


}
