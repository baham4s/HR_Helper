import { Component, OnInit,Input,Output } from '@angular/core';
import {DisplayComponent} from "../display/display.component";

@Component({
  selector: 'app-information-personne',
  templateUrl: './information-personne.component.html',
  styleUrls: ['./information-personne.component.scss']
})
export class InformationPersonneComponent implements OnInit {
  // recupere les infos du composant pere et met à jour les donner
  @Input() set childMessage(valeur: any) {
  console.log(valeur["Indice"])
  this.maj(valeur)
  //this.Infos =valeur;
}


  // @ts-ignore
  Infos=this.childMessage;
  // @ts-ignore
  info=this.Infos
  ngExperiance=[];
  ngformationSupp=[];
  dateDeMiseEnLigne="";
  titre="";
  dispo="";
  ptsFort="";
  experience="";
  formation="";
  competence="";
  savoirEtre="";
  id="";
  langue="";
  permis="";
  DataGraph=[100, 100, 100];

  dataGrahp = {
    labels: ['date De Mise en ligne', 'formation', 'experience'],
    datasets: [
      {
        label: '',
        backgroundColor: 'rgba(179,181,198,0)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [65, 59, 90]
      },
      {
        label: 'My Second dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: [28, 48, 40]
      }
      ]
  }

  fermer(){
      // @ts-ignore
    document.getElementById("generale").style.visibility="hidden";
    this.callMe();
    //  // @ts-ignore
    // // document.getElementById("contour").style.backgroundColor="#
    //  document.getElementById("contour").style.backgroundColor="#87CEEB";

  }
  // fait appel d'une fonction du composant pere
  public callMe(): void {
    console.log(this.id)
    this.comp.changercouleur(this.id);
  }
// met à jour l'ensemble des donné du composant
maj(Infos: any) {
  this.id=(Infos)["_id"];

    console.log((Infos)["_id"]);
  this.dateDeMiseEnLigne = (Infos)["DateMiseEnLigne"];
  // @ts-ignore
  this.titre = (Infos)["titre"];
  // @ts-ignore
  this.dispo = (Infos)["dispo"];
  // @ts-ignore
  this.ptsFort = (Infos)["ptsForts"];
  // @ts-ignore
  this.experience = (Infos)["experience"];
  this.ngExperiance = [];
  if (this.experience["length"] == 0) {
    // @ts-ignore
    this.ngExperiance[0] = "Aucune Experience"
  } else {
    // @ts-ignore
    for (var i in this.experience) {
      // @ts-ignore
      this.ngExperiance[i] = this.experience[i]["titre"] + this.experience[i]["duree"]
    }
  }

// @ts-ignore
  this.formation = (Infos)["formation"];
  this.ngformationSupp = [];
  if (this.formation["length"] == 0) {
    // @ts-ignore
    this.ngformationSupp[0] = "Aucune Formation"
  } else {
    // @ts-ignore
    for (var i in this.formation) {
      // @ts-ignore
      this.ngformationSupp[i] = this.formation[i]["titre"] + this.formation[i]["niveau"] + this.formation[i]["duree"]
    }
  }
  // @ts-ignore
  this.competence = (Infos)["competence"];
  // @ts-ignore
  this.savoirEtre = (Infos)["savoirEtre"];
  // @ts-ignore
  this.langue = (Infos)["langues"];
  // @ts-ignore
  this.permis = (Infos)["permis"];
  // graphique
  this.dataGrahp = {
    labels: ['Experience', 'Formation', 'Langue'],
    datasets: [
      {
        label: '',
        backgroundColor: 'rgba(179,181,198,0)',
        borderColor: 'rgba(179,181,198,0)',
        pointBackgroundColor: 'rgba(179,181,198,0)',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: 'rgba(255,255,255,0)',
        pointHoverBorderColor: 'rgba(179,181,198,0)',
        data: [100, 100, 0]
      },

      {
        label: 'Competences',
        backgroundColor: 'rgba(13,191,245,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: Infos["Indice"]
      }
      //{
      // label: 'My First dataset',
      // backgroundColor: 'rgba(13,191,245,0.2)',
      // borderColor: 'rgba(179,181,198,1)',
      // pointBackgroundColor: 'rgba(179,181,198,1)',
      // pointBorderColor: '#fff',
      //pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(179,181,198,1)',
      // data: [10, 59, 80, 81, 56, 90, 40]
      //},
    ]
  }
}
  constructor(private comp: DisplayComponent) {}

  ngOnInit(): void { }

}
