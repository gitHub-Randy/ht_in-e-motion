import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
const CategoryArray = ["VREUGDE", "VERDRIET", "ANGST", "BOOS", "VERRASSING", "AFSCHUW" ]
@Component({
  selector: 'app-emotion-selection',
  templateUrl: './emotion-selection.component.html',
  styleUrls: ['./emotion-selection.component.css']
})
export class EmotionSelectionComponent implements OnInit {

  constructor() { }
  categoryWord: String;
  categoryIndex = 0

  selectedEmotion = null;
  other = false;
  selectionComplete = false

  chosenEmotions = [];

  ngOnInit(): void {
    this.categoryWord = CategoryArray[this.categoryIndex];
  }


  updateChosenData(event) {
    this.chosenEmotions = event;
    if (this.chosenEmotions.length != 0) {
      this.selectionComplete = true;

    } else {
      this.selectionComplete = false;
    }
  }

  showGifs(event) {
    if (event != null) {
      this.selectedEmotion = event.name

    } else {
      this.selectedEmotion = null;
    }
  }

  showOther(event) {
    this.other = !this.other;
  }

  onRight() {
    if (this.categoryIndex < 5) {
      this.categoryIndex++;
    } else {
      this.categoryIndex = 0;
    }
    this.categoryWord = CategoryArray[this.categoryIndex]
    this.refreshGifs();
  }


  refreshGifs() {
    
    if (this.chosenEmotions.length > 0) {
      let preSelectedEmotion = null;
      this.chosenEmotions.forEach(emotion => {
        if (this.categoryWord == emotion.emotionCategory) {
          preSelectedEmotion = {
            name: emotion.emotionName
          }
        }
      })
      this.showGifs(preSelectedEmotion)

    } 
  }

  onLeft() {
    if (this.categoryIndex > 0) {
      this.categoryIndex--;
    } else {
      this.categoryIndex = 5;
    }
    this.categoryWord = CategoryArray[this.categoryIndex]
    this.refreshGifs();

  }




  
}
