// Angular Imports
import { HttpClient } from '@angular/common/http';

// Abstract Classes Imports
import { AbstractRestEntity } from './abstract-rest-entity';

// Interfaces Imports
import { NoParamConstructorInterface } from './no-param-constructor.interface';

// Rxjs Imports
import { Observable } from 'rxjs/Observable';

// Env Imports
import { environment } from '../../../environments/environment';

export class AbstractRestEntityService<T extends AbstractRestEntity> {

  constructor(
    protected path: string,
    protected http: HttpClient,
    protected ctor: NoParamConstructorInterface<T>
  ) {}

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(environment.apiEndpoint + `/${ this.path }`)
      .map(entities => this.fromArrayToCollection(entities[this.path]));
  }

  public getById(_id: string): Observable<T> {
    return this.http.get<T>(environment.apiEndpoint + `/${ this.path }/${ _id }`)
      .map(entity => this.fromObjectToEntity(entity[this.path.substr(0, this.path.length - 1)]));
  }

  public create(entity: T): Observable<T> {
    return this.http.post<T>(environment.apiEndpoint + `/${ this.path }`, entity.toSendRest())
      .map(entity => this.fromObjectToEntity(entity[this.path.substr(0, this.path.length - 1)]));;
  }

  public update(entity: T): Observable<T> {
    return this.http.post<T>(environment.apiEndpoint + `/${ this.path }/${ entity._id }`, entity.toSendRest())
      .map(updatedEntity => this.fromObjectToEntity(updatedEntity[this.path.substr(0, this.path.length - 1)]));
  }

  public remove(entity: T): Observable<any> {
    return this.http.delete<any>(environment.apiEndpoint + `/${ this.path }/${ entity._id }`);
  }

  private getNewEntity(object?: Object): T {
    if (object) {
      return new this.ctor(object);
    } else {
      return new this.ctor();
    }
  }

  private fromObjectToEntity(object: Object): T {
    return this.getNewEntity(object);
  }

  private fromArrayToCollection(array: Object[]): T[] {
    return array.map((object: Object) => this.fromObjectToEntity(object));
  }

}
