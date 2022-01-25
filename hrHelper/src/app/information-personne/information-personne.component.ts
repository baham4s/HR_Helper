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



  // @ts-ignore


  afficher(){
    // @ts-ignore
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
      console.log(this.experienceTitre+=this.experience[i]["titre"]+this.experience[i]["duree"])
    }
    // @ts-ignore
    this.formation=(this.Infos)["formation"];
    // @ts-ignore
    for(var i in this.formation){
      // @ts-ignore
      console.log(this.formationSupp+=this.formation[i]["titre"]+this.formation[i]["niveau"]+this.formation[i]["duree"])
    }

    // @ts-ignore
    this.competence=(this.Infos)["competence"];
    // @ts-ignore
    this.savoirEtre=(this.Infos)["savoirEtre"];
    // @ts-ignore
    this.langue=(this.Infos)["langues"];
    // @ts-ignore
    this.permis=(this.Infos)["permis"];
    // @ts-ignore

  }
  constructor() {
    console.log(this.Infos);
    // @ts-ignore
  }

  ngOnInit(): void {
    // @ts-ignore
    this.afficher()

    console.log(this.Infos);

  }

}
