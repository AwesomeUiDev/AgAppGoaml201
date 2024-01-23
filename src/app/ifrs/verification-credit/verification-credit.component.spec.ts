import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationCreditComponent } from './verification-credit.component';

describe('VerificationCreditComponent', () => {
  let component: VerificationCreditComponent;
  let fixture: ComponentFixture<VerificationCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
