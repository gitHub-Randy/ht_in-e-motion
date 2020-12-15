import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { choosenEmotions } from 'src/app/interfaces/chosenEmotions';



@Component({
  selector: 'app-emotion-strengths',
  templateUrl: './emotion-strengths.component.html',
  styleUrls: ['./emotion-strengths.component.css']
})
export class EmotionStrengthsComponent implements OnInit, AfterViewInit{

  @ViewChild(HeaderComponent) childComponent: HeaderComponent;
  chosenEmotions: choosenEmotions[] = [];
  currentIndex: number = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {chosenEmotions: choosenEmotions[]};
    this.chosenEmotions = state.chosenEmotions;
    console.log(this.chosenEmotions);
   }

  ngAfterViewInit(): void {
    this.setT();
  }

  ngOnInit(): void {
    this.setbg();
    this.setT();
  }

  onLeft(){
    if(this.currentIndex < 0){
      this.currentIndex = this.chosenEmotions.length +1;
    }else{
      this.currentIndex -= 1;

    }
  }



  onRight(){
    if(this.currentIndex > this.chosenEmotions.length){
      this.currentIndex = 0;
    }else{
      this.currentIndex += 1;

    }
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


}
