import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BipCallComponent } from './bip-call.component';

describe('BipCallComponent', () => {
  let component: BipCallComponent;
  let fixture: ComponentFixture<BipCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BipCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BipCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
