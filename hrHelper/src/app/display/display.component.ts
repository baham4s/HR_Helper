import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';



@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  @Input() InfoBrute = [];
test(){
  console.log(this.InfoBrute)
  console.log(this.InfoBrute[1])
}



  Filtre:string="";
  ouvertFIltre:string="non";
  dateFormation: Object = "";
  dateMAJ: Object = "";
  data:Object= "";


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







  products = [];
  totalAngularPackages: any;
  private object: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

}
