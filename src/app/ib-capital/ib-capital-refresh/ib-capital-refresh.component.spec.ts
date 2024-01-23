import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbCapitalRefreshComponent } from './ib-capital-refresh.component';

describe('IbCapitalRefreshComponent', () => {
  let component: IbCapitalRefreshComponent;
  let fixture: ComponentFixture<IbCapitalRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbCapitalRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbCapitalRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
