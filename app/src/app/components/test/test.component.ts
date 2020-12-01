import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private testService: TestService) { }


  test: Object;
  ngOnInit(): void {
    this.testService.testGet().subscribe(data => {
      this.test = data;
    })
  }

}
