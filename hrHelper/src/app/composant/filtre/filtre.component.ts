import { Component, OnInit,EventEmitter, Output  } from '@angular/core';
@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})


export class FiltreComponent implements OnInit {
  filtre:any=[];
  content: String ="";
  //@Output() changementMenu = new EventEmitter();
  @Output() notify: EventEmitter<string>=new EventEmitter<string>();


  ajouterFiltre(element:string){
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
    //this.changementMenu.emit("ici les infos");
  }

  resetFiltre(){
    this.filtre=[];
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

