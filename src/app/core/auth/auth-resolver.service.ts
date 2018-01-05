// Angular Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

// Entities Imports
import { User } from '../../shared/entities/user/user';

// Services Imports
import { AuthService } from './auth.service';
import { UserService } from '../../shared/entities/user/user.service';

// Rxjs Imports
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthResolverService implements Resolve<User> {

  constructor(private http: HttpClient, private router: Router, private us: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> {
    if (AuthService.isAuthenticated()) {
      return this.us.getById(AuthService.getAuthToken()._id);
    } else {
      this.router.navigate(['/login']);
      return null;
    }
  }

}
