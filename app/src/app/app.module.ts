import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmotionSelectionComponent } from './components/emotion-selection/emotion-selection.component';
import { EmotionStrengthsComponent } from './components/emotion-strengths/emotion-strengths.component';
import { EmotionDescriptionComponent } from './components/emotion-description/emotion-description.component';
import { HeaderComponent } from './components/header/header.component';
import { EmotionChipsComponent } from './components/emotion-chips/emotion-chips.component';
import {MatChipsModule} from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { GifGridComponent } from './components/gif-grid/gif-grid.component';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent,
    EmotionSelectionComponent,
    EmotionStrengthsComponent,
    EmotionDescriptionComponent,
    HeaderComponent,
    EmotionChipsComponent,
    GifGridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
