import { Component, OnInit, ɵConsole } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenerateXml, Message } from './generate-xml';
import { FormGroup } from '@angular/forms';
import { XmlServiceService } from '../service/xml-service.service';
import { Configuration } from '../admin-screen/system-configuration/Configuration';
import { TransactionDto } from '../transaction-dto';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ResponseError } from '../response-error';
// import { ResponseError } from '../response-error';

@Component({
  selector: 'app-generate-xml',
  templateUrl: './generate-xml.component.html',
  styleUrls: ['./generate-xml.component.css']
})
export class GenerateXmlComponent implements OnInit {
  response: any;
  response1: any;
  generate: FormGroup;
  isVisible: boolean;
  generateButtonVisibleTimer: any;
  reportTypeData: any;
  msg: any;
  pg1: any;
  inactiveStateListener: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ResponseError = new ResponseError();
  // generate:GenerateXml;

  dateData: GenerateXml = new GenerateXml();
  error: boolean=false;
  errorMsg: any;
  constructor(private service: XmlServiceService) { }

  list = new Array<TransactionDto>();
  reportName1: TransactionDto;
  userId: any;
  role: any;
  reportNameForDropdown: Array<TransactionDto['reportName']>;
  ngOnInit() {
    this.tocheckTheDropdown();
    // this.userId = localStorage.getItem('userId');
    this.userId= localStorage.getItem('userFromLogin');
    console.log("logged:",this.userId)
    this.role = localStorage.getItem('roleForUser');
    this.isVisible = false;
    console.log('isVisible..', this.isVisible);
    this.pg1 = false;
    this.error=false;
    this.errorMsg='';
  }

  // inactiveStatusListener(){
  //   return this.inactiveStateListener.asObservable();
  // }

  toggleVisible() {
    this.isVisible = !this.isVisible;
  }
  // generate xml method
  generateXml() {

    console.log(this.dateData.toDate);
    console.log(this.dateData.fromDate);
    console.log(this.dateData.reportType);
    this.dateData.maker = this.userId;
    this.pg1 = true;
    this.service.generateXml(this.dateData).subscribe(msg => {
      this.response1 = msg.message;
      // console.log(this.response);
      // let msg1=this.response1;
      // console.log('Message 1 '+ msg1)
      console.log('===================');
      console.log(msg);
      this.pg1 = false;
      if (msg.message) {
        this.pg1 = false;
        Swal.fire('Status for the process is ' + msg.message);
      } else {
        Swal.fire(' Http Error Occur');
      }
      // if (msg.message === 'FAILED') {
      //   console.log("========failed===========")
      //   Swal.fire(
      //     'Failed',
      //     'Failed to Generate the Report !'

      //   )
      //   this.pg1 = false;
      // } else if (msg.message == 'NO_DATA_FOUND') {
      //   Swal.fire(
      //     'No Data Found !',
      //     'Failed to Generate the Report !'

      //   )
      //   this.pg1 = false;
      // } else {
      //   this.pg1 = false;
      //   console.log("=========success==========")
      //   Swal.fire(
      //     'Success',
      //     'XML Report Generated Successfully!'


      //   )
      // }
    },
    error => {
      this.error = true;
      this.errorMsg = error.error.error;
      console.log(error); //gives the object object
      console.log(error.error.error);
     // this.showError(error.json());
    },
    );
    // console.log(this.generate.fromDate);
    // console.log(this.generate.toDate);

    // }else{
    //   alert("wait for 1 minute");
    // }

  }
  // report type data
  reportData:any;
  tocheckTheDropdown() {
    this.service.getAllTrnDto().subscribe(resp => {

      this.reportTypeData = resp;
      // if(this.reportTypeData){
      // this.reportTypeData.forEach(element => {
      //   if(element=='MTS'){
      //     this.reportData.push('LCTR_MTS')
      //   }else{
      //     this.reportData.push(element);
      //   }
      // });
  //  }
      //this.reportTypeData
     // this.reportTypeData.push('ALCTR_MTS');
      console.log(this.reportTypeData);
      console.log(this.list);
      // var flags = [], output = [], l = array.length, i;
      // for( i=0; i<l; i++) {
      //     if( flags[array[i].age]) continue;
      //     flags[array[i].age] = true;
      //     output.push(array[i].age);
      // }
      // for (let index = 0; index < this.list.length; index++) {
      //   const element = this.list[index];
      //   this.list[index].reportName;
      // //  console.log(this.list[index].reportName);
      // // this.reportNameForDropdown.push(this.list[index].reportName);
      // }
    });
    console.log(this.reportNameForDropdown);
  }

  setStatusTimer(duration: number) {
    this.generateButtonVisibleTimer = setTimeout(() => {
      // this.inactiveStateListener.next(true);
      this.isVisible = false;
    }, duration * 1000);

    console.log('timer', this.generateButtonVisibleTimer);
  }

}
