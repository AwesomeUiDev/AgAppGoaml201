import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMtsIdComponent } from './dialog-mts-id.component';

describe('DialogMtsIdComponent', () => {
  let component: DialogMtsIdComponent;
  let fixture: ComponentFixture<DialogMtsIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMtsIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMtsIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
