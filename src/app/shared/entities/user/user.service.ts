// Angular Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Abstrcat Classes Imports
import { AbstractRestEntityService } from '../../abstract/abstract-rest-entity-service';

// Entities Imports
import { User } from './user';

@Injectable()
export class UserService extends AbstractRestEntityService<User> {

  constructor(protected http: HttpClient) {
    super('users', http, User);
  }

}
