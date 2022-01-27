import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplayComponent } from './display/display.component';
import { FiltreComponent } from './filtre/filtre.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'display', component: DisplayComponent },
  { path: 'filtre', component: FiltreComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
