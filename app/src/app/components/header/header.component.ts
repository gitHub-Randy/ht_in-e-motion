import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver) { }

  shouldShowMenu: boolean = false;
  menuState: boolean = false
  ngOnInit(): void {
  }

  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  showMenu() {
    this.shouldShowMenu = !this.shouldShowMenu;
    
  }

  close() {
    this.menuState = !this.menuState
  }

}
