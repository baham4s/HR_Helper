import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})


export class FiltreComponent implements OnInit {
  content: String ="";
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

