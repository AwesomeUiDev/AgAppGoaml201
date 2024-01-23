import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportmainteinanceSummaryComponent } from './reportmainteinance-summary.component';

describe('ReportmainteinanceSummaryComponent', () => {
  let component: ReportmainteinanceSummaryComponent;
  let fixture: ComponentFixture<ReportmainteinanceSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportmainteinanceSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportmainteinanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
