import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../category.service';
import { AppUser } from '../models/app-user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.css']
})
export class AdminGroupsComponent implements OnInit, OnDestroy {
  _group;
  _category;
  groupRef: string;
  categoryRef: string;
  groups$: Observable<any>;
  categories$: Observable<any>;
  students: AppUser[];
  students$: Observable<AppUser[]>;
  subscription: Subscription;
  constructor(
    private groupService: GroupService,
    private categoryService: CategoryService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { 
    this._group = this.route.snapshot.queryParamMap.get('group') || '/'
    this._category = this.route.snapshot.queryParamMap.get('category') || '/'
    this.groups$ = this.groupService.getAll().valueChanges();
    this.categories$ = this.categoryService.getAll().valueChanges();
    if (this._group && this._category) this.load({group: this._group})
  }

  ngOnInit(): void {
  }

  load(value) {
    this.subscription = this.userService.getGroup(value['group']).subscribe(users => {
      this.students = users.map(u => new AppUser(u))
      console.table(this.students);
    });
  }

  cancelAllQuizzes(group) {
    this.userService.cancelAllQuizzes(group);
    console.log(`Cancelled all quizzes for ${group}`);
  }

  cancel(student: AppUser, quiz: Quiz) {
    this.userService.cancelQuiz(student.userId, quiz.quizKey);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
