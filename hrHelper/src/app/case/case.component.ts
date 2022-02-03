import {Component, Input, OnInit} from '@angular/core';

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
  @Input() personne = [];

 ouvertInfo:string="non";

  ouverture_Info() {
    if (this.ouvertInfo == "non") {
     this.ouvertureInfo=true
      this.ouvertInfo = "oui"
    } else {
      this.ouvertureInfo=false
      this.ouvertInfo = "non";
    }
  }



  constructor() { }

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
