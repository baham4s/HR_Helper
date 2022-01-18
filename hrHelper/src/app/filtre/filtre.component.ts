import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})
export class FiltreComponent implements OnInit {
  filtre:any=["mangue","abricot"];
  content: String ="";
  ville='';

  //Pour envoyer des informations
  @Output() notify: EventEmitter<string>=new EventEmitter<string>();


  ajouterFiltre(element:string){
    // emetres les informations
    this.notify.emit(this.filtre);
    let present=0;
    console.log(present);
    console.log(this.ville);

    for(let i=0; i<this.filtre.length;i++){
      // if(this.filtre[i]== element){
      //  present++;
      // console.log("ici");

      // }
      console.log(this.filtre[i]);

    }
    if(present==0){
      this.filtre.push("element");


    }
  }
// remetre le filtre à 0
  resetFiltre(){
    this.filtre=[];
    this.notify.emit(this.filtre);
  }





  villeBouton(lieu: String){
    this.content=lieu;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
