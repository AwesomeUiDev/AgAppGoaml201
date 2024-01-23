import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfInvestmentFilterComponent } from './sf-investment-filter.component';

describe('SfInvestmentFilterComponent', () => {
  let component: SfInvestmentFilterComponent;
  let fixture: ComponentFixture<SfInvestmentFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfInvestmentFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfInvestmentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
