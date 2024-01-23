import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Roles1Component } from './roles1.component';

describe('RolesComponent', () => {
  let component: Roles1Component;
  let fixture: ComponentFixture<Roles1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Roles1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Roles1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
