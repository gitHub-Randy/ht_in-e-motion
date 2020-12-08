import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmotionDescriptionComponent} from './components/emotion-description/emotion-description.component';
import {EmotionSelectionComponent} from "./components/emotion-selection/emotion-selection.component";
import { EmotionStrengthsComponent } from "./components/emotion-strengths/emotion-strengths.component";
import { StartComponent } from "./components/onboarding/start/start.component";
import { Onboarding1Component } from './components/onboarding/onboarding1/onboarding1.component';
import { Onboarding2Component } from './components/onboarding/onboarding2/onboarding2.component';
import { Onboarding3Component } from './components/onboarding/onboarding3/onboarding3.component';



const routes: Routes = [
  { path: "emotions",  component:EmotionSelectionComponent},
  { path: "emotions/strengths",  component:EmotionStrengthsComponent},
  { path: "emotions/description",  component:EmotionDescriptionComponent},
  { path: "onboarding",  component:StartComponent},
  { path: "onboarding/1",  component:Onboarding1Component},
  { path: "onboarding/2",  component:Onboarding2Component},
  { path: "onboarding/3",  component:Onboarding3Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
