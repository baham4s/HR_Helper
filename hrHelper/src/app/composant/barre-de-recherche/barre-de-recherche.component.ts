import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barre-de-recherche',
  templateUrl: './barre-de-recherche.component.html',
  styleUrls: ['./barre-de-recherche.component.css']
})
export class BarreDeRechercheComponent implements OnInit {
  prenom='';
  nom='';
  rechercher(){
    console.log(this.nom);
    console.log(this.prenom);

  }
  constructor() { }

  ngOnInit(): void {



  }

}
