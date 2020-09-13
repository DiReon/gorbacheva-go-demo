import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { Subscription } from 'rxjs';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appUser: AppUser;
  quizzes: Quiz[];
  subscription: Subscription;
  assignedQuizzes: Quiz[];
  submittedQuizzes: Quiz[];
  reviewedQuizzes: Quiz[];
  constructor(
    private authService: AuthService,
    private router: Router ) {
  }

  ngOnInit() {
    this.subscription = this.authService.appUser$.subscribe(user => {
      console.log("Username", user);
      this.appUser = new AppUser(user);
      
      if (user) {
        if (user.isAdmin) this.router.navigate(['/admin']);
        if (!user.group&&!user.isAdmin) this.router.navigate(['/user-profile'])
      }
      if (this.appUser.quizzes) { 
        this.assignedQuizzes = this.appUser.quizzes.filter(q => !q.isSubmitted);
        console.log(`Assigned Quizzes: ${this.assignedQuizzes}`);
        this.submittedQuizzes = this.appUser.quizzes.filter(q => q.isSubmitted);
        this.reviewedQuizzes  =this.appUser.quizzes.filter(q => q.isReviewed);
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
