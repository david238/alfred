import { Component, OnInit } from '@angular/core';
import { User } from '../services/users.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:  User;
  auService: AuthService;
  msgrec = '';

  constructor(_auService: AuthService) {
    this.auService = _auService;
   }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    console.log('onsubmit', submittedForm.value);
    const newUser = new User(submittedForm.value.username, submittedForm.value.email, submittedForm.value.password);
    this.auService.signupUser(newUser)
    .subscribe(
      (_msgrec: string) => {
        this.msgrec = _msgrec;
      console.log('Users received:' , _msgrec);
    });
  }

}
