import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPopUp3Component } from './help-pop-up3.component';

describe('HelpPopUp3Component', () => {
  let component: HelpPopUp3Component;
  let fixture: ComponentFixture<HelpPopUp3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpPopUp3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPopUp3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
