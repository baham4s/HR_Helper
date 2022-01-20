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
  ouvertInfo:string="non";
  ouvertFIltre:string="non";

  onNotifyClickedFiltre(message:string):void{
    this.FiltreDeGauche=message;
  }

  // ouverture des filtres
  ouverture_filtre(){
    if(this.ouvertFIltre=="non"){
      // @ts-ignore
      document.getElementById('menuFiltre').style.display='block';
      this.ouvertFIltre="oui";
    }else{
      // @ts-ignore
      document.getElementById('menuFiltre').style.display='none';
      this.ouvertFIltre="non";
    }
  }

  // ouverture des informations de la personne
  ouverture_Info(){
    if(this.ouvertInfo=="non"){
      // @ts-ignore
      document.getElementById('menuInfo').style.display='block';
      this.ouvertInfo="oui";
    }else{
      // @ts-ignore
      document.getElementById('menuInfo').style.display='none';
      this.ouvertInfo="non";
    }
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
