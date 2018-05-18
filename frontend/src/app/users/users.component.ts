import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:  User[];
  usService: UserService;

  constructor(_usService: UserService) {
    this.usService = _usService;
    this.usService.getUsers()
    .subscribe( users => {
      console.log('Users received:' , users);
    });
   }

  ngOnInit() {
  }

}
