import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { BienvenueComponent } from '../bienvenue/bienvenue.component';



@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  message : any;



  @Input() InfoBrute = [];
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

  changementmode(){
    this.ouvertureCaseDebut=true

    if(this.ouvertureCase==true){
      this.ouvertureChargement  =  true
     this. ouvertureCase   =  false
    }else {
     this. ouvertureChargement =  false
     this. ouvertureCase =  true
    }
  }



  onNotifyClickedFiltre(message:string):void{
    this.Filtre=message;
  }

  // ouverture des filtres
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




  public GetServeur(): void {
    this.comp.GetServeur();

    this.changementmode();
    setTimeout(() => {  this.changementmode(); }, 2000);
  }



  products = [];
  totalAngularPackages: any;
  private object: any;

  constructor(private dataService: DataService,private comp: BienvenueComponent) { }

  ngOnInit(): void {
  }

}
