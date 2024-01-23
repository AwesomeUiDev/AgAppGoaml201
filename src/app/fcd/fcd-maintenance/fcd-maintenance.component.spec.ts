import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcdMaintenanceComponent } from './fcd-maintenance.component';

describe('FcdMaintenanceComponent', () => {
  let component: FcdMaintenanceComponent;
  let fixture: ComponentFixture<FcdMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcdMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcdMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
