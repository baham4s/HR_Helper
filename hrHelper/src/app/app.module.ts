import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from "primeng/ripple";
import { BarreDeRechercheComponent } from './barre-de-recherche/barre-de-recherche.component';
import { DisplayComponent } from './display/display.component';
import { FiltreComponent } from './filtre/filtre.component';

@NgModule({
  declarations: [
    AppComponent,
    BarreDeRechercheComponent,
    DisplayComponent,
    FiltreComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
