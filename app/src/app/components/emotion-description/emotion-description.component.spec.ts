import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionDescriptionComponent } from './emotion-description.component';

describe('EmotionDescriptionComponent', () => {
  let component: EmotionDescriptionComponent;
  let fixture: ComponentFixture<EmotionDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
