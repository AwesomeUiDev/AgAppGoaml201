import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfrsFetchingComponent } from './ifrs-fetching.component';

describe('IfrsFetchingComponent', () => {
  let component: IfrsFetchingComponent;
  let fixture: ComponentFixture<IfrsFetchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfrsFetchingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfrsFetchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
