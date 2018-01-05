// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Form, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Services Imports
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthResolverService } from './auth/auth-resolver.service';
import { AuthService } from './auth/auth.service';

// Components Imports
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

// Constants Imports
import { CORE_SERVICES } from '../shared/core-services';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginComponent,
    MainComponent
  ],
  declarations: [
    LoginComponent,
    MainComponent
  ],
  providers: [
    ...CORE_SERVICES,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthResolverService,
    AuthService
  ],
  entryComponents: [

  ]
})
export class CoreModule { }
