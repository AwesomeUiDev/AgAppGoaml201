import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelExternalSysComponent } from './excel-external-sys.component';

describe('ExcelExternalSysComponent', () => {
  let component: ExcelExternalSysComponent;
  let fixture: ComponentFixture<ExcelExternalSysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelExternalSysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelExternalSysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
