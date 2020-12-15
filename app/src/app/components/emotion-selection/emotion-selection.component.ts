import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { category } from '../../interfaces/category';
import { chipData } from '../../interfaces/chipData';
import { choosenEmotions } from 'src/app/interfaces/chosenEmotions';
import { afschuw, angst, boos, verdriet, verrassing, vreugde } from 'src/app/models/emotionEnum';
import { HeaderComponent } from '../header/header.component';
import { GifServiceService } from 'src/app/gif-service.service';
const POSSIBLE_CATEGROYS = ["VREUGDE", "VERDRIET", "ANGST", "BOOS", "VERRASSING", "AFSCHUW"]
import { trigger, keyframes, animate, transition, sequence, stagger, query } from '@angular/animations'
import * as kf from './keyframes';
import 'hammerjs';

@Component({
  selector: 'app-emotion-selection',
  templateUrl: './emotion-selection.component.html',
  styleUrls: ['./emotion-selection.component.css'],
  animations: [
    trigger('emotionTrigger', [
      transition('* => slideRight', [
        query(':self', [
          stagger(1000, [
            animate(100, keyframes(kf.slideOutRight)),
            animate(100, keyframes(kf.slideInLeft)),
          ])
        ], { optional: false })
      ] ,

      ),
      transition('* => slideLeft', [
        query(':self', [
          stagger(1000, [
            animate(100, keyframes(kf.slideOutLeft)),
            animate(100, keyframes(kf.slideInRight)),
        
          ])
        ], { optional: false })
      ] ,

      ),
    ]),



  
  ]
})

export class EmotionSelectionComponent implements OnInit, OnChanges {

  constructor(private gifService: GifServiceService, private ref: ChangeDetectorRef) { }
  currentCategory: category;
  chipData: chipData[] = [];
  chosenEmotions: choosenEmotions[] = [];
  shouldShowGifs: boolean = false;
  gifSources = [];
  other = false;
  selectionComplete = false
  currentChip: chipData;
  currentEmotion: String;
  currentEmotionIndex: number;

  animationState: string;

  shouldChange: boolean = false;

  ngOnInit(): void {
    this.currentCategory = {
      categoryName: POSSIBLE_CATEGROYS[0],
      possibleCategroyIndex: 0
    }
    this.getChipData();

  }


  startAnimation(state) {
    console.log(state);
    if (!this.animationState) {
      this.animationState = state
    }

  }



  resetAnimationState() {
    console.log(this.animationState)
    if (this.animationState == "slideRight" && !this.shouldChange) {
      this.onLeft();
    } 
    if (this.animationState == "slideLeft" && !this.shouldChange) {
      
      this.onRight();
    }
    console.log("reset")
    this.animationState = '';
    this.shouldChange = false;
  }

  initGifs() {
    this.chosenEmotions.forEach(emotion => {
      if (this.currentEmotion == emotion.emotionName) {
        let gifImageId = emotion.index;
        let test = document.getElementById(`gif-${emotion.index}`)
        this.greyOutNotSelectedGifs(test);
      }
    })
  }

  initChips() {

    let lastEmotion = null;
    this.chipData.forEach(data => {
      this.chosenEmotions.forEach(emotion => {

        if (emotion.emotionName == data.emotionName) {
          this.currentChip = {
            emotionName: data.emotionName,
            chipState: true
          }

          this.makeChipSelected();
          lastEmotion = data.emotionName;

        }
      })
    })
    if (lastEmotion != null) {

      this.showGifs(lastEmotion);
    } else {
      this.hideGifs();

    }

  }

  removeChosenEmotion(event: any) {
    this.chosenEmotions.forEach((emotion, index) => {
      if (emotion.emotionName == event.target.id) {
        this.chosenEmotions.splice(index, 1);
      }
    })

    for (let i = 0; i < this.gifSources.length; i++) {
      let gifToRestoreOpaccity = document.getElementById(`gif-${i}`);
      gifToRestoreOpaccity.style.filter = "opacity(100%)";
    }

    let currentChip = document.getElementById(event.target.id);
    this.selectedEmotion(currentChip);


    if (this.chosenEmotions.length == 0) {
      this.selectionComplete = false;
    }

  }

  checkIfSelectedEmotionIsNew(chip: any) {
    let chosenEmotionContainsSelectedEmotion = false;
    this.chosenEmotions.forEach(chosen => {

      if (chosen.emotionName == chip.id) {
        chosenEmotionContainsSelectedEmotion = true;
      }
    })
    return chosenEmotionContainsSelectedEmotion;
  }

