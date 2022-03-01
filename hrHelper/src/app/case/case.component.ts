import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {
  titreProfil: Object = "";
  dateMAJ: Object = "";
  dispo: Object = "";
  titreFormation: Object = "";
  dateFormation: Object = "";
  niveau: Object = "";
  formation: Object = "";
  idPersonne: String = "";
  ouvertureInfo :  boolean  =  false
  ouvertInfo:string="non";
  message: string = "Hello!"

  // permet d'importer et d'exporter des infos du composant
  @Input() personne = [];
  @Output() messageEvent = new EventEmitter<any>();
  buttonColor: string = '#ffffff'; //Default Color

  constructor() { }
  ouverture_Info() {
    this.messageEvent.emit(this.personne);
   //  // @ts-ignore
   //  document.getElementById("contour").style.backgroundColor="#ffffff";
   //  // @ts-ignore
   // // document.getElementById("contour").style.backgroundColor="#
   //  document.getElementById("contour").style.backgroundColor="#87CEEB";

    if(this.buttonColor=='#ffffff'){
      this.buttonColor = '#87CEEB'; //desired Color
    }else {
      this.buttonColor = '#ffffff'; //desired Color
    }


  }

  // initialisation de toutes les donner dans le composant
  ngOnInit(): void {
    // @ts-ignore
    this.idPersonne=this.personne["_id"];

    // @ts-ignore
    this.titreProfil=this.personne["titre"];
    //FORMATION
    // @ts-ignore
    this.formation= this.personne["formation"];
    // @ts-ignore
    if(this.formation["length"]!=0){
      // @ts-ignore
      this.titreFormation = this.formation[0]["titre"];
      // @ts-ignore
      this.niveau = this.formation[0]["niveau"];
      // @ts-ignore
      this.dateFormation = this.formation[0]["duree"];
    }else{
      this.titreFormation ="Aucune Formation"
      this.niveau =""
      this.dateFormation = ""
    }

    //DATE MIS A JOUR
    // @ts-ignore
    this.dateMAJ = this.personne["DateMiseEnLigne"];

    //DISPONIBILITE
    // @ts-ignore
    this.dispo = this.personne["dispo"];
  }

}
