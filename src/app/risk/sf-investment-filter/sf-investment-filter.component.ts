import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-sf-investment-filter',
  templateUrl: './sf-investment-filter.component.html',
  styleUrls: ['./sf-investment-filter.component.css']
})
export class SfInvestmentFilterComponent implements OnInit {

  constructor(private apiService: APIService) { }

  ngOnInit() {
  }

  public sfInvestmentFilter(date) {
    return this.apiService.sfInvestmentFilter(date);
  }
}
