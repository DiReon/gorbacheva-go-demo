import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFireList } from '@angular/fire/database/database';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { QuizService } from 'src/app/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AppUser } from 'src/app/models/app-user';
import { Quiz } from 'src/app/models/quiz';
import { take, finalize } from 'rxjs/operators';
import { GroupService } from 'src/app/group.service';
import { Group } from 'src/app/models/group';

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
  groupId: string;
  group: Group;
  students: AppUser[] = [];
  constructor(
    private quizServise: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    ) { 
    this.groupId = this.route.snapshot.params.group
    this.subscription = this.quizServise.getAll()
      .subscribe(response => this.rows = this.temp = response)
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
    this.userService.assignQuizToGroup(this.groupId, quiz);
    this.router.navigate(['/admin/groups/', this.groupId]);
  }
  
}




