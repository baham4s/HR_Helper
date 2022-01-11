import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltreComponent } from './composant/filtre/filtre.component';
import { BarreDeRechercheComponent } from './composant/barre-de-recherche/barre-de-recherche.component';
import { DisplayComponent } from './composant/display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltreComponent,
    BarreDeRechercheComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
