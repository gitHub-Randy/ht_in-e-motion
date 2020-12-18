import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-help-pop-up2',
  templateUrl: './help-pop-up2.component.html',
  styleUrls: ['./help-pop-up2.component.css']
})
export class HelpPopUp2Component implements OnInit {

  checked: Boolean = false;

  constructor(public dialogRef: MatDialogRef<HelpPopUp2Component>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  ok(){
    this.dialogRef.close();
    let check = "" + this.checked; 
    localStorage.setItem('checkedStrengthDialog2', check);
  }

  onCheck(){
    this.checked =!this.checked;
    console.log(this.checked);
   
  }
}
