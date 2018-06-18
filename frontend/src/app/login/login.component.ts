import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auService: AuthService;

  constructor(_auService: AuthService, private router: Router) {
    this.auService = _auService;
   }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    console.log('onsubmit LOGIN: ', submittedForm.value);
    const newUser = new User('', submittedForm.value.email, submittedForm.value.password);
    this.auService.signInUser(newUser)
    .subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        this.router.navigateByUrl('/dashboard');
        console.log('User token is:' , data.token);
    });
  }

}
