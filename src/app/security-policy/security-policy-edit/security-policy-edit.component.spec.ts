import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityPolicyEditComponent } from './security-policy-edit.component';

describe('SecurityPolicyEditComponent', () => {
  let component: SecurityPolicyEditComponent;
  let fixture: ComponentFixture<SecurityPolicyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityPolicyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityPolicyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
