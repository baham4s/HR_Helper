import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-barre-de-recherche',
  templateUrl: './barre-de-recherche.component.html',
  styleUrls: ['./barre-de-recherche.component.css']
})
export class BarreDeRechercheComponent implements OnInit {
  prenom='';
  nom='';
  filtre:any=[];

  //Pour envoyer des informations
  @Output() notify: EventEmitter<string>=new EventEmitter<string>();
  rechercher(){
    console.log(this.nom);
    console.log(this.prenom);
    this.filtre=[this.prenom,this.nom];

    // on envoie les infos
    this.notify.emit(this.filtre);

  }
  constructor() { }

  ngOnInit(): void {



  }

}
