import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelProcessingComponent } from './excel-processing.component';

describe('ExcelProcessingComponent', () => {
  let component: ExcelProcessingComponent;
  let fixture: ComponentFixture<ExcelProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
