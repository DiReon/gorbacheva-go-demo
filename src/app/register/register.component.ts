import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email2;
  password2;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  register(value) {
    console.log(value);
    this.authService.register(value['email'], value['password'])
  }
}
