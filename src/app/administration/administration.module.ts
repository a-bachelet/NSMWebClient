// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules Imports
import { AdministrationRoutingModule } from './administration-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components Imports
import { AdministrationComponent } from './administration.component';

@NgModule({
  imports: [
    AdministrationRoutingModule,
    SharedModule
  ],
  exports: [

  ],
  declarations: [
    AdministrationComponent
  ],
  providers: [

  ],
  entryComponents: [

  ]
})
export class AdministrationModule { }
