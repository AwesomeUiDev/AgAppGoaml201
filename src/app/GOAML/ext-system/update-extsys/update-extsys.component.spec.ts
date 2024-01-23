import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExtsysComponent } from './update-extsys.component';

describe('UpdateExtsysComponent', () => {
  let component: UpdateExtsysComponent;
  let fixture: ComponentFixture<UpdateExtsysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateExtsysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExtsysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
