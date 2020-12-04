import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GifServiceService } from 'src/app/gif-service.service';

@Component({
  selector: 'gif-grid',
  templateUrl: './gif-grid.component.html',
  styleUrls: ['./gif-grid.component.css']
})
export class GifGridComponent implements OnInit,OnChanges {

  constructor(private gifService: GifServiceService) { }

  @Input() emotionName: String;
  gifServiceData;
  gifSRC = "";
  ngOnInit(): void {
    console.log(this.emotionName)
   
  }


  ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
    this.gifService.getGifs(this.emotionName).subscribe(data => {
      this.gifServiceData = data;
      console.log(this.gifServiceData.results[0].media[0].mediumgif.url);
      this.gifSRC = this.gifServiceData.results[0].media[0].mediumgif.url
        })
}



}
