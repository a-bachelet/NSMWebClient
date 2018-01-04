// Abstract Classes Imports
import { AbstractRestEntity } from '../../abstract/abstract-rest-entity';

export class Role extends AbstractRestEntity {

  public name: string = null;

  private _createdAt: Date = null;

  public set createdAt(createdAt: string) {
    this._createdAt = createdAt ? new Date(createdAt) : null;
  }
  public get createdAt(): string {
    return this._createdAt ? this._createdAt.toISOString() : null;
  }

}
