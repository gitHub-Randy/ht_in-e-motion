import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewChecked } from '@angular/core';
import { choosenEmotions } from 'src/app/interfaces/chosenEmotions';
import { emotionList } from 'src/app/interfaces/emotionList';
import '../../models/emotionEnum'
import { afschuw, angst, boos, verdriet, verrassing, vreugde } from '../../models/emotionEnum';
@Component({
  selector: 'emotion-chips',
  templateUrl: './emotion-chips.component.html',
  styleUrls: ['./emotion-chips.component.css']
})
export class EmotionChipsComponent implements OnInit, OnChanges, AfterViewChecked {

  constructor() { }
  @Input() choosenCategory: string;

  @Input() chosenEmotions: choosenEmotions[];

  currentCategory = "vreugde";
  emotionList: emotionList[] = []
  selectedEmotions: string[] = [];
  other: boolean = false;

  @Output() selectOther = new EventEmitter<boolean>();

  @Output() selectedEmotion = new EventEmitter<Object>();


  ngOnInit(): void {
    this.currentCategory = this.choosenCategory;
    this.getEmotions(this.currentCategory);
  }

  sendOther(o) {
    this.selectOther.emit(o);
  }

  sendEmotionToParent(emotion) {
    this.selectedEmotion.emit(emotion);
  }

  changeSelected(emotion) {
    console.log(this.chosenEmotions)
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

  }

  ngAfterViewChecked() {
    this.preChangeState()

  }

  ngOnChanges() {
   
    this.currentCategory = this.choosenCategory;
    this.getEmotions(this.currentCategory);
  }
  getEmotions(category: String) {

    switch (category) {
      case "VREUGDE":
        this.emotionList = this.convertEnumToArray(vreugde);
        this.preChangeState();
        break;
      case "VERDRIET":
        this.emotionList = this.convertEnumToArray(verdriet);
        this.preChangeState();

        break;
      case "ANGST":
        this.emotionList = this.convertEnumToArray(angst);
        this.preChangeState();

        break;
      case "BOOS":
        this.emotionList = this.convertEnumToArray(boos);
        this.preChangeState();

        break;
      case "VERRASSING":
        this.emotionList = this.convertEnumToArray(verrassing);
        this.preChangeState();

        break;
      case "AFSCHUW":
        this.emotionList = this.convertEnumToArray(afschuw);
        this.preChangeState();

        break;
    }

  }
  preChangeState() {
    this.emotionList.forEach((emotion,index) => {
      this.chosenEmotions.forEach(chosenEmote => {
        if (emotion.name == chosenEmote.emotionName) {
          emotion.state = true;


        }
      })
    })
  }


  convertEnumToArray(enumObject: Object) {
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
