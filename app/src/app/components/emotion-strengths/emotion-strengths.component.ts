import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { choosenEmotions } from 'src/app/interfaces/chosenEmotions';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionComponent } from './description/description.component';
import { HelpPopUpComponent } from './help-pop-up/help-pop-up.component';
import { trigger, keyframes, animate, transition, sequence, stagger, query } from '@angular/animations'
import * as kf from '../emotion-selection/keyframes';
import 'hammerjs';



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


  constructor(private router: Router, private description: MatDialog, private help: MatDialog) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {chosenEmotions: choosenEmotions[]};
    this.chosenEmotions = state.chosenEmotions;
    console.log(this.chosenEmotions);
   }

  ngAfterViewInit(): void {
    this.setT();
    if(localStorage.getItem("checkedStrengthDialog") == "false" || localStorage.getItem("checkedStrengthDialog") == null) {
      this.showHelp();
    }
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
      panelClass: 'describe-panel'
    });
  }

  showHelp(){
    this.help.open(HelpPopUpComponent, {
      maxWidth: '85vw',
      height: '390px',
      width: '600px',
      panelClass: 'help-panel'
    })
  }

  setbg() {
    let doc = document.getElementById('html');
    doc.style.backgroundImage = "url('../../../assets/header/headerbackgroundYellow.png')";
    doc.style.backgroundColor = "#FDF4E3"
  }
  
  setT(){
    this.childComponent.setTitle("Jouw gevoelens voor vandaag");
    let t = document.getElementById('center');
    t.style.marginTop = "10%";
  }

  prevpage(){
    this.router.navigateByUrl('emotions');
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

}
