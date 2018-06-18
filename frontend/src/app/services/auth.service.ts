import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from './users.model';

const USERS_SIGNUP_PATH = 'http://localhost:3000/users/signup';
const USERS_LOGIN_PATH = 'http://localhost:3000/users/login';

@Injectable()
export class AuthService {

  private user: User;

  constructor(private http: Http) {
    // this.getUsers();
    console.log('service user started ...');
  }

  signupUser(user) {
    return this.http.post(USERS_SIGNUP_PATH, user)
    .map((response: Response) =>  {
      this.user = response.json().userCreated;
      const msg = response.json().message;
      return msg;
    })
    .catch((error: Response) => Observable.throw(error.json()));
  }

  signInUser(user) {
    return this.http.post(USERS_LOGIN_PATH, user)
    .map((response: Response) =>  response.json())
    .catch((error: Response) => Observable.throw(error.json()));
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
