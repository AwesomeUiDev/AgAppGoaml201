import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtSystemComponent } from './ext-system.component';

describe('ExtSystemComponent', () => {
  let component: ExtSystemComponent;
  let fixture: ComponentFixture<ExtSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
