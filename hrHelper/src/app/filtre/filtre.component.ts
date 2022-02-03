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

  motCle='';
  checked: boolean=false;
  selectedLangue: any=[];
  langue: any[]=[];
  dispoImmedia="";
  dispoPlusTard="";
  selectedEtude: any=[];
  etude: any[]=[];
  filtreServeur: any;
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
    console.log("filtre venant de la BDD")
    this.getFiltre()
    console.log(this.filtreServeur)
    console.log("fin venant de la BDD")




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
    this.callMe();
  }


  envoyerDonnées(){
    console.log(this.Filtre);
    this.notify.emit(this.Filtre);
  }

  constructor(private dataService: DataService,private comp: DisplayComponent) {
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

  public callMe(): void {
    this.comp.GetServeur();
  }

  ngOnInit(): void {
    this.dataService.getFiltre().subscribe(data=>{
      console.log(data);
      this.filtreServeur=data;

    })
  }
  getFiltre(){
    this.dataService.getFiltre().subscribe(data=>{
      console.log("les filtres")
      console.log(data);
      this.filtreServeur=data;

    })
  }


  sendData(){
   // console.log(this.registerobj);
    this.dataService.registerUser(this.registerobj)  }
}
