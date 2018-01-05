// Angular Services
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Classes Imports
import { AuthToken } from './auth-token';

// Entities Imports
import { User } from '../../shared/entities/user/user';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public static setAuthToken(user: User): void {
    localStorage.setItem('_id', user._id);
    localStorage.setItem('loginToken', user.loginToken);
  }

  public static getAuthToken(): AuthToken {
    return localStorage.getItem('_id') && localStorage.getItem('loginToken') ?
      new AuthToken(localStorage.getItem('_id'), localStorage.getItem('loginToken')) :
      null;
  }

  public static isAuthenticated(): boolean {
    return AuthService.getAuthToken() !== null;
  }

  public logout(): void {
    localStorage.removeItem('_id');
    localStorage.removeItem('loginToken');
    this.router.navigate(['/login']);
  }

}
