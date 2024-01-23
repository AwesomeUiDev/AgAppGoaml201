import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationProcessComponent } from './modification-process.component';

describe('ModificationProcessComponent', () => {
  let component: ModificationProcessComponent;
  let fixture: ComponentFixture<ModificationProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
