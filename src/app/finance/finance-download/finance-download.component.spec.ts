import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceDownloadComponent } from './finance-download.component';

describe('FinanceDownloadComponent', () => {
  let component: FinanceDownloadComponent;
  let fixture: ComponentFixture<FinanceDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
