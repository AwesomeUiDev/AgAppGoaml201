import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtsummaryComponent } from './extsummary.component';

describe('ExtsummaryComponent', () => {
  let component: ExtsummaryComponent;
  let fixture: ComponentFixture<ExtsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
