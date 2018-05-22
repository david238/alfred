import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';
import { User } from '../services/users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user:  User[];
  usService: UserService;

  constructor(_usService: UserService) {
    this.usService = _usService;
   }

  ngOnInit() {
    this.usService.getUsers()
    .subscribe(
      (user: User[]) => {
        this.user = user;
      console.log('Users received:' , user);
    });
  }

}
