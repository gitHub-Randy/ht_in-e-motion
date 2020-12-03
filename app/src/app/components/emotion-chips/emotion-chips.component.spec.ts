import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionChipsComponent } from './emotion-chips.component';

describe('EmotionChipsComponent', () => {
  let component: EmotionChipsComponent;
  let fixture: ComponentFixture<EmotionChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
