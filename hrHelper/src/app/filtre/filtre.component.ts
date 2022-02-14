import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import {DataService} from "../data.service";
import { DisplayComponent } from '../display/display.component';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})

export class FiltreComponent implements OnInit {
  Filtre:any=[];
  _id='';
  motCle='';
  checked: boolean=false;
  selectedLangue: any=[];
  langue: any[]=[];
  BdispoImmedia=false
  BdispoPlusTard=false
  dispoImmedia="";
  dispoPlusTard="";
  selectedEtude: any=[];
  etude: any[]=[];
  filtreServeur: any;

  // envoyer les filtre dans le composant pere (display)
  @Output() notify: EventEmitter<string>=new EventEmitter<string>();


  // structure du filtre sur le serveur
  public registerobj={
    _id: "61fc0d5ef81a6df1aa9472c2",
    Permis: false,
    dispoImmedia: false,
    dispoPlusTard: false,
    selectedLangue: "",
    selectedEtude:"",
    motCle:""
  };

  // ajoute les mot cle
  ajouterFiltre(element:string){
    this.motCle=this.motCle+element;
    this.envoyerDonnées();
  }

  // valide les filtres get le vieux et le remplace par le nouveau
  valider_filtre(){
    this.getFiltre()
    console.log(this.dispoImmedia)
    console.log(this.BdispoImmedia)
    console.log(this.dispoPlusTard)
    if(this.dispoImmedia=='disponible'){
      this.BdispoImmedia=true;
    }else{
      this.BdispoImmedia=false;
    }
    if(this.dispoPlusTard=='plusTard'){
      this.BdispoPlusTard=true;
    }else{
      this.BdispoPlusTard=false;
    }
    console.log(this.dispoImmedia)
    console.log(this.BdispoImmedia)
    this.registerobj={
      _id: this._id,
      Permis: this.checked,
      dispoImmedia: this.BdispoImmedia,
      dispoPlusTard:this.BdispoPlusTard,
      selectedLangue:JSON.stringify(this.selectedLangue),
      selectedEtude: JSON.stringify(this.selectedEtude),
      motCle:this.motCle.toString()
    };
    this.motCle="";
    this.updateFiltre();
    this.callMe();
  }
  // envopyer les donner dans le serveur via le service
  envoyerDonnées(){
    this.notify.emit(this.Filtre);
  }

  constructor(private dataService: DataService,private comp: DisplayComponent) {
    // filtre des langues
    this.langue = [
      {name: 'Allemand', code: 'ALL'},
      {name: 'Anglais', code: 'AN'},
      {name: 'Espagnol', code: 'ES'},
      {name: 'Français', code: 'FR'},
      {name: 'Autres', code: 'AU'}
    ];

    // filtres des etudes
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

  // fait appel d'une fonction du composant pere
  public callMe(): void {
    this.comp.GetServeur();
  }

  ngOnInit(): void {
    // recupere le filtre
    this.dataService.getFiltre().subscribe(data=>{
    this.filtreServeur=JSON.stringify(data);
      // @ts-ignore
      this._id = data[0]["_id"]
    })
  }


  // recupere l'ensemble des filtres de la BDD
  getFiltre(){
    this.dataService.getFiltre().subscribe(data=>{
      this.filtreServeur=JSON.stringify(data)
      // @ts-ignore
      this._id = data[0]["_id"]
    })
  }

  // met à jour les filtre sur le serveur
  updateFiltre(){
    this.dataService.updateFiltre(this.registerobj);
  }

  // cree un filtre sur le serveur
  sendData(){
    this.dataService.registerUser(this.registerobj)  }
}