  makeChipPreselected(chip: any) {
    chip.style.backgroundColor = "#ffffff";
    chip.style.color = "#000000";
    chip.style.border = "2px solid #67BCD9"
    this.chipData.forEach(data => {
      if (data.emotionName == chip.id) {
        data.chipState = false

        this.makeOldChipNotPreselected();
        this.currentChip = data;
      }
    })
  }

  makeOldChipNotPreselected() {
    if (this.currentChip != null && this.currentChipBelongsToCurrentChipSet()) {
      let oldChip = document.getElementById(this.currentChip.emotionName);
      oldChip.style.border = "hidden"
    }
  }

  currentChipBelongsToCurrentChipSet() {
    let currentChipIsInCurrentChipSet = false;
    this.chipData.forEach(data => {
      if (data.emotionName == this.currentChip.emotionName) {
        currentChipIsInCurrentChipSet = true;
      }
    });
    return currentChipIsInCurrentChipSet;
  }

  selectedEmotion(chip: any) {

    let emotionChip: HTMLElement = chip;
    if (!this.checkIfSelectedEmotionIsNew(emotionChip)) {
      this.makeChipPreselected(emotionChip)
    } else {
      this.makeOldChipNotPreselected();
    }


    this.currentEmotion = emotionChip.id
    this.showGifs(emotionChip.id)



  }

  // makes not selected gifs gray
  // changes chosenEmotions with gif url
  //changes chip color
  selectGif(event: any) {

    if (this.checkIfSelectedGifAlreadyChosen(event)) {
      let newGifforOldEmotion = document.getElementById(event.id);
      this.chosenEmotions.forEach(emotion => {
        if (emotion.gif == newGifforOldEmotion.getAttribute("src")) {
          emotion.gif = newGifforOldEmotion.getAttribute("src");
          this.greyOutNotSelectedGifs(newGifforOldEmotion);
          this.makeChipSelected();

        }
      })

    } else {
      this.greyOutNotSelectedGifs(event)
      this.addToChosenGifs(event)
      this.makeChipSelected();
    }

  }


  checkIfSelectedGifAlreadyChosen(selectedGif: HTMLImageElement) {
    let gifAlreadyExists = false;
    this.chosenEmotions.forEach(emotion => {

      if (emotion.gif == selectedGif.src) {
        gifAlreadyExists = true;
      }
    })

    return gifAlreadyExists;
  }


  addToChosenGifs(gifImageElement: HTMLImageElement) {
    let gifURL = gifImageElement.src;
    let updatedChosenEmotion = false;
    this.chosenEmotions.forEach(emotion => {
      if (this.currentChip.emotionName == emotion.emotionName) {
        emotion.gif = gifURL
        emotion.index = parseInt(gifImageElement.id.charAt(4));
        updatedChosenEmotion = true;
      }
    })
    if (!updatedChosenEmotion) {
      this.chosenEmotions.push({
        emotionCategory: this.currentCategory.categoryName,
        emotionName: this.currentChip.emotionName,
        gif: gifURL,
        index: parseInt(gifImageElement.id.charAt(4))
      })
    }

    this.selectionComplete = true;


  }


  makeChipSelected() {

    let chip = document.getElementById(this.currentChip.emotionName);
    chip.style.border = "0px solid #ffffff";
    chip.style.backgroundColor = "#2B4D59";
    chip.style.color = "#ffffff";
    this.chipData.forEach(data => {
      if (data.emotionName == chip.id) {
        data.chipState = true
      }
    })

  }


  greyOutNotSelectedGifs(gifImageElement: any) {
    let gifImageId = parseInt(gifImageElement.id.charAt(4));
    for (let i = 0; i < this.gifSources.length; i++) {
      if (gifImageId != i) {
        let gifToGrayOut = document.getElementById(`gif-${i}`)
        gifToGrayOut.style.filter = "opacity(20%)"
      } else {
        gifImageElement.style.filter = "opacity(100%)"
      }
    }

  }

