import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";


@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.component.html',
  styleUrls: ['./bienvenue.component.scss']
})
export class BienvenueComponent implements OnInit {
  data: any = [];


  chartOptions: any;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.GetServeur();



  }
  title = 'hrHelper';

  presentation(){
    // @ts-ignore
    document.getElementById('presentation').style.display='none';
    // @ts-ignore
    document.getElementById('main').style.display='block';
  }


  public GetServeur(){
    this.dataService.sendGetRequest().subscribe(data=>{
      console.log(data);
      this.data=data;

    })
  }



}
