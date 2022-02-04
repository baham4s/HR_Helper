import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-information-personne',
  templateUrl: './information-personne.component.html',
  styleUrls: ['./information-personne.component.scss']
})
export class InformationPersonneComponent implements OnInit {
 // @Input() childMessage = []


@Input() set childMessage(valeur: any) {
  console.log(valeur["dispo"])
  this.maj(valeur)
  //this.Infos =valeur;
}

  // @ts-ignore
  Infos=this.childMessage;
  // @ts-ignore
  info=this.Infos

  dateDeMiseEnLigne="";
  titre="";
  dispo="";
  ptsFort="";
  experience="";
  formation="";
  competence="";
  savoirEtre="";
  langue="";
  permis="";
  experienceTitre="";
  formationSupp="";


maj(Infos: any){
  this.dateDeMiseEnLigne=(Infos)["DateMiseEnLigne"];
  // @ts-ignore
  this.titre=(Infos)["titre"];
  // @ts-ignore
  this.dispo=(Infos)["dispo"];
  // @ts-ignore
  this.ptsFort=(Infos)["ptsForts"];
  // @ts-ignore
  this.experience=(Infos)["experience"];
  // @ts-ignore
  for(var i in this.experience){
    if(this.experience["length"]!=0) {

      // @ts-ignore
      this.experienceTitre += this.experience[i]["titre"] + this.experience[i]["duree"]
    }else{
      this.experienceTitre="Aucune Experience"
    }
  }
  // @ts-ignore
  this.formation=(Infos)["formation"];
  // @ts-ignore
  for(var i in this.formation){
    // @ts-ignore
    if(this.formation["length"]!=0) {
      // @ts-ignore
      this.formationSupp += this.formation[i]["titre"] + this.formation[i]["niveau"] + this.formation[i]["duree"]

    }else{
        this.formationSupp ="Aucune Formation"
      }
  }


  // @ts-ignore
  this.competence=(Infos)["competence"];
  // @ts-ignore
  this.savoirEtre=(Infos)["savoirEtre"];
  // @ts-ignore
  this.langue=(Infos)["langues"];
  // @ts-ignore
  this.permis=(Infos)["permis"];

}



  // graphique
  dataGrahp={
    labels: ['jan','fev','mars','avril','apr','may','jun'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(13,191,245,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [65, 59, 90, 81, 56, 55, 10]
      },
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(13,191,245,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [10, 59, 80, 81, 56, 90, 40]
      },

    ]
  }

  constructor() {

  }

  ngOnInit(): void {

    console.log(this.childMessage)
    // @ts-ignore

  }

}
