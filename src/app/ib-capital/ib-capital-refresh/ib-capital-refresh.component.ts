import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-ib-capital-refresh',
  templateUrl: './ib-capital-refresh.component.html',
  styleUrls: ['./ib-capital-refresh.component.css']
})
export class IbCapitalRefreshComponent implements OnInit {

  constructor(private apiService:APIService) { }

  ngOnInit() {
  }
  public ibCapitalRefresh(data)
  {
    this.apiService.ibCapitalRefresh(data);
  }
}
