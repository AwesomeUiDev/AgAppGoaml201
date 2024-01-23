import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



@Injectable({providedIn: 'root'})
export class DataService {
  public dataSubject = new Subject<Data>();
  public dataState = this.dataSubject.asObservable();

  constructor() { }

  recieve(data: any) {
    // data.value3 = true
    this.dataSubject.next(data);
  }
}
export class Data {
    value1: number;
    value2: number;
    value3: boolean;
    value4: number;
  }