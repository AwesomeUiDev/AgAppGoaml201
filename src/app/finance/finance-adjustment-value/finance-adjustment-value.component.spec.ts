import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAdjustmentValueComponent } from './finance-adjustment-value.component';

describe('FinanceAdjustmentValueComponent', () => {
  let component: FinanceAdjustmentValueComponent;
  let fixture: ComponentFixture<FinanceAdjustmentValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceAdjustmentValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceAdjustmentValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
