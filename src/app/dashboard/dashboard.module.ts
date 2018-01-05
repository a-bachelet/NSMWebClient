// Angular Imports
import { NgModule } from '@angular/core';

// Modules Imports
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components Imports
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule
  ],
  exports: [

  ],
  declarations: [
    DashboardComponent
  ],
  providers: [

  ],
  entryComponents: [

  ]
})
export class DashboardModule { }
