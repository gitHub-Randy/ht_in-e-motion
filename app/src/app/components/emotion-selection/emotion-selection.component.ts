import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { category } from 'src/app/interfaces/category';
import { chipData } from 'src/app/interfaces/chipData';
import { choosenEmotions } from 'src/app/interfaces/chosenEmotions';
import { emotionList } from 'src/app/interfaces/emotionList';
import { afschuw, angst, boos, verdriet, verrassing, vreugde } from 'src/app/models/emotionEnum';
import { HeaderComponent } from '../header/header.component';
import { chipState } from '../../interfaces/chipStates'
import { GifServiceService } from 'src/app/gif-service.service';
import { element } from 'protractor';
const POSSIBLE_CATEGROYS = ["VREUGDE", "VERDRIET", "ANGST", "BOOS", "VERRASSING", "AFSCHUW"]

@Component({
  selector: 'app-emotion-selection',
  templateUrl: './emotion-selection.component.html',
  styleUrls: ['./emotion-selection.component.css']
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

  ngOnInit(): void {
    this.currentCategory = {
      categoryName: POSSIBLE_CATEGROYS[0],
      possibleCategroyIndex: 0
    }
    this.getChipData();

  }



  initGifs() {

console.log("yeet")
    this.chosenEmotions.forEach(emotion => {
      if (this.currentChip.emotionName == emotion.emotionName) {
        let gifImageId = emotion.index;
        for (let i = 0; i < this.gifSources.length; i++) {
          let gifToGrayOut = document.getElementById(`gif-${i}`)
          console.log(gifToGrayOut)
          if (i != emotion.index) {
            gifToGrayOut.style.filter = "opacity(20%)"
          } else {
            gifToGrayOut.style.filter = "opacity(100%)"
          }
        }
      }
    
    })


    // let gifImageId = parseInt(gifImageElement.id.charAt(4));
    // for (let i = 0; i < this.gifSources.length; i++) {
    //   if (gifImageId != i) {
    //     let gifToGrayOut = document.getElementById(`gif-${i}`)
    //     gifToGrayOut.style.filter = "opacity(20%)"
    //   } else {
    //     gifImageElement.style.filter = "opacity(100%)"
    //   }
    // }





    // for (let i = 0; i < this.gifSources.length; i++) {
    //   let tempGifObject = document.getElementById(`gif-${i}`);
    //   this.chosenEmotions.forEach(element => {
    //     console.log("element: ", element.gif)
    //     console.log("temp: ",tempGifObject.getAttribute("src"))

    //     if (element.gif == tempGifObject.getAttribute("src")) {
    //       this.greyOutNotSelectedGifs(tempGifObject)
    //     }
    //   })
    // }
  }


  initChips() {
    console.log(this.chosenEmotions);
    let lastEmotion = null;
    this.chipData.forEach(data => {
      this.chosenEmotions.forEach(emotion => {

        if (emotion.emotionName == data.emotionName) {
          let emotionElementToInit = document.getElementById(data.emotionName);
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
      console.log(lastEmotion)

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
    // currentChip.style.backgroundColor = "#ffffff";
    // currentChip.style.color = "#000000";
    // currentChip.style.border = "2px solid #67BCD9"
    // this.makeChipPreselected(currentChip);


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
      console.log("old")
      this.makeOldChipNotPreselected();
    }
    this.showGifs(emotionChip.id)

  }

  // makes not selected gifs gray
  // changes chosenEmotions with gif url
  //changes chip color
  selectGif(event: any) {
    if (this.checkIfSelectedGifAlreadyChosen(event)) {
      // remove emotion from choosen
      // preselect current chip
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
      console.log("finished")
      this.ref.detectChanges();
      this.initGifs();
    })
      
    
    // this.gifService.getGifs(emotionName).subscribe(data => {
    //   let gifServiceData = data.results;
    //   gifServiceData.forEach(gifData => {
    //     this.gifSources.push(gifData.media[0].nanogif.url);
    //   });

    // })

  }

  ngOnChanges(changes: SimpleChanges) {
    this.initGifs();
  }
  showGifs(emotionName: string) {
    this.shouldShowGifs = true;

    this.getGifs(emotionName);
    console.log(this.shouldShowGifs)

  }

  hideGifs() {
    this.shouldShowGifs = false;
  }

  preSelectEmotionChip() {

  }


  // makes the currentCategory.possibleCategroyIndex the next index of POSSIBLE_CATEGORYS; 
  // if possibleCategroyIndex is more then length of POSSIBLE_CATEGORYS then it sets the current index to 0 
  // sets the categoryName of currentCategory to the POSSIBLE_CATEGORYS index using the possibleCategoryIndex
  // gets the new set of chips

  onRight() {
    if (this.currentCategory.possibleCategroyIndex < POSSIBLE_CATEGROYS.length - 1) {
      this.currentCategory.possibleCategroyIndex += 1;
    } else {
      this.currentCategory.possibleCategroyIndex = 0;
    }
    this.currentCategory.categoryName = POSSIBLE_CATEGROYS[this.currentCategory.possibleCategroyIndex];
    this.getChipData();
    this.initChips();
  }

  // makes the currentCategory.possibleCategroyIndex the previeous index of POSSIBLE_CATEGORYS; 
  // if possibleCategroyIndex is smaller than 1, then it sets the current index to POSSIBLE_CATEGROYS.length -1
  // sets the categoryName of currentCategory to the POSSIBLE_CATEGORYS index using the possibleCategoryIndex
  // gets the new set of chips
  onLeft() {
    if (this.currentCategory.possibleCategroyIndex > 0) {
      this.currentCategory.possibleCategroyIndex -= 1;
    } else {
      this.currentCategory.possibleCategroyIndex = POSSIBLE_CATEGROYS.length - 1;
    }
    this.currentCategory.categoryName = POSSIBLE_CATEGROYS[this.currentCategory.possibleCategroyIndex];
    this.getChipData();
    this.initChips();



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
    console.log(this.chipData)

  }


  // returns  an array filled with the avaiable emotions as strings
  convertEnumToArray(enumObject: Object) {
    let emotionArray = [];
    for (let eObj in enumObject) {
      if (eObj.length > 1) {
        let tempObject = {
          emotionName: eObj,
          state: false
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
    // this.sendOther(this.other);
  }

  // updateChosenData(event) {
  //   this.chosenEmotions = event;
  //   if (this.chosenEmotions.length != 0) {
  //     this.selectionComplete = true;

  //   } else {
  //     this.selectionComplete = false;
  //   }
  // }

  // showGifs(event) {
  //   console.log(event)
  //   if (event != null) {
  //     this.selectedEmotion = event.name

  //   } else {
  //     this.selectedEmotion = null;
  //   }
  // }





  // refreshGifs() {

  //   if (this.chosenEmotions.length > 0) {
  //     let preSelectedEmotion = null;
  //     this.chosenEmotions.forEach(emotion => {
  //       if (this.categoryWord == emotion.emotionCategory) {
  //         preSelectedEmotion = {
  //           name: emotion.emotionName
  //         }
  //       }
  //     })
  //     this.showGifs(preSelectedEmotion)

  //   } 
  // }







}
