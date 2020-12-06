import {  AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { element } from 'protractor';
import { GifServiceService } from 'src/app/gif-service.service';

@Component({
  selector: 'gif-grid',
  templateUrl: './gif-grid.component.html',
  styleUrls: ['./gif-grid.component.css']
})
export class GifGridComponent implements OnInit, OnChanges,AfterViewChecked {

  constructor(private gifService: GifServiceService) { }

  @Input() emotionName: String;
  @Input() emotionCategory: String;
  gifServiceData;
  gifSources = [];
  chosenEmotion = [];

  @Output() chosenEmotionsChanged = new EventEmitter<any[]>();

  ngOnInit(): void {
  }

 

  selectedGif(e) {

    // get element from document using saved id and make a new temp object to potently save
    let newGif = document.getElementById(e.target.id);
    let newEmotionObject = {
      emotionCategory: this.emotionCategory,
      emotionName: this.emotionName,
      gif: newGif.src,
      elementId: newGif.id
    }

    // check if new emotionGif is meant to replace other chosen gif for this emotion and replace if true
    let replacedGif = false;
    this.chosenEmotion.forEach((emotion,index) => {
      if (emotion.emotionName == newEmotionObject.emotionName) {
        let oldgif = document.getElementById(emotion.elementId);
        if (emotion.gif === newEmotionObject.gif) {
          oldgif.style.border = "2px solid rgb(255, 255, 255)";
          this.chosenEmotion.splice(index, 1);
          replacedGif = true;

        } else {
          oldgif.style.border = "2px solid rgb(255, 255, 255)";
          newGif.style.border = "2px solid #2B4D59";
          emotion.gif = newGif.src;
          emotion.elementId = newGif.id;
          replacedGif = true;
        }
     
      }
    })
    // if no replace save tempobject and make border blue
    if (!replacedGif) {
      this.chosenEmotion.push(newEmotionObject);
      newGif.style.border = "2px solid #2B4D59";

    }
    console.log(this.chosenEmotion)
    this.chosenEmotionsChanged.emit(this.chosenEmotion);
  }


  // every time when the user switches the main-emotion the sub emotions needs to realod
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.emotionName);
    this.gifSources = [];
    this.gifService.getGifs(this.emotionName).subscribe(data => {
      this.gifServiceData = data.results;
      this.gifServiceData.forEach(gifData => {
        this.gifSources.push(gifData.media[0].nanogif.url);
      });

    })

  }

  // when all data is loaded make all gif borders blue when a gif is already choosen
  ngAfterViewChecked() {
    this.makeBordersOnInit();

  }

// check if current sub emotion already is saved. if yes get corresponding element and make border blue
  makeBordersOnInit() {
    this.chosenEmotion.forEach(emotion => {
      if (this.emotionName == emotion.emotionName) {

        let gifToStyle = document.getElementById(`${emotion.elementId}`);
        if (gifToStyle != null) {
          gifToStyle.style.border = "2px solid #2B4D59";

        }

      }
    })
  }

 

}
