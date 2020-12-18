import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-help-pop-up',
  templateUrl: './help-pop-up.component.html',
  styleUrls: ['./help-pop-up.component.css']
})
export class HelpPopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HelpPopUpComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  ok(){
    this.dialogRef.close();

  }
}
