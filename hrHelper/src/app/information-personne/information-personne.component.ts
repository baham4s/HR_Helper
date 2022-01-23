import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-information-personne',
  templateUrl: './information-personne.component.html',
  styleUrls: ['./information-personne.component.scss']
})
export class InformationPersonneComponent implements OnInit {
  @Input() Infos: Object = '';
  dateDeMiseEnLigne="";
  // @ts-ignore


  afficher(){
    // @ts-ignore
    console.log(this.Infos["competence"]["length"])
    // @ts-ignore

    this.dateDeMiseEnLigne=(this.Infos)["DateMiseEnLigne"];

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
