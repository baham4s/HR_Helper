import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-information-personne',
  templateUrl: './information-personne.component.html',
  styleUrls: ['./information-personne.component.scss']
})
export class InformationPersonneComponent implements OnInit {
  @Input() Infos: Object = '';
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
    console.log(this.Infos)
    // @ts-ignore
    this.dateDeMiseEnLigne=(this.Infos)["DateMiseEnLigne"];
    // @ts-ignore
    this.titre=(this.Infos)["titre"];
    // @ts-ignore
    this.dispo=(this.Infos)["dispo"];
    // @ts-ignore
    this.ptsFort=(this.Infos)["ptsForts"];
    // @ts-ignore
    this.experience=(this.Infos)["experience"];
    // @ts-ignore
    for(var i in this.experience){
      // @ts-ignore
      this.experienceTitre+=this.experience[i]["titre"]+this.experience[i]["duree"]
    }
    // @ts-ignore
    this.formation=(this.Infos)["formation"];
    // @ts-ignore
    for(var i in this.formation){
      // @ts-ignore
      this.formationSupp+=this.formation[i]["titre"]+this.formation[i]["niveau"]+this.formation[i]["duree"]
    }

    // @ts-ignore
    this.competence=(this.Infos)["competence"];
    // @ts-ignore
    this.savoirEtre=(this.Infos)["savoirEtre"];
    // @ts-ignore
    this.langue=(this.Infos)["langues"];
    // @ts-ignore
    this.permis=(this.Infos)["permis"];

  }

}
