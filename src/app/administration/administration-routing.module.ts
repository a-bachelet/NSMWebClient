// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components Imports
import { AdministrationComponent } from './administration.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RolesDetailComponent } from './roles-detail/roles-detail.component';
import {RolesCreateComponent} from './roles-create/roles-create.component';
import {UsersDetailComponent} from './users-detail/users-detail.component';
import {UsersCreateComponent} from './users-create/users-create.component';

const routes: Routes = [
  { path: '', component: AdministrationComponent, children: [
      { path: '', redirectTo: 'roles', pathMatch: 'full' },
      { path: 'roles', component: RolesListComponent },
      { path: 'roles/create', component: RolesCreateComponent },
      { path: 'roles/:id', component: RolesDetailComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'users/create', component: UsersCreateComponent },
      { path: 'users/:id', component: UsersDetailComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
