import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrDescComponent } from './str-desc.component';

describe('StrDescComponent', () => {
  let component: StrDescComponent;
  let fixture: ComponentFixture<StrDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
