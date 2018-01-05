// Angular Imports
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Entities Imports
import { User } from '../../shared/entities/user/user';

// Services Imports
import { AuthService } from '../auth/auth.service';

// Rxjs Imports
import { Subscription } from 'rxjs/Subscription';

// Env Imports
import { environment } from '../../../environments/environment';

@Component({
  selector: 'nsm-web-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {

  public emailControl: FormControl = new FormControl('', Validators.required);
  public passwordControl: FormControl = new FormControl('', Validators.required);
  public loginForm: FormGroup = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl
  });

  private loginSubscription: Subscription = new Subscription();

  constructor(private http: HttpClient, private router: Router) { }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  ngOnInit() {
  }

  public login() {
    this.loginSubscription = this.http.post<User>(`${ environment.apiEndpoint }/auth/login`, this.loginForm.value)
      .map((response: any) => {
        const newUser = new User();
        newUser.hydrate(response['user']);
        return newUser;
      }).subscribe(
        success => { AuthService.setAuthToken(success); this.router.navigate(['/']); }
      );
  }

}
