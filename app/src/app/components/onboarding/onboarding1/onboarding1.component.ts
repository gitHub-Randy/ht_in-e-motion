import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding1',
  templateUrl: './onboarding1.component.html',
  styleUrls: ['./onboarding1.component.css']
})
export class Onboarding1Component implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  nextpage(){
    this.router.navigateByUrl('onboarding/2');
  }

  prevpage(){
    this.router.navigateByUrl('onboarding');
  }
}
