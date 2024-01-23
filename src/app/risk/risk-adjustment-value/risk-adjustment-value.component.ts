import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-risk-adjustment-value',
  templateUrl: './risk-adjustment-value.component.html',
  styleUrls: ['./risk-adjustment-value.component.css']
})
export class RiskAdjustmentValueComponent implements OnInit {

  constructor(private apiService:APIService) { }

  ngOnInit() {
  }

  public riskAdjustmentValues(department,date) {
    return this.apiService.riskAdjustmentValues(department,date);
  }
}
