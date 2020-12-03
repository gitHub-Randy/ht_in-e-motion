import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionSelectionComponent } from './emotion-selection.component';

describe('EmotionSelectionComponent', () => {
  let component: EmotionSelectionComponent;
  let fixture: ComponentFixture<EmotionSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
