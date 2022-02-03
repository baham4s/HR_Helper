import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from "primeng/ripple";
import { DisplayComponent } from './display/display.component';
import { FiltreComponent } from './filtre/filtre.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import { InformationPersonneComponent } from './information-personne/information-personne.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BienvenueComponent } from './bienvenue/bienvenue.component';
import { CaseComponent } from './case/case.component';
import {ChartModule} from "primeng/chart";
import {ProgressSpinnerModule} from "primeng/progressspinner";



@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    FiltreComponent,
    InformationPersonneComponent,
    BienvenueComponent,
    CaseComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    InputTextModule,
    InputSwitchModule,
    CascadeSelectModule,
    MultiSelectModule,
    DropdownModule,
    CheckboxModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
