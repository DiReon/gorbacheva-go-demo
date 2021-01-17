import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { Quiz } from 'src/app/shared/models/quiz';
import { CategoryService } from 'src/app/shared/services/category.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.css']
})
export class AdminGroupsComponent implements OnInit, OnDestroy {
  icon = faTimes;
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
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this._group = this.route.snapshot.queryParamMap.get('group') || '/'
    console.log(this._group);
    
    this._category = this.route.snapshot.queryParamMap.get('category') || '/'
    console.log(`this._category = ${this._category}`);
    
    this.groups$ = this.groupService.getAll();
    this.categories$ = this.categoryService.getAll().valueChanges();
    if (this._group !='/' && this._category !='/') this.load({group: this._group})
  }

  ngOnInit(): void {
  }

  onSubmit(value) {
    this.router.navigate(['/admin/groups/'], {queryParams: {group: value['group'], category: value['category']}});
    this.load(value);
  }

  load(value) {
    console.log("Run load");
    
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