  getGifs(emotionName: string) {
    this.gifSources = [];
    this.gifService.getGifs(emotionName).toPromise().then(data => {
      let gifServiceData = data.results;
      gifServiceData.forEach(gifData => {
        this.gifSources.push(gifData.media[0].nanogif.url);
      });
    }).then(() => {
      this.ref.detectChanges();
      this.initGifs();
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.initGifs();
  }
  showGifs(emotionName: string) {
    this.shouldShowGifs = true;

    this.getGifs(emotionName);

  }

  hideGifs() {
    this.shouldShowGifs = false;
  }


  goToIndex(index) {
    let indexNew = index
    console.log(indexNew)
    if (indexNew > POSSIBLE_CATEGROYS.length-1) {
      indexNew = 0
    }
    if (indexNew < 0) {
      indexNew = POSSIBLE_CATEGROYS.length-1
    }
    console.log(indexNew)

    let currentIndex = this.currentCategory.possibleCategroyIndex;
    if (indexNew > currentIndex ) {
      this.shouldChange = true;
      this.startAnimation("slideLeft")
    } else if(indexNew < currentIndex ) {
      this.shouldChange = true;
      this.startAnimation("slideRight")
    }
   

    this.changeSwipeControlColorToWhite();

    this.currentCategory.possibleCategroyIndex = indexNew;
    this.currentCategory.categoryName = POSSIBLE_CATEGROYS[this.currentCategory.possibleCategroyIndex];
    this.changeSwipeControlColorToBlue();
    this.getChipData();

  }


  // makes the currentCategory.possibleCategroyIndex the next index of POSSIBLE_CATEGORYS; 
  // if possibleCategroyIndex is more then length of POSSIBLE_CATEGORYS then it sets the current index to 0 
  // sets the categoryName of currentCategory to the POSSIBLE_CATEGORYS index using the possibleCategoryIndex
  // gets the new set of chips

  onRight() {
    this.changeSwipeControlColorToWhite();

    if (this.currentCategory.possibleCategroyIndex < POSSIBLE_CATEGROYS.length - 1) {
      this.currentCategory.possibleCategroyIndex += 1;
      this.currentEmotionIndex +=1
    } else {
      this.currentCategory.possibleCategroyIndex = 0;
      this.currentEmotionIndex = 0

    }
    this.changeSwipeControlColorToBlue();

    this.currentCategory.categoryName = POSSIBLE_CATEGROYS[this.currentCategory.possibleCategroyIndex];
    this.getChipData();
  }

  // makes the currentCategory.possibleCategroyIndex the previeous index of POSSIBLE_CATEGORYS; 
  // if possibleCategroyIndex is smaller than 1, then it sets the current index to POSSIBLE_CATEGROYS.length -1
  // sets the categoryName of currentCategory to the POSSIBLE_CATEGORYS index using the possibleCategoryIndex
  // gets the new set of chips
  onLeft() {
    this.changeSwipeControlColorToWhite();

 
    if (this.currentCategory.possibleCategroyIndex > 0) {
      this.currentCategory.possibleCategroyIndex -= 1;  

    } else {
      this.currentCategory.possibleCategroyIndex = POSSIBLE_CATEGROYS.length - 1;
      this.currentEmotionIndex =  POSSIBLE_CATEGROYS.length - 1;

    }
    
    this.changeSwipeControlColorToBlue();
    this.currentCategory.categoryName = POSSIBLE_CATEGROYS[this.currentCategory.possibleCategroyIndex];
    this.getChipData();
  }


  changeSwipeControlColorToBlue() {
    let test = document.getElementById("swipeControls").childNodes;
    let iconToChange = test[this.currentCategory.possibleCategroyIndex];
   iconToChange.style.color = "#68BCD8";
  }

  changeSwipeControlColorToWhite() {
    let test = document.getElementById("swipeControls").childNodes;
    let iconToChange = test[this.currentCategory.possibleCategroyIndex];
    iconToChange.style.color = "#FFFFFF";

  }


  // checks the current categoryName and filss the chipData with corresponding emotions
  getChipData() {
    this.chipData = [];
    switch (this.currentCategory.categoryName) {
      case "VREUGDE":
        this.chipData = this.convertEnumToArray(vreugde);
        break;
      case "VERDRIET":
        this.chipData = this.convertEnumToArray(verdriet);
        break;
      case "ANGST":
        this.chipData = this.convertEnumToArray(angst);
        break;
      case "BOOS":
        this.chipData = this.convertEnumToArray(boos);
        break;
      case "VERRASSING":
        this.chipData = this.convertEnumToArray(verrassing);
        break;
      case "AFSCHUW":
        this.chipData = this.convertEnumToArray(afschuw);
        break;
    }
    this.ref.detectChanges();
    this.initChips();
  }


  // returns  an array filled with the avaiable emotions as strings
  convertEnumToArray(enumObject: Object) {
    let emotionArray = [];
    for (let eObj in enumObject) {
      if (eObj.length > 1) {
        let tempObject = {
          emotionName: eObj,
          chipState: false
        }
        emotionArray.push(tempObject);
      }
    }
    return emotionArray;
  }
  showOther(event) {
    this.other = !this.other;
  }


  otherEmotion() {
    this.other = !this.other;
  }


}
