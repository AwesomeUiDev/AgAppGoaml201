import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeXmlComponent } from './authorize-xml.component';

describe('AuthorizeXmlComponent', () => {
  let component: AuthorizeXmlComponent;
  let fixture: ComponentFixture<AuthorizeXmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeXmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
