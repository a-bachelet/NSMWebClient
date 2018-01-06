import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../../shared/entities/user/user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'nsm-web-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public user: User = this.ar.snapshot.data.user;

  constructor(private ar: ActivatedRoute, private as: AuthService) { }

  ngOnInit() {
  }

  public logout() {
    this.as.logout();
  }

}
