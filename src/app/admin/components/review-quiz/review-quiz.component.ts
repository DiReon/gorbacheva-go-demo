import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { Quiz } from 'src/app/shared/models/quiz';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-review-quiz',
  templateUrl: './review-quiz.component.html',
  styleUrls: ['./review-quiz.component.css']
})
export class ReviewQuizComponent implements OnInit {
  appUser$: Observable<AppUser>;
  quizKey: string;
  quiz: Quiz;
  answerUrls: string[];
  imageUrl: string;
  studentId: string;
  student: AppUser;
  startTime: number;
  subscription: Subscription;
  executionTime: number;
  isLoaded = false;
  commentsForm = new FormGroup({
    comments: new FormControl(''),
    points: new FormControl('', Validators.required)
  })

  get points() {
    return this.commentsForm.get('points')
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.quizKey = this.route.snapshot.params.quizKey;
    this.studentId = this.route.snapshot.params.student;
    this.appUser$ = this.authService.appUser$;
    if (this.studentId) {
      this.subscription = this.userService.get(this.studentId).subscribe(u => {
        this.student = u;
        this.quiz = this.student.quizzes[this.quizKey];
        this.answerUrls = this.quiz.answerUrls;
        this.imageUrl = this.quiz.quizUrl;
        this.executionTime = Math.round((this.quiz.endTime - this.quiz.startTime)/60000);
        this.isLoaded = true;
        this.commentsForm.setValue({'comments': this.quiz.teacherComments||null, 'points': this.quiz.points||null});
      });
    };
  };

  ngOnInit(): void {
  }
    
  onSubmit() {
    console.warn(this.commentsForm.value);
    let comments: string = this.commentsForm.value['comments'];
    let points: number = this.commentsForm.value['points'];
    this.userService.reviewQuiz(this.studentId, this.quizKey, comments, points);
    this.router.navigate(['/admin/groups/'], {queryParams: {group: this.student.group, category: this.quiz.category}});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
