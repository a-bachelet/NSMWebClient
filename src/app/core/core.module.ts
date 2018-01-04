// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Constants Imports
import { CORE_SERVICES } from '../shared/core-services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [

  ],
  providers: [
    ...CORE_SERVICES
  ],
  entryComponents: [

  ]
})
export class CoreModule { }
