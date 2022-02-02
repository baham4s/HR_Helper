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

  @Input() personne = [];


  ouvertInfo:string="non";

  ouverture_Info() {
    if (this.ouvertInfo == "non") {
      // @ts-ignore
      document.getElementById('menuInfo').style.display = 'block';
      // @ts-ignore


      this.ouvertInfo = "oui";
    } else {
      // @ts-ignore
      document.getElementById('menuInfo').style.display = 'none';
      // @ts-ignore
      this.ouvertInfo = "non";
    }
  }



  constructor() { }

  ngOnInit(): void {
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
