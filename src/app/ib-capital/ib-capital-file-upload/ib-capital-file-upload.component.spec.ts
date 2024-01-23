import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbCapitalFileUploadComponent } from './ib-capital-file-upload.component';

describe('IbCapitalFileUploadComponent', () => {
  let component: IbCapitalFileUploadComponent;
  let fixture: ComponentFixture<IbCapitalFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbCapitalFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbCapitalFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
