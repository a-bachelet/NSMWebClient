// Angular Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Abstract Classes Imports
import { AbstractRestEntityService } from '../../abstract/abstract-rest-entity-service';

// Entities Imports
import { Role } from './role';

@Injectable()
export class RoleService extends AbstractRestEntityService<Role> {

  constructor(protected http: HttpClient) {
    super('roles', http, Role);
  }

}
