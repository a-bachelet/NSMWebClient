// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components Imports
import { AdministrationComponent } from './administration.component';

const routes: Routes = [
  { path: '', component: AdministrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
