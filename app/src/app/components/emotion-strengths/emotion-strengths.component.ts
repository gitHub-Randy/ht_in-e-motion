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
    this.setT();
  }

  ngOnInit(): void {
    this.setbg();

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
