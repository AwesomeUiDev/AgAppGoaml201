import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelMappingComponent } from './excel-mapping.component';

describe('ExcelMappingComponent', () => {
  let component: ExcelMappingComponent;
  let fixture: ComponentFixture<ExcelMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
