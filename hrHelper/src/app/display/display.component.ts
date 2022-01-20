import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
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

  products = [];
  totalAngularPackages: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest().subscribe(data=>{
      console.log(data);
    })
  }

}
