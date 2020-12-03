import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionStrengthsComponent } from './emotion-strengths.component';

describe('EmotionStrengthsComponent', () => {
  let component: EmotionStrengthsComponent;
  let fixture: ComponentFixture<EmotionStrengthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionStrengthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionStrengthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
