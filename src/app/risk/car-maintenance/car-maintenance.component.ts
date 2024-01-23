import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-car-maintenance',
  templateUrl: './car-maintenance.component.html',
  styleUrls: ['./car-maintenance.component.css']
})
export class CarMaintenanceComponent implements OnInit {

  constructor(private apiService:APIService) { }

  ngOnInit() {
  }

  public carMaintenance(date)
  {
    //this.apiService.createUser(date);
  }
}
