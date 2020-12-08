import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Onboarding3Component } from './onboarding3.component';

describe('Onboarding3Component', () => {
  let component: Onboarding3Component;
  let fixture: ComponentFixture<Onboarding3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Onboarding3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Onboarding3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
