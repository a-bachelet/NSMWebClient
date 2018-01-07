// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components Imports
import { AdministrationComponent } from './administration.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RolesDetailComponent } from './roles-detail/roles-detail.component';

const routes: Routes = [
  { path: '', component: AdministrationComponent, children: [
      { path: '', redirectTo: 'roles', pathMatch: 'full' },
      { path: 'roles', component: RolesListComponent },
      { path: 'roles/:id', component: RolesDetailComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'users/:id', component: RolesDetailComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
