import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  FiltreDeGauche:string="";
  FiltreAuDessus:string="";

  onNotifyClickedFiltre(message:string):void{
    this.FiltreDeGauche=message;
  }

  onNotifyClickedBarreDeREcherche(message:string):void{
    this.FiltreAuDessus=message;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
