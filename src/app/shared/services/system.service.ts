// Angular Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Rxjs Imports
import { Observable } from 'rxjs/Observable';

// Env Imports
import { environment } from '../../../environments/environment';

@Injectable()
export class SystemService {

  constructor(
    private http: HttpClient
  ) { }

  public getCommon(): Observable<any> {
    return this.http.get<any>(`${ environment.apiEndpoint }/system/common`);
  }

}
