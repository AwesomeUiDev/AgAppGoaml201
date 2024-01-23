import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtSysListComponent } from './ext-sys-list.component';

describe('ExtSysListComponent', () => {
  let component: ExtSysListComponent;
  let fixture: ComponentFixture<ExtSysListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtSysListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtSysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
