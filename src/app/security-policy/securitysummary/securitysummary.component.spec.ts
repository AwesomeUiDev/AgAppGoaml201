import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritysummaryComponent } from './securitysummary.component';

describe('SecuritysummaryComponent', () => {
  let component: SecuritysummaryComponent;
  let fixture: ComponentFixture<SecuritysummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritysummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritysummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
