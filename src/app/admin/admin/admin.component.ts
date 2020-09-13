import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { QuizService } from 'src/app/quiz.service';
import { AppUser } from 'src/app/models/app-user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  appUser$: Observable<AppUser>;
  constructor(
    private authService: AuthService,
  ) { 
    this.appUser$ = this.authService.appUser$
  }

  ngOnInit(): void {
  }

}
