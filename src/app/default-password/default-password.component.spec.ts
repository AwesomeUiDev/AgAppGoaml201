import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPasswordComponent } from './default-password.component';

describe('DefaultPasswordComponent', () => {
  let component: DefaultPasswordComponent;
  let fixture: ComponentFixture<DefaultPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
