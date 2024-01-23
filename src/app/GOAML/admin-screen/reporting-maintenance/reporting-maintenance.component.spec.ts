import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingMaintenanceComponent } from './reporting-maintenance.component';

describe('ReportingMaintenanceComponent', () => {
  let component: ReportingMaintenanceComponent;
  let fixture: ComponentFixture<ReportingMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
