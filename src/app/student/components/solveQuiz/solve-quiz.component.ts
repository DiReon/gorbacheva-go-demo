import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { Quiz } from '../../../shared/models/quiz';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-quiz',
  templateUrl: './solve-quiz.component.html',
  styleUrls: ['./solve-quiz.component.css']
})
export class SolveQuizComponent implements OnInit, OnDestroy {
  user: AppUser;
  quizKey: string;
  quiz: Quiz;
  quizzes: Quiz[];
  timeLimit: number;
  imageUrl: string;
  startTime: number;
  subscription: Subscription;
  isLoaded = false;
  counter$: Observable<number>;
  count: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.quizKey = this.route.snapshot.params.quizKey;
    this.subscription = this.authService.appUser$.subscribe(u => {
      this.user = new AppUser(u);
      console.table(this.user);
      if (this.user.quizzes) {
        this.quiz = this.user.quizzes[this.quizKey];
        this.quiz.quizKey = this.quizKey;
        this.imageUrl = this.quiz.quizUrl;
        this.timeLimit = this.quiz.timeLimit;
        if (!this.quiz.startTime) this.quiz.startTime = new Date().getTime();
        console.log(`Start time: ${this.quiz.startTime}`);
        this.isLoaded = true;
        this.quiz.isStarted = true;
        this.userService.startQuiz(this.user.userId, this.quizKey, this.quiz.startTime);
        this.count = this.quiz.timeLimit + 1 - Math.round((new Date().getTime() - this.quiz.startTime)/60000);
        console.log("Count: ", this.count);
        
        this.counter$ = timer(0, 60000).pipe(
          take(this.count),
          map(() => this.count = this.count - 1));  
      }
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
    this.quiz.isReviewed = false;
    console.log('Submitting for review: ');
    console.table(this.user);
    this.userService.submitQuiz(this.user.userId, this.quiz, this.user.userName);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
