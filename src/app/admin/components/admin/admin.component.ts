import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEvent } from 'src/app/shared/models/app-event';
import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';


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
