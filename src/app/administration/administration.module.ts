// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules Imports
import { AdministrationRoutingModule } from './administration-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components Imports
import { AdministrationComponent } from './administration.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesDetailComponent } from './roles-detail/roles-detail.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';

@NgModule({
  imports: [
    AdministrationRoutingModule,
    SharedModule
  ],
  exports: [

  ],
  declarations: [
    AdministrationComponent,
    RolesListComponent,
    RolesDetailComponent,
    UsersListComponent,
    UsersDetailComponent
  ],
  providers: [

  ],
  entryComponents: [

  ]
})
export class AdministrationModule { }
