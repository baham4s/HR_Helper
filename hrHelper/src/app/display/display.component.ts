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
      // @ts-ignore
      document.getElementById('menuFiltre').style.display='none';
  // @ts-ignore
      document.getElementById('boutonFiltre').style.display='none';

      this.ouvertInfo="oui";
    }else{
      // @ts-ignore
      document.getElementById('menuInfo').style.display='none';
      // @ts-ignore
      document.getElementById('menuFiltre').style.display='block';
      // @ts-ignore
      document.getElementById('boutonFiltre').style.display='block';

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

  //https://www.w3schools.com/jsref/event_onload.asp
//https://developer.mozilla.org/fr/docs/Web/API/Document/createElement
//https://www.npmjs.com/package/ng-onload



  newDivProfil(): void{
    //Création des nouvelles div pour une personne
    var newDivPers = document.createElement("div");
    newDivPers.className = 'personne';

    var newDivHaut = document.createElement("div");
    newDivHaut.className = 'haut';
    //Contenu de la div haut
    var newButton = document.createElement("button");
    newButton.className = 'p-button-outlined p-button-info';
    newButton.type = 'button';
      // @ts-ignore
    newButton.value = this.titreProfil;
    newDivHaut.append(newButton);




    var newDivText = document.createElement("div");
    newDivText.className = 'texte';
    //Contenu de la div texte
    newDivText.innerHTML = '<p>Formations : <br>' + this.dateFormation + ' - ' + this.titreFormation + ' - ' + this.niveau + ' <br> ' + this.dispo + ' <br> ' + this.dateMAJ + ' </p>';

    //Ajout des div haut et text à la div personne
    newDivPers.append(newDivHaut, newDivText);
    console.log(newDivPers);

    //Récupération du div contenant la liste des profils
    var divList = document.getElementById("listeProfils");
      // @ts-ignore
    divList.append(newDivPers);

  }



  onNotifyClickedBarreDeREcherche(message:string):void{
    this.FiltreAuDessus=message;
  }

  public GetServeur(){
    this.dataService.sendGetRequest().subscribe(data=>{
      console.log(data);
      this.data=data;
      // @ts-ignore
      this.nbProfils = this.data["length"];
      console.log("Nb profils :", this.nbProfils);
      for (let id = 0; id < this.nbProfils; id++) {
        this.recupInfo(id);
        this.newDivProfil();
      }
    })
  }



  products = [];
  totalAngularPackages: any;
  private object: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  this.GetServeur();
  }

}
