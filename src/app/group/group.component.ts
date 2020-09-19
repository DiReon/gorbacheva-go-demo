import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { take } from 'rxjs/operators';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Quiz } from '../models/quiz';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {
  group;
  students: AppUser[];
  icon = faCheckCircle;
  subscription: Subscription;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.group = this.route.snapshot.params.id;
    console.log(this.group);

    if(this.group) this.subscription = this.userService.getGroup(this.group).pipe(take(1)).subscribe(users => {
      this.students = users.map(u => new AppUser(u))
      console.table(this.students);
    })
  }

  ngOnInit(): void {
  }
  cancelAllQuizzes(group) {
    this.userService.cancelAllQuizzes(group);
    console.log(`Cancelled all quizzes for ${group}`);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
