import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfrsProcessComponent } from './ifrs-process.component';

describe('IfrsProcessComponent', () => {
  let component: IfrsProcessComponent;
  let fixture: ComponentFixture<IfrsProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfrsProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfrsProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
