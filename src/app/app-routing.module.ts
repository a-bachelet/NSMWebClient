// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Services Imports
import { AuthResolverService } from './core/auth/auth-resolver.service';

// Components Imports
import { LoginComponent } from './core/login/login.component';
import { MainComponent } from './core/main/main.component';

const routes: Routes = [
  { path: '', resolve: { user: AuthResolverService }, component: MainComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'administration', loadChildren: './administration/administration.module#AdministrationModule' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }
    ] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
