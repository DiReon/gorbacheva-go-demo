import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-reviewed-quizzes',
  templateUrl: './reviewed-quizzes.component.html',
  styleUrls: ['./reviewed-quizzes.component.css']
})
export class ReviewedQuizzesComponent implements OnInit, OnDestroy {
  student: AppUser;
  studentId: string;
  subscription: Subscription;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.studentId = this.route.snapshot.params.student;
    this.subscription = this.userService.get(this.studentId).valueChanges().subscribe(u => this.student = new AppUser(u));
  }
  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
