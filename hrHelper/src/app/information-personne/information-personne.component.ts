import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-information-personne',
  templateUrl: './information-personne.component.html',
  styleUrls: ['./information-personne.component.scss']
})
export class InformationPersonneComponent implements OnInit {

  @Input() Infos: Object = '';


  constructor() {
    console.log(this.Infos);

  }

  ngOnInit(): void {
    console.log(this.Infos);

  }

}
