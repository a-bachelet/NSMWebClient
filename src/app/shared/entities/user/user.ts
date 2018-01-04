// Abstract Classes Imports
import {AbstractRestEntity} from '../../abstract/abstract-rest-entity';

// Entities Imports
import { Role } from '../role/role';

export class User extends AbstractRestEntity {

  public firstName: string = null;
  public lastName: string = null;
  public email: string = null;
  public loginToken: string = null;

  private _role: Role = null;
  private _createdAt: Date = null;
  private _validUntil: Date = null;

  public set role(role: Role) {
    this._role = role ? new Role(role) : null;
  }
  public get role(): Role {
    return this._role;
  }

  public set createdAt(createdAt: string) {
    this._createdAt = createdAt ? new Date(createdAt) : null;
  }
  public get createdAt(): string {
    return this._createdAt ? this._createdAt.toISOString() : null;
  }

  public set validUntil(validUntil: string) {
    this._validUntil = validUntil ? new Date(validUntil) : null;
  }
  public get validUntil(): string {
    return this._validUntil ? this._validUntil.toISOString() : null;
  }

}
