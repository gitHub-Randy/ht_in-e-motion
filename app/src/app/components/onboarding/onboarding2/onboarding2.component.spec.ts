import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Onboarding2Component } from './onboarding2.component';

describe('Onboarding2Component', () => {
  let component: Onboarding2Component;
  let fixture: ComponentFixture<Onboarding2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Onboarding2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Onboarding2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
