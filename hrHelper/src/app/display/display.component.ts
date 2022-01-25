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
  titreFormation: Object = "";
  dateFormation: Object = "";
  niveau: Object = "";

  titreProfil: Object = "";
  dateMAJ: Object = "";
  dispo: Object = "";

  data:Object= "";
  nbProfils: number=0;

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

  recupInfo(idPers: number):void{
    //RECUPERATION INFO PERSONNE GENERAL
      // @ts-ignore
    this.infoPersonne=this.data[0];

    //TITRE PROFIL
      // @ts-ignore
    this.titreProfil = this.data[idPers]["titre"];

    //FORMATION
      // @ts-ignore
    this.formation= this.data[idPers]["formation"];
    console.log(this.formation);
    for(var i in this.formation){
        // @ts-ignore
      this.titreFormation = this.formation[i]["titre"];
        // @ts-ignore
      this.niveau = this.formation[i]["niveau"];
        // @ts-ignore
      this.dateFormation = this.formation[i]["duree"];
    }
   
    //DATE MIS A JOUR
      // @ts-ignore
    this.dateMAJ = this.data[idPers]["DateMiseEnLigne"];

    //DISPONIBILITE
      // @ts-ignore
    this.dispo = this.data[idPers]["dispo"];
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
      this.data=data;
      // @ts-ignore
      this.nbProfils = this.data["length"];
      console.log("Nb profils :", this.nbProfils);
      for (let id = 0; id < this.nbProfils; id++) {
        this.recupInfo(id);
      }
    })
  }

}
