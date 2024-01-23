import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatamartRefreshMaintenanceComponent } from './datamart-refresh-maintenance.component';

describe('DatamartRefreshMaintenanceComponent', () => {
  let component: DatamartRefreshMaintenanceComponent;
  let fixture: ComponentFixture<DatamartRefreshMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatamartRefreshMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatamartRefreshMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
