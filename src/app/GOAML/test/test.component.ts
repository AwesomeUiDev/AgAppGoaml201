import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  today: number = Date.now();
  minDate = new Date(1985, 4, 12); 
  maxDate = new Date(1985, 4, 22);
  contactName:  string  =  "";
  contactAddress:  string  =  "";
  contactSource:  string  =  "direct";
  contactGender:  string  =  "male";
  isDeleted  :  boolean  =  false;
  date  =  new  FormControl(new  Date());
  date1:any;
  ///test
  pipe = new DatePipe('en-US');
  now = Date.now();
  myFormattedDate = this.pipe.transform(this.now, 'dd-MMM-yy');
   
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
   
    
  }
  public  saveCustomer(){
    /* Typically this method will be used to send the contact form to a server to save it*/
    console.log(this.date.value);
    
    console.log(this.isDeleted);
    console.log(this.contactGender);
    console.log(this.contactSource);

}
methodtestDate(){
  console.log(this.myFormattedDate);
}
}
