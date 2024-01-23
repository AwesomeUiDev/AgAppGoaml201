import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceldemoComponent } from './exceldemo.component';

describe('ExceldemoComponent', () => {
  let component: ExceldemoComponent;
  let fixture: ComponentFixture<ExceldemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceldemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceldemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
