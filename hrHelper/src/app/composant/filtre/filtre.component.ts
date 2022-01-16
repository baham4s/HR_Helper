import { Component, OnInit,EventEmitter, Output  } from '@angular/core';
@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})


export class FiltreComponent implements OnInit {
  filtre:any=[];
  content: String ="";
  //Pour envoyer des informations
  @Output() notify: EventEmitter<string>=new EventEmitter<string>();


  ajouterFiltre(element:string){
    // emetres les informations
    this.notify.emit(this.filtre);

    let present=0;
    console.log(present);

    for(let i=0; i<this.filtre.length;i++){
      if(this.filtre[i]== element){
        present++;
        console.log("ici");

      }

    }
    if(present==0){
      this.filtre+=element+"\n";


    }
  }
// remetre le filtre à 0
  resetFiltre(){
    this.filtre=[];
    this.notify.emit(this.filtre);
  }





  ville(lieu: String){
    this.content=lieu;
  }
  constructor() {

    console.log("test");

  }
  ngOnInit(): void {
    console.log("Testing ngOnInit");

  }

}

