import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding2',
  templateUrl: './onboarding2.component.html',
  styleUrls: ['./onboarding2.component.css']
})
export class Onboarding2Component implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  skip(){
    this.router.navigateByUrl('emotions')
  }

  nextpage(){
    this.router.navigateByUrl('onboarding/3');
  }

  prevpage(){
    this.router.navigateByUrl('onboarding/1');
  }
}
