// Angular Imports
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

// Services Imports
import { AuthService } from './auth.service';

// Rxjs Imports
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = AuthService.isAuthenticated() ?
      request.clone({ setHeaders: { 'x-access-token': AuthService.getAuthToken().loginToken } }) :
      request;
    return next.handle(request).do(
      (event: HttpEvent<any>) => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/login']);
          } else if (err.status === 404) {
            alert('Not Found !');
          } else if (err.status === 500) {
            alert('Internal Server Error !');
          }
        }
      }
    );
  }

}
