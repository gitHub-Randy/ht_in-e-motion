import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPopUp2Component } from './help-pop-up2.component';

describe('HelpPopUp2Component', () => {
  let component: HelpPopUp2Component;
  let fixture: ComponentFixture<HelpPopUp2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpPopUp2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPopUp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
