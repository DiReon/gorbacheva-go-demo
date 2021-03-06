import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database/database';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { Quiz } from 'src/app/shared/models/quiz';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-admin-quizzes',
  templateUrl: './admin-quizzes.component.html',
  styleUrls: ['./admin-quizzes.component.css']
})
export class AdminQuizzesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  icon = faEdit;
  rows: Quiz[] = [];
  rowsRef: AngularFireList<any>;
  temp: Quiz[] = [];
  ColumnMode = ColumnMode;  
  group: string;
  category: string;
  studentId: string;
  students: AppUser[] = [];
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    ) { 
    this.group = this.route.snapshot.params.group
    this.category = this.route.snapshot.params.category;
    this.studentId = this.route.snapshot.params.studentId; 
    console.log(`Category: ${this.category}, Group: ${this.group}, StudentId: ${this.studentId}`);
    if (this.category) this.subscription = this.quizService.getQuizzesForCategory(this.category).subscribe(response => this.rows = this.temp = response)
    else this.subscription = this.quizService.getAll().subscribe(response => this.rows = this.temp = response)
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query) {
    this.rows = (query) ?
      this.temp.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.temp;
  }

  assignQuiz(quizId: string) {
    let quiz = this.temp.filter(q => q['key'] == quizId)[0];
    quiz.quizId = quizId;
    quiz.category = quiz.category;
    if (!this.studentId) this.userService.assignQuizToGroup(this.group, quiz);
    else this.userService.assignQuiz(this.studentId, quiz);
    this.router.navigate(['/admin/groups/'], {queryParams: {group: this.group, category: this.category}});
  }

}




