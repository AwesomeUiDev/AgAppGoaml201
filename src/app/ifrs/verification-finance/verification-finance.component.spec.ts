import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationFinanceComponent } from './verification-finance.component';

describe('VerificationFinanceComponent', () => {
  let component: VerificationFinanceComponent;
  let fixture: ComponentFixture<VerificationFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
