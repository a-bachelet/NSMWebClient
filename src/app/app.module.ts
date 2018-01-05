// Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules Imports
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

// Components Imports
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule
  ],
  exports: [

  ],
  declarations: [
    AppComponent
  ],
  providers: [

  ],
  entryComponents: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
