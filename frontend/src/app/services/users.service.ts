import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './users.model';

const USERS_PATH = 'http://localhost:3000/users';


@Injectable()
export class UserService {

  private user: User[] = [];

  constructor(private http: Http) {
    // this.getUsers();
    console.log('service user started ...');
  }

  getUsers() {
    return this.http.get(USERS_PATH)
    .map((response: Response) =>  {
      const usersfound = response.json().userfound;
      const usersArray: User[] = [];
      for (const userone of usersfound) {
        usersArray.push( new User(userone._id, userone.name, userone.email));
      }
      this.user = usersArray;
      return usersArray;
    })
    .catch((error: Response) => Observable.throw(error.json()));
  }

}
