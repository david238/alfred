import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const USERS_PATH = 'http://localhost:3000/users';

export interface User {
  _id?: string; // Assigned automatically by datastore
  name?: string;
  email?: string;
}

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
    // this.getUsers();
    console.log('service user started ...');
  }

  public getUsers() {
    return this.http.get(USERS_PATH)
    .pipe(map( (result: Response) =>  result.json ) );

  }

}
