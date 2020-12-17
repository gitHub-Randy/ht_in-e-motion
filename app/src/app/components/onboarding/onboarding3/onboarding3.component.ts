import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding3',
  templateUrl: './onboarding3.component.html',
  styleUrls: ['./onboarding3.component.css']
})
export class Onboarding3Component implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  skip(){
    this.router.navigateByUrl('emotions')
  }

  nextpage(){
    this.router.navigateByUrl('onboarding/4');
  }

  prevpage(){
    this.router.navigateByUrl('onboarding/2');
  }
}
