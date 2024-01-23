import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemconfigurationSummaryComponent } from './systemconfiguration-summary.component';

describe('SystemconfigurationSummaryComponent', () => {
  let component: SystemconfigurationSummaryComponent;
  let fixture: ComponentFixture<SystemconfigurationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemconfigurationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemconfigurationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
