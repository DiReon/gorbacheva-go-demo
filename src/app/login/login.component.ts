import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email2;
  password2;
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login();
  }

  loginByEmail(value) {
    this.authService.loginByEmail(value['email'], value['password']);
  }

  loginAsDemo(email, password) {
    if (email == "student@student.com") this.initiateDemo()
    this.authService.loginByEmail(email, password);
  }

  initiateDemo() {
    this.userService.cancelUserQuizzes('i0GLXSPZlscnoHo9cG8D2ObtmKw2');
    this.userService.assignDemoQuizzes('i0GLXSPZlscnoHo9cG8D2ObtmKw2');
  }

}
