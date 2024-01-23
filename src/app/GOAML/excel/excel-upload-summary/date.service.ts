import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }


  convertDate(value){
    let date = moment(value).format('YYYY-MM-DD');
     console.log("date", date);
    if(date)
    return date;
  }
}
