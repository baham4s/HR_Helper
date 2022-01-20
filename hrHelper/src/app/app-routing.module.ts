import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplayComponent } from './display/display.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'display', component: DisplayComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
