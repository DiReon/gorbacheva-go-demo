import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Quiz } from '../models/quiz';
import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './solve-quiz.component.html',
  styleUrls: ['./solve-quiz.component.css']
})
export class SolveQuizComponent implements OnInit, OnDestroy {
  user: AppUser;
  quizId: string;
  quiz: Quiz;
  quizzes: Quiz[];
  
  imageUrl: string;
  startTime: number;
  subscription: Subscription;
  isLoaded = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.quizId = this.route.snapshot.params.id;
    this.subscription = this.authService.appUser$.subscribe(u => {
      this.user = new AppUser(u);
      console.table(this.user);
      this.quiz = this.user.quizzes.filter(q => q.quizId == this.quizId)[0];
      this.imageUrl = this.quiz.quizUrl;
      this.quiz.startTime = new Date().getTime();
      console.log(`Start time: ${this.quiz.startTime}`);
      this.quiz.isStarted = true;
      this.isLoaded = true;
    });
  };

  ngOnInit(): void {
  }

  onUploadFiles(urls) {
    this.quiz.answerUrls = urls;
  }

  save() {
    this.quiz.endTime =  new Date().getTime();
    console.log(`End time: ${this.quiz.endTime}`);
    this.quiz.isSubmitted = true;
    console.log('Submitting for review: ');
    console.table(this.user);
    this.userService.update(this.user.userId, this.user);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
