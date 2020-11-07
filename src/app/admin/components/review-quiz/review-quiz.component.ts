import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { Quiz } from 'src/app/shared/models/quiz';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-review-quiz',
  templateUrl: './review-quiz.component.html',
  styleUrls: ['./review-quiz.component.css']
})
export class ReviewQuizComponent implements OnInit {
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.quizKey = this.route.snapshot.params.quizKey;
    this.studentId = this.route.snapshot.params.student;
    if (this.studentId) {
      this.subscription = this.userService.get(this.studentId).valueChanges().subscribe(u => {
        this.student = u;
        this.quiz = this.student.quizzes[this.quizKey];
        this.answerUrls = this.quiz.answerUrls;
        this.imageUrl = this.quiz.quizUrl;
        this.executionTime = Math.round((this.quiz.endTime - this.quiz.startTime)/60000);
        this.isLoaded = true;
      });
    };
  };

  ngOnInit(): void {
  }
    
  toggleReviewed() {
    this.quiz.isReviewed = !this.quiz.isReviewed; 
    this.userService.toggleReviewed(this.studentId, this.quizKey, this.quiz.isReviewed);
    this.router.navigate(['/admin/groups/'], {queryParams: {group: this.student.group, category: this.quiz.category}});
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
