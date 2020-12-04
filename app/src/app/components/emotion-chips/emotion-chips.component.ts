import { Component, OnInit , Input, Output,EventEmitter} from '@angular/core';
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
  selectedEmotions: string[] = [];
  other: boolean = false;
  
  @Output() selectOther = new EventEmitter<boolean>();

  @Output() selectedEmotion = new EventEmitter<Object>();
  

  ngOnInit(): void {
    this.currentCategory = this.choosenCategory;
    this.getEmotions(this.currentCategory);
  }

  sendOther(o) {
    console.log("sending")
    this.selectOther.emit(o);
  }

  sendEmotionToParent(emotion) {
    this.selectedEmotion.emit(emotion);
  }

  changeSelected(emotion) {
    console.log("BEFORE: ",this.selectedEmotions)
    let hasRemoved = false;
    this.selectedEmotions.forEach((e, i) => {
      if (emotion == e) {
        this.selectedEmotions.splice(i, 1);
        hasRemoved = true;
      }
    });

    if (!hasRemoved) {
      this.selectedEmotions.push(emotion);
      this.sendEmotionToParent(emotion);
    }
    console.log("AFTER: ",this.selectedEmotions)

  }

  ngOnChanges() {
    this.currentCategory = this.choosenCategory;

    this.getEmotions(this.currentCategory);
  }
  getEmotions(category: String) {

    switch (category) {
      case "VREUGDE":
        this.emotionList = this.convertEnumToArray(vreugde)
        break;
      case "VERDRIET":
        this.emotionList = this.convertEnumToArray(verdriet);
        break;
      case "ANGST":
        this.emotionList =  this.convertEnumToArray(angst);
        break;
      case "BOOS":
        this.emotionList =  this.convertEnumToArray(boos);
        break;
      case "VERRASSING":
        this.emotionList =  this.convertEnumToArray(verrassing);
        break;
      case "AFSCHUW":
        this.emotionList =  this.convertEnumToArray(afschuw);
        break;
    }

  }

  convertEnumToArray(enumObject: Object) {
    console.log(enumObject)
    let enumArray = [];
    for (let index in enumObject) {
      if (index.length > 1) {
        let tempObject = {
          name: index,
          state: false
        }
        enumArray.push(tempObject);

      }
    }
    return enumArray;
  }

  otherEmotion() {
    this.other = !this.other;
    this.sendOther(this.other);
  }

}
