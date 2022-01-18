import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarreRechercheComponent } from './composant/barre-recherche/barre-recherche.component';
import { FiltreComponent } from './composant/filtre/filtre.component';
import { DisplayComponent } from './composant/display/display.component';



@NgModule({
  declarations: [
    AppComponent,
    BarreRechercheComponent,
    FiltreComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
