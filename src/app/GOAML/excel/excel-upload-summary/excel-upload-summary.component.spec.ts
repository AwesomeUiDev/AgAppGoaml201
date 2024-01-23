import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelUploadSummaryComponent } from './excel-upload-summary.component';

describe('ExcelUploadSummaryComponent', () => {
  let component: ExcelUploadSummaryComponent;
  let fixture: ComponentFixture<ExcelUploadSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelUploadSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelUploadSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
