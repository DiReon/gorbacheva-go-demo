import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from '../../../shared/services/group.service';
import { Observable, Subscription } from 'rxjs';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  groups$: Observable<any>;
  appUser: AppUser;
  subscription: Subscription;
  constructor(
    private groupService: GroupService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { 
    this.groups$ = this.groupService.getAll().valueChanges();
    this.authService.appUser$.pipe(take(1)).subscribe(u => this.appUser = u)
  }

  ngOnInit(): void {
  }

  save(value) {
    console.log("Form value: ", value);
    this.userService.updateUserProfile(this.appUser.userId, value);

    this.router.navigate(['/'])
  }
  
  delete() {
    if (!confirm('Точно хочешь удалить профиль?')) return;
    this.userService.delete(this.appUser.userId);
    this.router.navigate(['/']);
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}
