import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPopUpComponent } from './help-pop-up.component';

describe('HelpPopUpComponent', () => {
  let component: HelpPopUpComponent;
  let fixture: ComponentFixture<HelpPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
