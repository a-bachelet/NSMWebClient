// Angular Services
import { Injectable } from '@angular/core';

// Classes Imports
import { AuthToken } from './auth-token';

@Injectable()
export class AuthService {

  constructor() { }

  public static getAuthToken(): AuthToken {
    return localStorage.getItem('_id') && localStorage.getItem('loginToken') ?
      new AuthToken(localStorage.getItem('_id'), localStorage.getItem('loginToken')) :
      null;
  }

  public static isAuthenticated(): boolean {
    return AuthService.getAuthToken() !== null;
  }

}
