import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commonhome',
  templateUrl: './commonhome.component.html',
  styleUrls: ['./commonhome.component.css']
})
export class CommonhomeComponent implements OnInit {
  userId:String;
  role:string;
  constructor() { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.role = localStorage.getItem('roleForUser');
  }

}
