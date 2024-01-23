import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcdSubsidaryFileUploadComponent } from './fcd-subsidary-file-upload.component';

describe('FcdSubsidaryFileUploadComponent', () => {
  let component: FcdSubsidaryFileUploadComponent;
  let fixture: ComponentFixture<FcdSubsidaryFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcdSubsidaryFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcdSubsidaryFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
