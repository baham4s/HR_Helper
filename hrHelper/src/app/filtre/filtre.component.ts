import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})




export class FiltreComponent implements OnInit {


  Filtre:any=[];

  motCle='';
  checked: boolean=false;
  selectedLangue: any=[];
  langue: any[]=[];
  dispoImmedia="";
  dispoPlusTard="";
  selectedEtude: any=[];
  etude: any[]=[];
  langues=''
  i=0;

  @Output() notify: EventEmitter<string>=new EventEmitter<string>();

  public registerobj={
    Permis: false,
    dispoImmedia: "",
    dispoPlusTard: "",
    selectedLangue: "",
    selectedEtude:"",
    motCle:""
  };

  ajouterFiltre(element:string){
    this.motCle=this.motCle+element;
    this.envoyerDonnées();


  }

  valider_filtre(){

    this.registerobj={
      Permis: this.checked,
      dispoImmedia: this.dispoImmedia.toString(),
      dispoPlusTard:this.dispoPlusTard.toString(),
      selectedLangue:JSON.stringify(this.selectedLangue),
      selectedEtude: JSON.stringify(this.selectedEtude),
      motCle:this.motCle.toString()
    };
    this.motCle="";
    console.log(this.Filtre)
    this.sendData();
  }


  envoyerDonnées(){
    console.log(this.Filtre);
    this.notify.emit(this.Filtre);
  }

  constructor(private dataService: DataService) {
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
  sendData(){
    console.log(this.registerobj);
    this.dataService.registerUser(this.registerobj)  }
}
