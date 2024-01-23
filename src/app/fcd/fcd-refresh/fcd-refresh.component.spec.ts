import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcdRefreshComponent } from './fcd-refresh.component';

describe('FcdRefreshComponent', () => {
  let component: FcdRefreshComponent;
  let fixture: ComponentFixture<FcdRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcdRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcdRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
