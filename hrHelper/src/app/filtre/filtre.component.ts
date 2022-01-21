import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})


export class FiltreComponent implements OnInit {

  Filtre:any=["mangue","abricot"];
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
    console.log("filtre total = "+this.Filtre);
    console.log("checked = "+this.checked);
    console.log("langue = "+this.langue);
    console.log("etude = "+this.etude);
    console.log("dispoImmedia = "+this.dispoImmedia);
    console.log("dispoPlusTard = "+this.dispoPlusTard);

  }

  envoyerDonnées(){
    console.log(this.Filtre);
    this.notify.emit(this.Filtre);
  }

  constructor() {
    this.langue = [
      {name: 'Français', code: 'FR'},
      {name: 'Espagnole', code: 'ES'},
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

  ngOnInit(): void {
    console.log("Testing ngOnInit");
    console.log(this.Filtre);

  }

}
