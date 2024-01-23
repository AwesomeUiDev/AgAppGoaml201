import { Component, OnInit } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { TvAdjustmentValue } from '../finance/finance-adjustment-value/TvAdjustmentValue';
declare const $;

@Component({
  selector: 'app-exceldemo',
  templateUrl: './exceldemo.component.html',
  styleUrls: ['./exceldemo.component.css']
})

export class ExceldemoComponent implements OnInit {

  constructor() { }

  test = new TvAdjustmentValue();
  expanded = false;

  

  ngOnInit() {
    $(function(){
        $(".addButton").click(function(){
            $(this).closest("tr").clone(true).appendTo("#foo");
        });
    
        $(".deleteButton").click(function(){
            $(this).closest("tr").remove();
        });
    });

    function submitform(){
        $('#foo').find('form').submit();
        $('.clearFields').val('');
    }

    $('input[type="password"]').on('focus', () => {
        $('*').addClass('password');
      }).on('focusout', () => {
        $('*').removeClass('password');
      });

  
    // $('#testSelect1').multiselect();

    $(document).ready(function() {
      $("#slide-out").sidenav();
      $("#selectedTest").formSelect();
    });
    
  }

   values()
   {
    //    this.test.account_number = "";
    //    this.test.branch_code="";
    //    this.test.currency="";
    //    this.test.credit_amount=0;
    //    this.test.debit_amount=0;
    //    this.test.department="";
       
       console.log(this.test);
   }

   showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded = false;
    }
}

}
