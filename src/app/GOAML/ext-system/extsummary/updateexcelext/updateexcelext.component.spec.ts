import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateexcelextComponent } from './updateexcelext.component';

describe('UpdateexcelextComponent', () => {
  let component: UpdateexcelextComponent;
  let fixture: ComponentFixture<UpdateexcelextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateexcelextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateexcelextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
