// Angular Imports
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nsm-web-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  public navLinks: {label: string, path: string}[] = [
    { label: 'Roles', path: 'roles' },
    { label: 'Users', path: 'users' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
