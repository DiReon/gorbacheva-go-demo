import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {
  constructor(
    private authService: AuthService,
  ) { }

  canActivate() {
    return this.authService.appUser$.pipe(map(appUser => appUser.isAdmin))
  }

}
