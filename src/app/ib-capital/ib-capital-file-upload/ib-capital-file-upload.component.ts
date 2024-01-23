import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-ib-capital-file-upload',
  templateUrl: './ib-capital-file-upload.component.html',
  styleUrls: ['./ib-capital-file-upload.component.css']
})
export class IbCapitalFileUploadComponent implements OnInit {

  constructor(private apiService:APIService) { }

  ngOnInit() {
  }

  public fileUpload(date,rName,file)
  {
    this.apiService.fileUpload(date,rName,file);
  }
}
