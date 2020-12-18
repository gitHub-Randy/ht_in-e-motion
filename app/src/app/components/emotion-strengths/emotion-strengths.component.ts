import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { choosenEmotions } from 'src/app/interfaces/chosenEmotions';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionComponent } from './description/description.component';



@Component({
  selector: 'app-emotion-strengths',
  templateUrl: './emotion-strengths.component.html',
  styleUrls: ['./emotion-strengths.component.css']
})
export class EmotionStrengthsComponent implements OnInit, AfterViewInit{

  @ViewChild(HeaderComponent) childComponent: HeaderComponent;
  chosenEmotions: choosenEmotions[] = [];
  currentIndex: number = 0;

  constructor(private router: Router, private dialog: MatDialog) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {chosenEmotions: choosenEmotions[]};
    this.chosenEmotions = state.chosenEmotions;
    console.log(this.chosenEmotions);
   }

  ngAfterViewInit(): void {
    this.setT();
    this.dialog.open(DescriptionComponent, {
      maxWidth: '85vw',
      height: '390px',
      width: '600px',
    })
  }

  ngOnInit(): void {
    this.setbg();
    this.setT();
   
  }

  onLeft(){
    if(this.currentIndex > 0){
      this.currentIndex-=1;
    }else{
      this.currentIndex = this.chosenEmotions.length-1;
    }
  }

  onRight(){
    if(this.currentIndex < this.chosenEmotions.length - 1)
    {
      this.currentIndex += 1;
    }else{
      this.currentIndex = 0;
    }
  }


  describe(){
    let dialogRef = this.dialog.open(DescriptionComponent, {
      maxWidth: '85vw',
      height: '390px',
      width: '600px',
      panelClass: 'describe-panel'
    });
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

}
