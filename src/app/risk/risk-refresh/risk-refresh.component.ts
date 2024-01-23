import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-risk-refresh',
  templateUrl: './risk-refresh.component.html',
  styleUrls: ['./risk-refresh.component.css']
})
export class RiskRefreshComponent implements OnInit {

  constructor(private apiService:APIService) { }

  ngOnInit() {
  }

  public riskRefresh(date) 
  {
    return this.apiService.riskRefresh(date);
  }
}
