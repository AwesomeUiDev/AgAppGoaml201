import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExcelMappingComponent } from './update-excel-mapping.component';

describe('UpdateExcelMappingComponent', () => {
  let component: UpdateExcelMappingComponent;
  let fixture: ComponentFixture<UpdateExcelMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateExcelMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExcelMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
