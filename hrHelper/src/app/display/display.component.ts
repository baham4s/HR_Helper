import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { BienvenueComponent } from '../bienvenue/bienvenue.component';



@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  // recuperation de la personne par le composant pere
  @Input() InfoBrute = [];

  message : any;
  Filtre:string="";
  ouvertFIltre:string="non";
  dateFormation: Object = "";
  dateMAJ: Object = "";
  data:Object= "";
  ouvertureCaseDebut :  boolean  =  false
  ouvertureChargement :  boolean  =  false
  ouvertureCase :  boolean  =  true
  ouvertureInfo :  boolean  =  false
  ouvertureFiltre:  boolean  =  true

  // Afficher oui ou non le composant information-personne
  receiveMessage($event: any) {
    this.message = $event
  if(this.ouvertureInfo==false){
    this.ouvertureInfo=true;
    this.ouvertureFiltre=false;
  }else{
    this.ouvertureInfo=false;
    this.ouvertureFiltre=true;
    }
  }

  // affiche les cases des personne ou le logo de chargement
  changementmode(){
    this.ouvertureCaseDebut=true
    if(this.ouvertureCase==true){
      this.ouvertureChargement=true
      this.ouvertureCase=false
    }else{
     this.ouvertureChargement=false
     this.ouvertureCase=true
    }
  }


// permet de notifier le filtre avec les informations
  onNotifyClickedFiltre(message:string):void{
    this.Filtre=message;
  }

  // ouverture du composant des filtres
  ouverture_filtre(){
    if(this.ouvertFIltre=="non"){
      // @ts-ignore
      document.getElementById('menuFiltre').style.display='block';
      this.ouvertFIltre="oui";
    }else{
      // @ts-ignore
      document.getElementById('menuFiltre').style.display='none';
      this.ouvertFIltre="non";
    }
  }
  // demande au composant pere d'executer ka fonction getServeur
  public GetServeur(): void {
    //this.comp.GetServeur();
    this.changementmode();

    setTimeout(() => {  this.changementmode();
      console.log("demande f5 serveur")
      this.comp.GetServeur();}, 2000);


  }

  products = [];
  totalAngularPackages: any;
  private object: any;

  constructor(private dataService: DataService,private comp: BienvenueComponent) { }

  ngOnInit(): void {}

}
