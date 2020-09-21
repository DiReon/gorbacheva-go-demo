import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { Quiz } from 'src/app/models/quiz';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-review-quiz',
  templateUrl: './review-quiz.component.html',
  styleUrls: ['./review-quiz.component.css']
})
export class ReviewQuizComponent implements OnInit {
  quizId: string;
  quiz: Quiz;
  answerUrls: string[];
  imageUrl: string;
  studentId: string;
  student: AppUser;
  startTime: number;
  subscription: Subscription;
  executionTime: number;
  isLoaded = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.quizId = this.route.snapshot.params.id;
    this.studentId = this.route.snapshot.params.student;
    if (this.studentId) {
      this.subscription = this.userService.get(this.studentId).valueChanges().subscribe(u => {
        this.student = u;
        this.quiz = this.student.quizzes.filter(q => q.quizId == this.quizId)[0];
        this.answerUrls = this.quiz.answerUrls;
        this.imageUrl = this.quiz.quizUrl;
        this.executionTime = Math.round((this.quiz.endTime - this.quiz.startTime)/60000);
        this.isLoaded = true;
      });
    };
  };

  ngOnInit(): void {
  }
    
  markReviewed() {
    console.table(this.student);
    this.quiz.isReviewed = true;
    console.log("Setting as reviewed: ");
    console.table(this.student);
    this.userService.update(this.studentId, this.student);
    
    this.router.navigate([`/admin/groups/${this.student.group}`]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
