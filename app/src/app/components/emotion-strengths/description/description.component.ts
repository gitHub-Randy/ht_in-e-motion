import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { choosenEmotions } from 'src/app/interfaces/chosenEmotions';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  
  description: string;

  constructor( public dialogRef: MatDialogRef<DescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log(data);
      console.log(data.emotion);
      this.description = data.emotion.description;
    }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  ok(){
    this.dialogRef.close({ event: 'close', data: this.description});

  }

}
