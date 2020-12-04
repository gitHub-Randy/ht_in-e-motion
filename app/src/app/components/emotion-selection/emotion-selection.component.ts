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
  ngOnInit(): void {
    this.categoryWord = CategoryArray[this.categoryIndex];
    console.log(this.categoryWord)

  }


  onRight() {
    if (this.categoryIndex < 5) {
      this.categoryIndex++;
    } else {
      this.categoryIndex = 0;
    }
    this.categoryWord = CategoryArray[this.categoryIndex]
  }


  onLeft() {
    if (this.categoryIndex > 0) {
      this.categoryIndex--;
    } else {
      this.categoryIndex = 5;
    }
    this.categoryWord = CategoryArray[this.categoryIndex]
  }

  
}
