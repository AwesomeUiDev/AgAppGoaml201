import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskMaintenanceComponent } from './risk-maintenance.component';

describe('RiskMaintenanceComponent', () => {
  let component: RiskMaintenanceComponent;
  let fixture: ComponentFixture<RiskMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
