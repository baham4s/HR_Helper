import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})


export class FiltreComponent implements OnInit {
  filtre:any=[];
  content: String ="";

  ajouterFiltre(element:string){
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

