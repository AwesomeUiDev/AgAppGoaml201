import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { User } from '../user/user';
import { Router } from '@angular/router';
import { AuthorizeXmlService } from './authorize-xml.service';
import { Authorize } from './authorize';
import { XmlServiceService } from '../service/xml-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-authorize-xml',
  templateUrl: './authorize-xml.component.html',
  styleUrls: ['./authorize-xml.component.css']
})
export class AuthorizeXmlComponent implements OnInit {
  loggedInUser: string;
  constructor(private authorizeXmlService: AuthorizeXmlService, private service: XmlServiceService) { }
  userId: string;
  role: string;
  res: any;
  isVisible = true;
  button: boolean;
  generateButtonVisibleTimer: any;
  status: boolean;
  status2: boolean;
  pg1: any;
  pg2: any;
  authorizes:any;
  dataforAuth:any;
  comment: any;

  @Output() getEvent = new EventEmitter();
  ngOnInit() {
    this.pg1 = false;
    this.pg2 = false;
    // this.userId = localStorage.getItem('userId');
    // console.log("userid",this.userId)
    this.userId= localStorage.getItem('userFromLogin');
    console.log("logged::",this.userId)
    this.role = localStorage.getItem('roleForUser');

    this.getAuthorizeXml();
    this.comment = false;
    this.button = true;
    // this.isVisible=false;
  }
  getAuthorizeXml(): void {
    this.service.getAllAuthData()
      .subscribe(
        (authorizes) => {
          this.authorizes = authorizes;
          console.log("authorize result fetched !");
          console.log( this.authorizes);
       
          this.dataforAuth=this.authorizes[0];
          // console.log("data:::",this.dataforAuth)
          // this.authorizes.forEach(elementreport => {
          //   element.status2 = false;
          //   element.button = false;
          // });
          // this.getEvent.emit();
        },
        // (error) => console.log(error)
      );
  }

  getAuth(reportType,REPORT_ID,i) {
    // console.log("auth:::::,:::",i,this.authorizes[i].MAKER_ID)
    console.log("auth data",this.dataforAuth[i].MAKER_ID);
    if(this.userId === this.dataforAuth[i].MAKER_ID){
      Swal.fire(
        'maker cannot Authorize')
        
    }
    else{
      if (this.isVisible) {
      console.log(REPORT_ID);
      this.pg1 = true;
      this.service.authXMLCall(this.userId, REPORT_ID).subscribe(res => {
        this.res = res;
        console.log(this.res);
        if (this.res) {
          this.pg1 = false;
          this.getAuthorizeXml();
          Swal.fire(
            'Success',
            'XML Report ' + REPORT_ID + ' is Authorized!'

          )
        } else {
          this.pg1 = false;
          Swal.fire(
            'Failed',
            'Failed to Authorized!'

          );
        }
        this.isVisible = false;
        this.setStatusTimer();
      });
    } else {
      Swal.fire(
        'Wait',
        'Someone Processing data!',
        'success'
      );
    }
  }
}

  setStatusTimer(duration: number = 5000) {
    this.generateButtonVisibleTimer = setTimeout(() => {
      // this.inactiveStateListener.next(true);
      this.isVisible = true;
      clearTimeout(this.generateButtonVisibleTimer);
    }, duration);

    console.log('timer', this.generateButtonVisibleTimer);
  }

  async reject(REPORT_ID, i) {
    this.comment = true;

    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputPlaceholder: 'Type your message here...',
      showCancelButton: true
    });

    if (text) {
     // const makerId = this.authorizes[i].makerId;
      let makerId = 'a';
      //console.log(makerId);
      Swal.fire(text);
      console.log(text);
      this.service.getRejectcall(REPORT_ID, text, this.userId, makerId).subscribe(res => {
        this.res = res;
        console.log(res);
        if (res) {
          this.getAuthorizeXml();
          Swal.fire(
            'Report Id ' + REPORT_ID + ' is rejected'
          );
        } else {
          Swal.fire(
            'Rejection Failed !'
          );
        }
      });
    }



  }
  downloadData(reportType, reportId, i) {
    console.log('test', reportId, i);
    this.pg2 = true;
    if (this.authorizes) {
      this.authorizes[i].status2 = true;
      this.authorizes[i].button = false;
    }
    console.log(reportId);
    console.log(this.userId);
    this.service.downloadData(this.userId, reportId, reportType)
      .subscribe((res: any) => {
        this.res = res;
        if (this.res) {
          this.pg2 = false;
          if (this.authorizes) {
            this.authorizes[i].status2 = false;
            this.authorizes[i].button = true;
          }
        }
        console.log(this.res);
        this.exportAsXLSX(reportId);

      });
  }
  exportAsXLSX(reportId): void {
    this.service.exportAsExcelFile(this.res, reportId);
  }
}
