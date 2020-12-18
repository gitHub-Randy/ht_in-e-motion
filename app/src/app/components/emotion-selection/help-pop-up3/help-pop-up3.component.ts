import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HelpPopUpComponent } from '../../emotion-strengths/help-pop-up/help-pop-up.component';

@Component({
  selector: 'app-help-pop-up3',
  templateUrl: './help-pop-up3.component.html',
  styleUrls: ['./help-pop-up3.component.css']
})
export class HelpPopUp3Component implements OnInit {

  checked: Boolean = false;

  constructor(public dialogRef: MatDialogRef<HelpPopUpComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  ok(){
    this.dialogRef.close();
    let check = "" + this.checked; 
    localStorage.setItem('checkedSelectionDialog', check);
  }

  onCheck(){
    this.checked =!this.checked;
    console.log(this.checked);
   
  }
}
