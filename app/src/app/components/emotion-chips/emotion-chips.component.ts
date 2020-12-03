import { Component, OnInit , Input} from '@angular/core';
import '../../models/emotionEnum'
import { afschuw, angst, boos, verdriet, verrassing, vreugde } from '../../models/emotionEnum';
@Component({
  selector: 'emotion-chips',
  templateUrl: './emotion-chips.component.html',
  styleUrls: ['./emotion-chips.component.css']
})
export class EmotionChipsComponent implements OnInit {

  constructor() { }
  @Input() choosenCategory: string;
  currentCategory= "vreugde";
  emotionList: string[] = []

  ngOnInit(): void {
    this.currentCategory = this.choosenCategory;
    this.getEmotions(this.currentCategory);
    console.log(this.emotionList)
  }

  ngOnChanges() {
    this.currentCategory = this.choosenCategory;

    this.getEmotions(this.currentCategory);
  }
  getEmotions(category: String) {

    console.log(category)
    switch (category) {
      case "Vreugde":
        this.emotionList = this.convertEnumToArray(vreugde)
        break;
      case "Verdriet":
        this.emotionList = this.convertEnumToArray(verdriet);
        break;
      case "Angst":
        this.emotionList =  this.convertEnumToArray(angst);
        break;
      case "Boos":
        this.emotionList =  this.convertEnumToArray(boos);
        break;
      case "Verrassing":
        this.emotionList =  this.convertEnumToArray(verrassing);
        break;
      case "Afschuw":
        this.emotionList =  this.convertEnumToArray(afschuw);
        break;
    }





  }


  convertEnumToArray(enumObject: Object) {
    console.log(enumObject)
    let enumArray = [];
    for (let index in enumObject) {
      if (index.length > 1) {
        enumArray.push(index);

      }
    }
    return enumArray;
  }

}
