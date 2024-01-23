import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskManualValuesInputComponent } from './risk-manual-values-input.component';

describe('RiskManualValuesInputComponent', () => {
  let component: RiskManualValuesInputComponent;
  let fixture: ComponentFixture<RiskManualValuesInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskManualValuesInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskManualValuesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
