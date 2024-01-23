import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdjustmentValueComponent } from './risk-adjustment-value.component';

describe('RiskAdjustmentValueComponent', () => {
  let component: RiskAdjustmentValueComponent;
  let fixture: ComponentFixture<RiskAdjustmentValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskAdjustmentValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskAdjustmentValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
