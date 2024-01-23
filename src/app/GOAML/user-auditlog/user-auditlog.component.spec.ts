import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuditlogComponent } from './user-auditlog.component';

describe('UserAuditlogComponent', () => {
  let component: UserAuditlogComponent;
  let fixture: ComponentFixture<UserAuditlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuditlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuditlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
