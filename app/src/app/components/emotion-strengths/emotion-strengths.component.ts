import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-emotion-strengths',
  templateUrl: './emotion-strengths.component.html',
  styleUrls: ['./emotion-strengths.component.css']
})
export class EmotionStrengthsComponent implements OnInit, AfterViewInit{

  @ViewChild(HeaderComponent) childComponent: HeaderComponent;

  constructor() { }

  ngAfterViewInit(): void {
    this.setbg();
    this.setT();
  }

  ngOnInit(): void {
  }


  setbg() {
    this.childComponent.setBackground("headerbackgroundYellow.png");
  }
  
  setT(){
    this.childComponent.setTitle("Jouw gevoelens voor vandaag");
    let t = document.getElementById('center');
    t.style.marginTop = "10%";
  }


}
