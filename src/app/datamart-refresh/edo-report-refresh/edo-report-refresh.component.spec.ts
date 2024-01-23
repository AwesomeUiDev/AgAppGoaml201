import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdoReportRefreshComponent } from './edo-report-refresh.component';

describe('EdoReportRefreshComponent', () => {
  let component: EdoReportRefreshComponent;
  let fixture: ComponentFixture<EdoReportRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdoReportRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdoReportRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
