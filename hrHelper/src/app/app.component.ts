import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hrHelper';

  presentation(){
    // @ts-ignore
    document.getElementById('presentation').style.display='none';
    // @ts-ignore
    document.getElementById('main').style.display='block';
  }
}
