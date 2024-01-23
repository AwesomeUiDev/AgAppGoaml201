import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceUploadComponent } from './finance-upload.component';

describe('FinanceUploadComponent', () => {
  let component: FinanceUploadComponent;
  let fixture: ComponentFixture<FinanceUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
