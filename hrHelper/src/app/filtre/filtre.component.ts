import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})


export class FiltreComponent implements OnInit {

  Filtre:any=[];
  MotCle='';
  checked: boolean=false;
  selectedLangue: any=[];
  langue: any[]=[];
  dispoImmedia="";
  dispoPlusTard="";
  selectedEtude: any=[];
  etude: any[]=[];


  @Output() notify: EventEmitter<string>=new EventEmitter<string>();


  ajouterFiltre(element:string){
    this.Filtre.push(element);
    this.envoyerDonnées();


  }

  valider_filtre(){
    console.log("dispoImmedia = "+this.dispoImmedia);
    console.log("dispoPlusTard = "+this.dispoPlusTard);
    console.log(this.etude);
    console.log(this.langue);
    console.log("permis = "+this.checked);
    console.log("filtre total = "+this.Filtre);
  // ICI LES INFOS SONT PRET A ETRE ENVOYER DANS LE COMPOSANS DISPLAY POUR FILTRER
  }


  envoyerDonnées(){
    console.log(this.Filtre);
    this.notify.emit(this.Filtre);
  }

  constructor() {
    this.langue = [
      {name: 'Français', code: 'FR'},
      {name: 'Espagnol', code: 'ES'},
      {name: 'Allemand', code: 'ALL'},
      {name: 'Anglais', code: 'AN'},
      {name: 'Autres', code: 'AU'}
    ];

    this.etude = [
      {name: 'bac +1'},
      {name: 'bac +2'},
      {name: 'bac +3'},
      {name: 'bac +4'},
      {name: 'bac +5'},
      {name: 'bac +6'},
      {name: 'Autres'},
    ];
  }

  ngOnInit(): void {}

}
