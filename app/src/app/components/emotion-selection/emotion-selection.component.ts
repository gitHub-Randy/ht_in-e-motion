import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { category } from '../../interfaces/category';
import { chipData } from '../../interfaces/chipData';
import { choosenEmotions } from 'src/app/interfaces/chosenEmotions';
import { afschuw, angst, boos, verdriet, verrassing, vreugde } from 'src/app/models/emotionEnum';
import { HeaderComponent } from '../header/header.component';
import { GifServiceService } from 'src/app/services/gif-service.service';
const POSSIBLE_CATEGROYS = ["VREUGDE", "VERDRIET", "ANGST", "BOOS", "VERRASSING", "AFSCHUW", "ANDERS"]
import { trigger, keyframes, animate, transition, sequence, stagger, query } from '@angular/animations'
import * as kf from './keyframes';
import 'hammerjs';
import { Router } from '@angular/router';
import { AndersService } from 'src/app/services/anders.service';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit } from '@angular/core';
import { HelpPopUp3Component } from './help-pop-up3/help-pop-up3.component'
import { chipState } from 'src/app/interfaces/chipStates';
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

export class EmotionSelectionComponent implements OnInit, AfterViewInit {

  constructor(private gifService: GifServiceService, private ref: ChangeDetectorRef, private router: Router, private andersService: AndersService,private help: MatDialog) {
    if (this.chosenEmotions.length != 0){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {chosenEmotions: choosenEmotions[]};
    this.chosenEmotions = state.chosenEmotions;
    console.log(this.chosenEmotions);
    }
   }

  //#region  variables
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

  andersInput: String = '';


  newAnders: chipData[] = [];

  deleteOtherDisabled: boolean = true

  //#endregion

  //#region  init methods

  ngOnInit(): void {
    this.currentCategory = {
      categoryName: POSSIBLE_CATEGROYS[0],
      possibleCategroyIndex: 0
    }
    this.getChipData();
    this.setbg();
  }


  ngAfterViewInit(): void {
    if (localStorage.getItem("checkedSelectionDialog") == "false" || localStorage.getItem("checkedSelectionDialog") == null) {
      this.showHelp();
    }
  }

  showHelp() {
    this.help.open(HelpPopUp3Component, {
      maxWidth: '85vw',
      height: '390px',
      width: '600px',
      disableClose: true,
      backdropClass: 'backdropBackground',
      panelClass: 'help-panel'
    })
  }

