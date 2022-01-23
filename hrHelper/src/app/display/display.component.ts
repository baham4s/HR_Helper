import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  Filtre:string="";
  FiltreAuDessus:string="";
  ouvertInfo:string="non";
  ouvertFIltre:string="non";

  infoPersonne: Object = "";
  formation: Object = "";
  titre: Object = "";
  duree: Object = "";
  niveau: Object = "";
  data:Object="" ;

  onNotifyClickedFiltre(message:string):void{
    this.Filtre=message;
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
    console.log(this.data);
  }

  recupInfo():void{
   //Récupération des informations d'une personne
      // @ts-ignore
    this.infoPersonne=this.data[0];
      // @ts-ignore
   this.formation= this.data[0]["formation"];
   console.log(this.formation);
   for(var i in this.formation){
      // @ts-ignore
     this.titre = this.formation[i]["titre"];
      // @ts-ignore
     this.niveau = this.formation[i]["niveau"];
      // @ts-ignore
     this.duree = this.formation[i]["duree"];
    }
   
  }



  onNotifyClickedBarreDeREcherche(message:string):void{
    this.FiltreAuDessus=message;
  }

  products = [];
  totalAngularPackages: any;
  private object: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest().subscribe(data=>{
      console.log(data);
      //console.log(JSON.stringify(data))
      //this.data=JSON.stringify(data);
      this.data=data;
      this.recupInfo();
    })
  }

}
