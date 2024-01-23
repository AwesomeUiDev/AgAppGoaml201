import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskRefreshComponent } from './risk-refresh.component';

describe('RiskRefreshComponent', () => {
  let component: RiskRefreshComponent;
  let fixture: ComponentFixture<RiskRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