  // checks the current categoryName and filss the chipData with corresponding emotions
  async getChipData() {
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
      case "ANDERS":
        this.chipData = await this.fillAnders();
    }
    this.ref.detectChanges();
    this.initChips();
    console.log(this.chipData)
  }


  fillAnders(): any {
    let emotionArray = [];
    return this.andersService.getAndersChipData().toPromise().then(data => {
      data.forEach(element => {
        let temp = {
          emotionName: element.emotionName,
          chipState: chipState.NONE
        };
        emotionArray.push(temp)
      });
    }).then(data => {
      return emotionArray;
    })
  }

  // returns  an array filled with the avaiable emotions as strings
  convertEnumToArray(enumObject: Object) {
    let emotionArray = [];
    for (let eObj in enumObject) {
      if (eObj.length > 1) {
        let tempObject = {
          emotionName: eObj,
          chipState: chipState.NONE
        }
        emotionArray.push(tempObject);
      }
    }
    return emotionArray;
  }

  setbg() {
    let doc = document.getElementById('html');
    doc.style.backgroundImage = "url('../../../assets/header/headerbackground.png')";
    doc.style.backgroundColor = "rgb(103, 188, 217, .2)"
  }


  initGifs() {
    this.chosenEmotions.forEach(emotion => {
      if (this.currentChip.emotionName == emotion.emotionName) {
        let gifImageId = emotion.index;
        let test = document.getElementById(`gif-${emotion.index}`)
        this.greyOutNotSelectedGifs(test);
      }
    })
  }

  // gets called after a category change
  // hide gifs, set the states of the chips depending on chosenEmotions
  initChips() {
    this.hideGifs();
    this.chipData.forEach(data => {
      this.chosenEmotions.forEach(emotion => {
        if (emotion.emotionName == data.emotionName) {
          data.chipState = chipState.SELECTED;
          let chip = document.getElementById(data.emotionName);
          chip.style.border = "0px solid #ffffff";
          chip.style.backgroundColor = "#2B4D59";
          chip.style.color = "#ffffff";
        }
      })
    })
  }


  //#endregion init

  //#region animation

  startAnimation(state) {
    if (!this.animationState) {
      this.animationState = state
    }

  }

  resetAnimationState() {
    if (this.animationState == "slideRight" && !this.shouldChange) {
      this.onLeft();
    }
    if (this.animationState == "slideLeft" && !this.shouldChange) {
      this.onRight();
    }
    this.animationState = '';
    this.shouldChange = false;
  }

  //#endregion

  //#region  remove
  removeChosenEmotion(event: HTMLElement) {
    // get chip
    let chip = document.getElementById(event.id.substring(0, event.id.length - 2))
    console.log(this.currentChip)
    // if currentChip is chip to remove
    if (this.currentChip.emotionName == chip.id) {
      this.chosenEmotions.forEach((cEmotion, index) => {
        if (cEmotion.emotionName == chip.id) {
          this.chosenEmotions.splice(index, 1);
          this.chipData.forEach(cData => {
            if (cData.emotionName == chip.id) {
              cData.chipState = chipState.PRESELECTED
              this.changeColorOfChip(chip, cData);
              this.makeAllGifsVisible();
            }
          })
        }
      })
    } else {
      this.chosenEmotions.forEach((cEmotion, index) => {
        if (cEmotion.emotionName == chip.id) {
          this.chosenEmotions.splice(index, 1);
          this.chipData.forEach(cData => {
            if (cData.emotionName == chip.id) {
              cData.chipState = chipState.NONE
              this.changeColorOfChip(chip, cData);
            }
          })
        }
      })
    }
    if (this.currentCategory.categoryName == "ANDERS" && this.currentChip.chipState.toString() != "SELECTED") {
      this.deleteOtherDisabled = false;
    } else {
      this.deleteOtherDisabled = true
    }
  }

  //#endregion remove

  //#region Chip SELECTION 
  changeColorOfChip(chip: HTMLElement, newChipDataObject: chipData) {
    switch (newChipDataObject.chipState) {
      case chipState.NONE:
        chip.style.backgroundColor = "#FFFFFF";
        chip.style.border = "hidden";
        chip.style.color = "#000000";
        break;
      case chipState.PRESELECTED:
        chip.style.backgroundColor = "#FFFFFF";
        chip.style.border = "2px solid #67BCD9"
        chip.style.color = "#000000";
        break;
      case chipState.SELECTED:
        chip.style.backgroundColor = "#2B4D59";
        chip.style.border = "hidden";
        chip.style.color = "#FFFFFF";
        break;
    }
  }

  selectChip(chip: HTMLElement) {

    this.chipData.forEach(cData => {
      // if there is an old chip; find old chip and make state NONE if state is not SELECTED
      if (this.currentChip != null) {
        if (cData.emotionName == this.currentChip.emotionName) {
          if (this.currentChip.chipState != chipState.SELECTED) {
            cData.chipState = chipState.NONE
            this.changeColorOfChip(document.getElementById(cData.emotionName), cData)
          }
        }
      }
    })

    this.chipData.forEach(cData => {
      // find new chip and make state PRESELECTED if state is NONE; make this the currentChip
      if (cData.emotionName == chip.id) {
        this.currentChip = cData;
        if (cData.chipState == chipState.NONE) {
          cData.chipState = chipState.PRESELECTED;
          this.changeColorOfChip(document.getElementById(cData.emotionName), cData)
        }
        this.showGifs(cData.emotionName)
      }
    })
    if (this.currentCategory.categoryName == "ANDERS" && this.currentChip.chipState.toString() != "SELECTED") {
      this.deleteOtherDisabled = false;
    } else {
      this.deleteOtherDisabled = true
    }
  }

  //#endregion Chip Selection

  //#region  Gif Selection
  showGifs(emotionName: string) {
    this.shouldShowGifs = true;
    this.getGifs(emotionName);
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
  greyOutNotSelectedGifs(gifImageElement: any) {
    let gifImageId = parseInt(gifImageElement.id.charAt(4));
    for (let i = 0; i < this.gifSources.length; i++) {
      if (gifImageId != i) {
        let gifToGrayOut = document.getElementById(`gif-${i}`)
        console.log(gifToGrayOut)
        gifToGrayOut.style.filter = "opacity(20%)"
      } else {
        gifImageElement.style.filter = "opacity(100%)"
      }
    }
  }

  makeAllGifsVisible() {
    for (let i = 0; i < this.gifSources.length; i++) {
      let gifToMakeVisible = document.getElementById(`gif-${i}`)
      gifToMakeVisible.style.filter = "opacity(100%)"
    }
  }
  selectGif(gifElement: HTMLImageElement) {
    // if emotion already exist in chosen emotion
    let emotionIsNew = false;
    this.chosenEmotions.forEach(emotion => {
      if (emotion.emotionName == this.currentChip.emotionName) {
        // update emotion
        emotion.gif = gifElement.src;
        emotion.index = parseInt(gifElement.id.charAt(4));
        emotionIsNew = true;
      }
    })
    // if emotion is NEW; add to chosen emotions
    if (!emotionIsNew) {
      this.chosenEmotions.push({
        emotionName: this.currentChip.emotionName,
        emotionCategory: this.currentCategory.categoryName,
        gif: gifElement.src,
        index: parseInt(gifElement.id.charAt(4)),
        description: "",
        strength: 100

      })
    }
    this.currentChip.chipState = chipState.SELECTED
    this.changeColorOfChip(document.getElementById(this.currentChip.emotionName), { emotionName: this.currentChip.emotionName, chipState: this.currentChip.chipState })
    this.greyOutNotSelectedGifs(gifElement)
    if (this.currentCategory.categoryName == "ANDERS") {
      this.deleteOtherDisabled = true;
    }
  }

  hideGifs() {
    this.shouldShowGifs = false;
  }

  //#endregion Gif Selection

  //#region  changeCategory
  goToIndex(index) {
    let indexNew = index
    if (indexNew > POSSIBLE_CATEGROYS.length - 1) {
      indexNew = 0
    }
    if (indexNew < 0) {
      indexNew = POSSIBLE_CATEGROYS.length - 1
    }
    let currentIndex = this.currentCategory.possibleCategroyIndex;
    if (indexNew > currentIndex) {
      this.shouldChange = true;
      this.startAnimation("slideLeft")
    } else if (indexNew < currentIndex) {
      this.shouldChange = true;
      this.startAnimation("slideRight")
    }
    this.changeSwipeControlColorToWhite();
    this.currentCategory.possibleCategroyIndex = indexNew;
    this.currentCategory.categoryName = POSSIBLE_CATEGROYS[this.currentCategory.possibleCategroyIndex];
    this.changeSwipeControlColorToBlue();
    this.getChipData();

  }


  changeSwipeControlColorToBlue() {
    let parentDiv = document.getElementById("swipeControls");
    let children = parentDiv.children as HTMLCollectionOf<HTMLElement>;
    let iconToChange = children[this.currentCategory.possibleCategroyIndex];
    iconToChange.style.color = "#68BCD8";
    iconToChange.style.backgroundColor = "#68BCD8"
  }

  changeSwipeControlColorToWhite() {
    let parentDiv = document.getElementById("swipeControls");
    let children = parentDiv.children as HTMLCollectionOf<HTMLElement>;
    let iconToChange = children[this.currentCategory.possibleCategroyIndex];
    iconToChange.style.color = "#FFFFFF";
    iconToChange.style.backgroundColor = "#FFFFFF"
  }

  // makes the currentCategory.possibleCategroyIndex the next index of POSSIBLE_CATEGORYS; 
  // if possibleCategroyIndex is more then length of POSSIBLE_CATEGORYS then it sets the current index to 0 
  // sets the categoryName of currentCategory to the POSSIBLE_CATEGORYS index using the possibleCategoryIndex
  // gets the new set of chips

  onRight() {
    this.changeSwipeControlColorToWhite();
    if (this.currentCategory.possibleCategroyIndex < POSSIBLE_CATEGROYS.length - 1) {
      this.currentCategory.possibleCategroyIndex += 1;
      this.currentEmotionIndex += 1
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
      this.currentEmotionIndex = POSSIBLE_CATEGROYS.length - 1;
    }
    this.changeSwipeControlColorToBlue();
    this.currentCategory.categoryName = POSSIBLE_CATEGROYS[this.currentCategory.possibleCategroyIndex];
    this.getChipData();
  }


  //#endregion changeCategory

  //#region  ANDERS

  addToAnders(emotionName: string) {

    this.andersService.addAndersChipData([{ emotionName: emotionName }]).toPromise().then(data => {
      if (emotionName != '') {
        let temp = {
          emotionName: emotionName,
          chipState: chipState.NONE
        };
        // this.newAnders.push(temp);
        this.chipData.push(temp)

      }
      let input = document.getElementById("andersInput") as HTMLInputElement;
      input.value = ''
    })

  }

  saveAndersInDB() {
    let test = this.andersService.addAndersChipData(this.newAnders).subscribe(data => {

      this.router.navigate(['emotions/strengths'], { state: { chosenEmotions: this.chosenEmotions } });

    });
  }

  //#endregion ANDERS

  sendEmotions() {
    this.saveAndersInDB()
  }

  deleteOtherEmotion() {
    this.andersService.deleteAndersChip(this.currentChip.emotionName).toPromise().then(data => {
      this.getChipData();

    });
  }

}



