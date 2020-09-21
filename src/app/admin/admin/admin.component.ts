import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { AppUser } from 'src/app/models/app-user';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/event.service';
import { AppEvent } from 'src/app/models/app-event';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  appUser$: Observable<AppUser>;
  appEvents$: Observable<AppEvent[]>;
  appEvents: AppEvent[];
  page: number = 1;
  pageSize: number = 10;
  constructor(
    private authService: AuthService,
    private eventService: EventService,
  ) { 
    this.appUser$ = this.authService.appUser$;
    this.appEvents$ = this.eventService.getAll();
  }

  ngOnInit(): void {
  }

}
