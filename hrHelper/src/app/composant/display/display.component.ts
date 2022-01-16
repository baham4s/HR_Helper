import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  showMessage:string="test";
  onNotifyClicked(message:string):void{
    this.showMessage=message;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
