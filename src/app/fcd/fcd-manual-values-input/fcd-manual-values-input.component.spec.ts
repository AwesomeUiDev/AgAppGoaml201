import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcdManualValuesInputComponent } from './fcd-manual-values-input.component';

describe('FcdManualValuesInputComponent', () => {
  let component: FcdManualValuesInputComponent;
  let fixture: ComponentFixture<FcdManualValuesInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcdManualValuesInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcdManualValuesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
