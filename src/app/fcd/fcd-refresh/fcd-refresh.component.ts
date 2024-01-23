import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fcd-refresh',
  templateUrl: './fcd-refresh.component.html',
  styleUrls: ['./fcd-refresh.component.css']
})
export class FcdRefreshComponent implements OnInit {

  refresh :Observable<any>;

  constructor() { }

  ngOnInit() {
  }

}
