import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { AppUser } from '../../../shared/models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  public isMenuCollapsed = true;
  appUser: AppUser;
  subscription: Subscription;
  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.subscription = this.authService.appUser$.subscribe(u => {
      this.appUser = u;
    });
  
  }

  logout() {
   this.authService.logout(); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
