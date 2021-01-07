import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { choosenEmotions } from 'src/app/interfaces/chosenEmotions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DescriptionComponent } from './description/description.component';
import { HelpPopUpComponent } from './help-pop-up/help-pop-up.component';
import { trigger, keyframes, animate, transition, sequence, stagger, query } from '@angular/animations'
import * as kf from '../emotion-selection/keyframes';
import 'hammerjs';
import { HelpPopUp2Component } from './help-pop-up2/help-pop-up2.component';
import { EmotionService } from '../../services/emotion.service';



@Component({
  selector: 'app-emotion-strengths',
  templateUrl: './emotion-strengths.component.html',
  styleUrls: ['./emotion-strengths.component.css'],
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
export class EmotionStrengthsComponent implements OnInit, AfterViewInit{

  @ViewChild(HeaderComponent) childComponent: HeaderComponent;
  chosenEmotions: choosenEmotions[] = [];
  currentIndex: number = 0;
  animationState: string;
  shouldChange: boolean = false;



  constructor(private router: Router, private description: MatDialog, private help: MatDialog, private help2: MatDialog, private EmotionService: EmotionService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {chosenEmotions: choosenEmotions[]};
    this.chosenEmotions = state.chosenEmotions;
    console.log(this.chosenEmotions);
   }

  ngAfterViewInit(): void {
    this.setT();
    if(localStorage.getItem("checkedStrengthDialog2") == "false" || localStorage.getItem("checkedStrengthDialog2") == null) {
      this.showHelp3();
    }
    if(localStorage.getItem("checkedStrengthDialog") == "false" || localStorage.getItem("checkedStrengthDialog") == null) {
      this.showHelp2();
    }
    this.showLeftButton();
    this.showRightButton();
    this.showSwipeControls();
  }

  ngOnInit(): void {
    this.setbg();
    this.setT();

  }

  onLeft(){
    this.changeSwipeControlColorToWhite()
    if(this.currentIndex > 0){
      this.currentIndex-=1;
    }else{
      this.currentIndex = this.chosenEmotions.length-1;
    }
    this.changeSwipeControlColorToYellow()
    this.startAnimation("slideRight")

  }

  onRight(){
    this.changeSwipeControlColorToWhite()

    if(this.currentIndex < this.chosenEmotions.length - 1)
    {
      this.currentIndex += 1;
    }else{
      this.currentIndex = 0;
    }
    this.changeSwipeControlColorToYellow()
    this.startAnimation("slideLeft")
    
  }


  describe(){
    let dialogRef = this.description.open(DescriptionComponent, {
      maxWidth: '85vw',
      height: '390px',
      width: '600px',
      disableClose: true,
      backdropClass: 'backdropBackground4',
      panelClass: 'describe-panel',
      data: {
        emotion: this.chosenEmotions[this.currentIndex]
      },
    });

    dialogRef.afterClosed().subscribe( res => {
      console.log("Dialog description " + res.data);
      this.chosenEmotions[this.currentIndex].description = res.data;
      console.log("New Descriptions " + this.chosenEmotions[this.currentIndex].description);
    });
    
  }

  showHelp2(){
    this.help.open(HelpPopUpComponent, {
      maxWidth: '85vw',
      height: '390px',
      width: '600px',
      disableClose: true,
      backdropClass: 'backdropBackground2',
      panelClass: 'help-panel2'
    })
  }

  showHelp3(){
    this.help2.open(HelpPopUp2Component, {
      maxWidth: '85vw',
      height: '390px',
      width: '600px',
      disableClose: true,
      backdropClass: 'backdropBackground3',
      panelClass: 'help-panel3'
    })
  }

  setbg() {
    let doc = document.getElementById('html');
    doc.style.backgroundImage = "url('../../../assets/header/headerbackgroundYellow.png')";
    doc.style.backgroundColor = "#FDF4E3"
  }
  
  setT(){
    this.childComponent.setTitle("Jouw gevoelens van vandaag");
    let t = document.getElementById('center');
    t.style.marginTop = "10%";
  }

  prevpage(){
    this.router.navigate(['emotions'], { state: { chosenEmotions: this.chosenEmotions } });
  }

  next(){
    this.saveEmotions();
  }

  showLeftButton(){
    let leftBtn = document.getElementById("leftBtn");
    if (this.chosenEmotions.length <= 1){
      leftBtn.style.backgroundColor = "transparent";
      leftBtn.removeChild(leftBtn.childNodes[0]);
    } else{
      leftBtn.style.display = "block"
    }
  }

  showRightButton(){
    let rightBtn = document.getElementById("rightBtn");
    if (this.chosenEmotions.length <= 1){
      rightBtn.style.backgroundColor = "transparent";
      rightBtn.removeChild(rightBtn.childNodes[0]);
    } else{
      rightBtn.style.display = "block"
    }
  }

  showSwipeControls(){
    let swipeBtn = document.getElementById("swipeCircle");
    if (this.chosenEmotions.length <= 1){
      swipeBtn.style.display = "none";
    } else{
      swipeBtn.style.display = "block"
    }
  }

  changeSwipeControlColorToYellow() {
    let parentDiv = document.getElementById("swipeControls");
    let children = parentDiv.children as HTMLCollectionOf<HTMLElement>;
    let iconToChange = children[this.currentIndex] ;
    iconToChange.style.color = "#F8CB75";
    iconToChange.style.backgroundColor  = "#F8CB75"
  }

  changeSwipeControlColorToWhite() {
    let parentDiv = document.getElementById("swipeControls");
    let children = parentDiv.children as HTMLCollectionOf<HTMLElement>;
    let iconToChange = children[this.currentIndex];
    iconToChange.style.color = "#FFFFFF";
    iconToChange.style.backgroundColor = "#FFFFFF"
  }

  startAnimation(state) {
    console.log(state);
    if(this.chosenEmotions.length > 1){
      if (!this.animationState) {
        this.animationState = state
      }
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

  goToIndex(index) {
    let indexNew = index
    console.log(indexNew)
    if (indexNew > this.chosenEmotions.length-1) {
      indexNew = 0
    }
    if (indexNew < 0) {
      indexNew = this.chosenEmotions.length-1
    }
    console.log(indexNew)

    let currentIndex = this.currentIndex;
    if (indexNew > currentIndex ) {
      this.shouldChange = true;
      this.startAnimation("slideLeft")
    } else if(indexNew < currentIndex ) {
      this.shouldChange = true;
      this.startAnimation("slideRight")
    }

    this.changeSwipeControlColorToWhite();

    this.currentIndex = indexNew;
    
    this.changeSwipeControlColorToYellow();
  }

  getValue(event) {
    let test = document.getElementsByClassName("mat-slider")[0] as HTMLElement;
    let value = parseInt(test.getAttribute("aria-valuenow"));
    
    //console.log(test.getAttribute("aria-valuenow"));
    this.chosenEmotions[this.currentIndex].strength = value;
    //console.log(this.chosenEmotions[this.currentIndex].strength);
    let slider = document.getElementsByClassName('mat-slider-track-wrapper')[0] as HTMLElement;
    slider.style.borderRight = `${value * 230 / 100}px solid #f8ca75`;
    }

  getValueClick(event) {
    this.chosenEmotions[this.currentIndex].strength = event.value;
    console.log(this.chosenEmotions[this.currentIndex].strength);
    let slider = document.getElementsByClassName('mat-slider-track-wrapper')[0] as HTMLElement;
    slider.style.borderRight = `${parseInt(event.value) * 230 / 100}px solid #f8ca75`
  }

  saveEmotions() {  
    let tempChosenEmotionIndex;
    let tempChosenEmotionArray = [];

    this.chosenEmotions.forEach(emotion =>{
      tempChosenEmotionIndex = {
        category: emotion.emotionCategory,
        emotionName: emotion.emotionName,
        strength: emotion.strength,
        description: emotion.description,
        gifUrl: emotion.gif,
      }
      tempChosenEmotionArray.push(tempChosenEmotionIndex)
      tempChosenEmotionIndex = null
    })
    this.EmotionService.addNewEmotion(tempChosenEmotionArray).subscribe(data => {

    });
  }

}
