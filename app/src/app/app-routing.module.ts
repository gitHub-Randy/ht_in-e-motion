import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmotionDescriptionComponent} from './components/emotion-description/emotion-description.component';
import {EmotionSelectionComponent} from "./components/emotion-selection/emotion-selection.component";
import { EmotionStrengthsComponent } from "./components/emotion-strengths/emotion-strengths.component";



const routes: Routes = [
  { path: "emotions",  component:EmotionSelectionComponent},
  { path: "emotions/strengths",  component:EmotionStrengthsComponent},
  { path: "emotions/description",  component:EmotionDescriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
