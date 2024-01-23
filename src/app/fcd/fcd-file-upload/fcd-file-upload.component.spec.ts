import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcdFileUploadComponent } from './fcd-file-upload.component';

describe('FcdFileUploadComponent', () => {
  let component: FcdFileUploadComponent;
  let fixture: ComponentFixture<FcdFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcdFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcdFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
